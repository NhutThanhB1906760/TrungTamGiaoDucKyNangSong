const personnelController = require("../controllers/personnel_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( personnelController.create).get(personnelController.getAll).delete(personnelController.deleteAll);
router.route('/:id').put( personnelController.update).post(personnelController.findOne).delete(personnelController.delete);

//DELETE USER

module.exports = router;