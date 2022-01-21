import { Router } from 'express';
import * as farmBuildingController from '../controllers/farmbuilding.controller';
import validateFarmBuilding from '../middlewares/Validator/farmBuilding';

const router = Router();

router.get('/', farmBuildingController.listAllFarmBuildings);
router.post(
  '/',
  validateFarmBuilding('create'),
  farmBuildingController.createAFarmBuilding,
);

export default router;
