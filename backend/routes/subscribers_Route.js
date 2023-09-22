const subscribersController = require("../controllers/subscribers_Controller");
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post(subscribersController.create).get(subscribersController.getAll).delete(subscribersController.deleteAll);
router.route('/:id').put(subscribersController.update).post(subscribersController.findOne).delete(subscribersController.delete);

//DELETE USER

module.exports = router;