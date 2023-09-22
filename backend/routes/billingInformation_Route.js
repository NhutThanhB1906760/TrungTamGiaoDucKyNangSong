const billingInformationController = require("../controllers/billingInformation_Controller");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.route('/').post( billingInformationController.create).get(billingInformationController.getAll).delete(billingInformationController.deleteAll);
router.route('/:id').put( billingInformationController.update).post(billingInformationController.findOne).delete(billingInformationController.delete);

//DELETE USER

module.exports = router;