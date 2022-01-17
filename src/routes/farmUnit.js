const { Router } = require('express');
const farmUnitController = require('../controllers/farmUnit.controller');
const validateFarmUnit = require('../middlewares/Validator/farmUnit');

const router = Router();

router.get('/', validateFarmUnit('checkFarmBuildingId'), farmUnitController.listFarmUnitsInABuilding);
router.post('/', validateFarmUnit('create'), validateFarmUnit('checkFarmBuildingId'), farmUnitController.createAFarmUnit);
router.get('/:id/feed', validateFarmUnit('checkId'), farmUnitController.feedAFarmUnit);

module.exports = router;