const positionController = require("../controllers/position_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( positionController.create).get(positionController.getAll).delete(positionController.deleteAll);
router.route('/:id').put( positionController.update).post(positionController.findOne).delete(positionController.delete);

//DELETE USER

module.exports = router;