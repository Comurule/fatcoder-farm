import { Router } from 'express';
import * as farmUnitController from '../controllers/farmUnit.controller';
import validateFarmUnit from '../middlewares/Validator/farmUnit';

const router = Router();

router.get(
  '/',
  validateFarmUnit('checkFarmBuildingId'),
  farmUnitController.listFarmUnitsInABuilding,
);
router.post(
  '/',
  validateFarmUnit('create'),
  validateFarmUnit('checkFarmBuildingId'),
  farmUnitController.createAFarmUnit,
);
router.get(
  '/:id/feed',
  validateFarmUnit('checkId'),
  farmUnitController.feedAFarmUnit,
);

export default router;
