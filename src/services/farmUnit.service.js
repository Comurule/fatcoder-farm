import * as farmUnit from '../database/repositories/farmUnit';
import config from '../config/sysConfig';
import CustomError from '../utils/customError';
import logger from '../utils/logger';

export const createAFarmUnit = async (data) => {
  const checkDuplicate = await farmUnit.getAFarmUnitByName(data.name);
  if (checkDuplicate) throw new CustomError('Farm Unit record already exists.', 400);

  const newFarmUnit = await farmUnit.createAFarmUnit(data);

  return newFarmUnit;
};

export const listAllFarmUnits = async (farmBuildingId) => {
  const result = await farmUnit.listAllFarmUnitsInABuilding(farmBuildingId);
  return result;
};

export const feedAFarmUnit = async (id) => {
  const savedRecord = await farmUnit.getAFarmUnitById(id);
  if (!savedRecord) throw new CustomError('Farm Unit Record not Found', 404);

  if (savedRecord.isDead) throw new CustomError('A dead Farm Unit cannot be fed.', 400);

  const response = await farmUnit.feedAFarmUnitManually(id);
  if (!response) {
    throw new CustomError(
      `You can only feed this farm unit once every ${config.MIN_SECONDS_TO_MANUALLY_FEED_A_UNIT} seconds.`,
      400,
    );
  }
  return true;
};

export const depleteTheHealthPointOfAllFarmUnits = async () => {
  logger.info(
    '[Farm Unit Job]::Starting to deplete the HealthPoint of all Farm Units.',
  );
  const r = await farmUnit.depleteSelectedFarmUnits();
  logger.info(
    `[Farm Unit Job]::Finished to deplete the HealthPoint of all Farm Units. result: ${r}`,
  );
};
