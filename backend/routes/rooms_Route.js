const roomsController = require("../controllers/rooms_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( roomsController.create).get(roomsController.getAll).delete(roomsController.deleteAll);
router.route('/:id').put( roomsController.update).post(roomsController.findOne).delete(roomsController.delete);

//DELETE USER

module.exports = router;