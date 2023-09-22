const promotionTimeController = require("../controllers/promotionTime_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( promotionTimeController.create).get(promotionTimeController.getAll).delete(promotionTimeController.deleteAll);
router.route('/:id').put( promotionTimeController.update).post(promotionTimeController.findOne).delete(promotionTimeController.delete);

//DELETE USER

module.exports = router;