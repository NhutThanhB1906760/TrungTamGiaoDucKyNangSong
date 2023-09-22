const attendanceController = require("../controllers/attendance_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( attendanceController.create).get(attendanceController.getAll).delete(attendanceController.deleteAll);
router.route('/:id').put( attendanceController.update).post(attendanceController.findOne).delete(attendanceController.delete);

//DELETE USER

module.exports = router;