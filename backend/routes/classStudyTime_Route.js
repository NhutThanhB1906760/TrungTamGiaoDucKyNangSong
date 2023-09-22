const classStudyTimeController = require("../controllers/classStudyTime_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( classStudyTimeController.create).get(classStudyTimeController.getAll).delete(classStudyTimeController.deleteAll);
router.route('/:id').put( classStudyTimeController.update).post(classStudyTimeController.findOne).delete(classStudyTimeController.delete);

//DELETE USER

module.exports = router;