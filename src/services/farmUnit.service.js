const repository = require('../database/repositories');
const config = require('../config/sysConfig');
const CustomError = require('../utils/customError');
const logger = require('../utils/logger');
const getNumber = require('../utils/checkNumber');

exports.createAFarmUnit = async (data) => {
    const checkDuplicate = await repository.farmUnit.getAFarmUnitByName(data.name);
    if (checkDuplicate) throw new CustomError('Farm Unit record already exists.', 400);

    const newFarmUnit = await repository.farmUnit.createAFarmUnit(data);

    return newFarmUnit;
};

exports.listAllFarmUnits = async (farmBuildingId) => {
    return await repository.farmUnit.listAllFarmUnitsInABuilding(farmBuildingId);
};

exports.feedAFarmUnit = async (id) => {
    const savedRecord = await repository.farmUnit.getAFarmUnitById(id);
    if (!savedRecord) throw new CustomError('Farm Unit Record not Found', 404);

    if (savedRecord.isDead) throw new CustomError('A dead Farm Unit cannot be fed.', 400);

    const response = await repository.farmUnit.feedAFarmUnitManually(id);
    if (!response) throw new CustomError(`You can only feed this farm unit once every ${config.MIN_SECONDS_TO_MANUALLY_FEED_A_UNIT}.`, 400);
    ;
    return true;
};

exports.depleteTheHealthPointOfAllFarmUnits = async () => {
    logger.info('[Farm Unit Job]::Starting to deplete the HealthPoint of all Farm Units.');
    const r = await repository.farmUnit.depleteSelectedFarmUnits();
    logger.info(`[Farm Unit Job]::Finished to deplete the HealthPoint of all Farm Units. result: ${r}`);
};