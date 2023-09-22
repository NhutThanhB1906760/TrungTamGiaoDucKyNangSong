const assessmentController = require("../controllers/assessment_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( assessmentController.create).get(assessmentController.getAll).delete(assessmentController.deleteAll);
router.route('/:id').put( assessmentController.update).post(assessmentController.findOne).delete(assessmentController.delete);

//DELETE USER

module.exports = router;