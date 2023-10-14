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
router.post("/logout", authController.logOut);
router.get('/findAcPer',authController.findAccountPer)
router.get('/',authController.getAll)

router.delete('/:id',authController.deleteAccount)
module.exports = router;