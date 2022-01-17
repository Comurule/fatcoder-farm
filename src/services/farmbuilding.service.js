const repository = require('../database/repositories');
const CustomError = require('../utils/customError');
const sequelize = require('../database/models').sequelize;
const logger = require('../utils/logger');

exports.createAFarmBuilding = async (data) => {
    const checkDuplicate = await repository.farmBuilding.getAFarmBuildingByName(data.name);
    if (checkDuplicate) throw new CustomError('Farm building record already exists.', 400);

    const newFarmBuilding = await repository.farmBuilding.createAFarmBuilding(data);

    return newFarmBuilding;
};

exports.listAllFarmBuildings = async () => {
    return await repository.farmBuilding.listAllFarmBuildings();
};

exports.feedAllFarmBuilding = async () => {
    logger.info(`[Farm Building Job]::Starting to feed all Farm Units in Farm Buildings.`);
    const r = await repository.farmBuilding.feedAllFarmBuilding();
    logger.info(`[Farm Building Job]::Finished to feed all Farm Units in Farm Buildings. result: ${r}`);
};
