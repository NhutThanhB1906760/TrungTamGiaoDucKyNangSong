const Auth = require("../models/auth_Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require('../sendEmail/sendEmail')
const Subcriber = require("../models/subscribers_Model")
let refreshTokens = [];

const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const accountInfo = {
        username: req.body.username,
        password: hashed,
        role: req.body.role,
        access: req.body.access,
        personnel_id: req.body?.personnel_id,
        subscribers_id: req.body?.subscribers_id
      }

      //Save user to DB
      if (req.body.role == 3) {
        const payload = {
          name: req.body.name,
          sex: req.body.sex,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body?.address,
          birthday: req.body.birthday
        };
        const subInfo = await Subcriber.create(payload)
        if (subInfo) {
          accountInfo.subscribers_id = subInfo[0]
          const auth = new Auth()
          const user = await auth.register(accountInfo);
          console.log(user);
          res.status(200).json(user);
        }

      }
      else {
        const auth = new Auth()
        const user = await auth.register(accountInfo);
        res.status(200).json(user);
      }

      const mailOptions = {
        from: process.env.GMAIL_NAME, // Email của bạn
        to: 'real07123456@gmail.com', // Email người nhận
        subject: 'Cấp tài khoản truy cập', // Tiêu đề email
        text: `Username: ${req.body.username} và Password: ${req.body.password}` // Nội dung email
      };
      if (payload.personnel_id) {
        sendEmail(mailOptions)
      }
    } catch (err) {
      res.send(undefined).status(500);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "1d" }
    );
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const auth = new Auth()
      var user = await auth.findOne(req.body.username)
      // var e=await auth.update(800,{username:'ppp5',name:'uuu'})
      console.log(user);
      if (!user) {
        res.json(false).status(404);
        return
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.json(false).status(404);
        return

      }
      if (user && validPassword) {
        //Generate access token
        console.log(user);
        let data = {}
        if (user.personnel_id !== null) {
          data.id = user.personnel_id
          data.role = user.role
        }
        else {
          data.id = user.subscribers_id
          data.role = user.role
        }
        const accessToken = authController.generateAccessToken(data);
        //Generate refresh token
        // const refreshToken = authController.generateRefreshToken(user);
        // refreshTokens.push(refreshToken);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
          maxAge: 86400
        });
        // res.cookie("userA", JSON.stringify(data), {
        //   httpOnly: true,
        //   secure: false,
        //   sameSite: "strict",
        //   maxAge: 86400
        // });
        const { password, ...others } = user;
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("accessToken");
    res.clearCookie("user");
    res.status(200).json("Logged out successfully!");
  },

  findAccountPer: async (req, res) => {

    try {
      const auth = new Auth()
      const user = await auth.findAccountPer();
      res.status(200).json(user);
    } catch (err) {
      res.send(undefined).status(500);
    }
  },
  deleteAccount: async (req, res) => {

    try {
      const auth = new Auth()
      const user = await auth.deleteOne(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.send(undefined).status(500);
    }
  },
  getAll: async (req, res) => {

    try {
      const auth = new Auth()
      const user = await auth.getAll();
      res.status(200).json(user);
    } catch (err) {
      res.send(undefined).status(500);
    }
  }
};

module.exports = authController;
