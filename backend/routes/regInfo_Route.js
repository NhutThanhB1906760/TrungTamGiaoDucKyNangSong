const regInfoController = require("../controllers/regInfo_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( regInfoController.create).get(regInfoController.getAll).delete(regInfoController.deleteAll);
router.route('/:id').put( regInfoController.update).post(regInfoController.findOne).delete(regInfoController.delete);

//DELETE USER

module.exports = router;