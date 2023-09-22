const studyTimeController = require("../controllers/studyTime_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( studyTimeController.create).get(studyTimeController.getAll).delete(studyTimeController.deleteAll);
router.route('/:id').put( studyTimeController.update).post(studyTimeController.findOne).delete(studyTimeController.delete);

//DELETE USER

module.exports = router;