const coursesController = require("../controllers/courses_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( coursesController.create).get(coursesController.getAll).delete(coursesController.deleteAll);
router.route('/:id').put( coursesController.update).post(coursesController.findOne).delete(coursesController.delete);

//DELETE USER

module.exports = router;