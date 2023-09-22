const filesController = require("../controllers/files_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( filesController.create).get(filesController.getAll).delete(filesController.deleteAll);
router.route('/:id').put( filesController.update).post(filesController.findOne).delete(filesController.delete);

//DELETE USER

module.exports = router;