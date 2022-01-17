const { farmUnitService } = require('../services');

exports.createAFarmUnit = async (req, res, next) => {
    try {
        const result = await farmUnitService.createAFarmUnit(req.body);
        return res.status(201).json({
            status: 'success',
            message: 'Farm Unit record created successfully.',
            data: result
        })
    } catch (error) {
        next(error);
    }
};

exports.listFarmUnitsInABuilding = async (req, res, next) => {
    const { farmBuildingId } = req.query;
    try {
        const result = await farmUnitService.listAllFarmUnits(farmBuildingId);
        return res.status(200).json({
            status: 'success',
            message: `Farm Unit records in farm building with id: ${farmBuildingId}.`,
            data: result
        })
    } catch (error) {
        next(error);
    }
};

exports.feedAFarmUnit = async (req, res, next) => {
    try {
        const result = await farmUnitService.feedAFarmUnit(req.params.id);

        return res.status(200).json({
            status: 'success',
            message: `Farm Unit has been fed successfully.`
        })
    } catch (error) {
        next(error);
    }
};