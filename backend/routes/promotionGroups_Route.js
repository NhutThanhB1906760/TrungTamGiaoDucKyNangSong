const promotionGroupsController = require("../controllers/promotionGroups_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( promotionGroupsController.create).get(promotionGroupsController.getAll).delete(promotionGroupsController.deleteAll);
router.route('/:id').put( promotionGroupsController.update).post(promotionGroupsController.findOne).delete(promotionGroupsController.delete);

//DELETE USER

module.exports = router;