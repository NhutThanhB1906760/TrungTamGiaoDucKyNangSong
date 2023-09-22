const courses_proGroupsController = require("../controllers/courses-proGroups_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post(courses_proGroupsController.create).get(courses_proGroupsController.getAll)
router.route('/:id').post(courses_proGroupsController.findOne).delete(courses_proGroupsController.delete);
//DELETE USER

module.exports = router;