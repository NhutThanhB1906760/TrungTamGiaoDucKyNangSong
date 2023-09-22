const classController = require("../controllers/class_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( classController.create).get(classController.getAll).delete(classController.deleteAll);
router.route('/:id').put( classController.update).post(classController.findOne).delete(classController.delete);

//DELETE USER

module.exports = router;