import * as farmBuilding from '../database/repositories/farmbuilding';
import CustomError from '../utils/customError';
import logger from '../utils/logger';

export const createAFarmBuilding = async (data) => {
  const checkDuplicate = await farmBuilding.getAFarmBuildingByName(
    data.name,
  );
  if (checkDuplicate) throw new CustomError('Farm building record already exists.', 400);

  const newFarmBuilding = await farmBuilding.createAFarmBuilding(
    data,
  );

  return newFarmBuilding;
};

export const listAllFarmBuildings = () => farmBuilding.listAllFarmBuildings();

export const feedAllFarmBuilding = async () => {
  logger.info(
    '[Farm Building Job]::Starting to feed all Farm Units in Farm Buildings.',
  );
  const r = await farmBuilding.feedAllFarmBuilding();
  logger.info(
    `[Farm Building Job]::Finished to feed all Farm Units in Farm Buildings. result: ${r}`,
  );
};
