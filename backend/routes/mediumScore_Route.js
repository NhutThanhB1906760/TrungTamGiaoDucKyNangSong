const mediumScoreController = require("../controllers/mediumScore_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( mediumScoreController.create).get(mediumScoreController.getAll).delete(mediumScoreController.deleteAll).put( mediumScoreController.update);
router.route('/:id').post(mediumScoreController.findOne).delete(mediumScoreController.delete);

//DELETE USER

module.exports = router;