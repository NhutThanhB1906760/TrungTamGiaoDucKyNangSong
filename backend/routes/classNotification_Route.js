const classNotificationController = require("../controllers/classNotification_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( classNotificationController.create).get(classNotificationController.getAll).delete(classNotificationController.deleteAll);
router.route('/:id').put( classNotificationController.update).post(classNotificationController.findOne).delete(classNotificationController.delete);

//DELETE USER

module.exports = router;