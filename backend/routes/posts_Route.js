const postsController = require("../controllers/posts_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( postsController.create).get(postsController.getAll).delete(postsController.deleteAll);
router.route('/:id').put( postsController.update).post(postsController.findOne).delete(postsController.delete);

//DELETE USER

module.exports = router;