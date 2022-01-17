const { Router } = require('express');
const errorHandler = require('../middlewares/errorHandler');
const farmBuildingRoutes = require('./farmBuilding');
const farmUnitRoutes = require('./farmUnit');

const router = Router();

router.use('/farmbuildings', farmBuildingRoutes);
router.use('/farmunits', farmUnitRoutes);

//
router.get('/', (req, res) => res.sendStatus(200));

router.use('*', (err, req, res) => errorHandler(err, req, res));

module.exports = router;
