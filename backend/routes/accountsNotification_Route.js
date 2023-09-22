const accountsNotificationController = require("../controllers/accountsNotification_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( accountsNotificationController.create).get(accountsNotificationController.getAll).delete(accountsNotificationController.deleteAll);
router.route('/:id').put( accountsNotificationController.update).post(accountsNotificationController.findOne).delete(accountsNotificationController.delete);

//DELETE USER

module.exports = router;