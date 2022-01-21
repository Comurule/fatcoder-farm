import { Router } from 'express';
import errorHandler from '../middlewares/errorHandler';
import farmBuildingRoutes from './farmBuilding';
import farmUnitRoutes from './farmUnit';

const router = Router();

router.use('/farmbuildings', farmBuildingRoutes);
router.use('/farmunits', farmUnitRoutes);

router.get('/', (req, res) => res.sendStatus(200));
// eslint-disable-next-line no-unused-vars
router.use('*', (err, req, res, next) => errorHandler(err, req, res));

export default router;
