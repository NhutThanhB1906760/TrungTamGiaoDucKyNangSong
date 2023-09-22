const authController = require("../controllers/auth_Controller");

const router = require("express").Router();
const { verifyToken ,verifyTokenAndUserAuthorization,verifyTokenAndAdmin} = require("../controllers/verifyToken");

//REGISTER
router.post("/register", authController.registerUser);

//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);
//LOG IN
router.post("/login", authController.loginUser);
//LOG OUT
router.post("/logout", verifyTokenAndAdmin, authController.logOut);

router.get('/:id',)

module.exports = router;