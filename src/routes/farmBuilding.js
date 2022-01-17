const { Router } = require('express');
const farmBuildingController = require('../controllers/farmbuilding.controller');
const validateFarmBuilding = require('../middlewares/Validator/farmBuilding');

const router = Router();

router.get('/', farmBuildingController.listAllFarmBuildings);
router.post('/', validateFarmBuilding('create'), farmBuildingController.createAFarmBuilding);

module.exports = router;
