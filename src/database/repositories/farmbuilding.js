import { Op } from 'sequelize';
import model from '../models';
import config from '../../config/sysConfig';
import { getNumber, getThousand } from '../../utils/checkNumber';

const toDatabase = (rawData) => ({
  name: rawData.name,
  type: rawData.type,
  lastFedTime: rawData.lastFedTime || getThousand(Date.now()),
});

const toDomain = (dbData) => ({
  id: dbData.id,
  name: dbData.name,
  type: dbData.type,
  farmUnitCount: dbData.FarmUnits ? dbData.FarmUnits.length : 0,
});

export const createAFarmBuilding = async (data) => {
  const cleanedData = toDatabase(data);
  const newFarmBuilding = await model.FarmBuilding.create(cleanedData);

  return toDomain(newFarmBuilding);
};

export const feedAllFarmBuilding = async () => {
  const farmBuildingFeedingInterval = getNumber(
    config.FARM_BUILDING_FEEDING_INTERVAL,
    60,
  );
  const result = await model.sequelize.transaction(
    async (SequelizeTransaction) => {
      const affectedFarmBuilding = await model.FarmBuilding.findAll({
        lock: true,
        transaction: SequelizeTransaction,
        where: {
          lastFedTime: {
            [Op.lte]: getThousand(Date.now()) - farmBuildingFeedingInterval,
          },
        },
      });
      if (affectedFarmBuilding.length === 0) return [[0], [0]]; // maintain a consistent result
      const affectedFarmBuildingIds = affectedFarmBuilding.map(
        (row) => row.id,
      );

      const response = await Promise.all([
        model.FarmBuilding.update(
          {
            lastFedTime: model.sequelize.literal(
              `"lastFedTime" + ${farmBuildingFeedingInterval}`,
            ),
          },
          {
            lock: true,
            transaction: SequelizeTransaction,
            where: {
              id: { [Op.in]: affectedFarmBuildingIds },
            },
          },
        ),
        model.FarmUnit.update(
          {
            healthPoint: model.sequelize.literal(
              '("healthPoint" + "prevHealthPoint")/ 2',
            ),
            prevHealthPoint: model.sequelize.literal(
              '("healthPoint" + "prevHealthPoint")/ 2',
            ),
            lastFedTime: getThousand(Date.now()),
          },
          {
            where: {
              healthPoint: { [Op.gt]: 0 },
              farmBuildingId: { [Op.in]: affectedFarmBuildingIds },
            },
            lock: true,
            transaction: SequelizeTransaction,
          },
        ),
      ]);
      return response;
    },
  );

  return result;
};

export const listAllFarmBuildings = async () => {
  const allRecords = await model.FarmBuilding.findAll({
    include: [
      {
        model: model.FarmUnit,
      },
    ],
  });

  return allRecords.map(toDomain);
};

export const getAFarmBuildingById = async (id) => {
  const savedRecord = await model.FarmBuilding.findByPk(id);

  return savedRecord;
};

export const getAFarmBuildingByName = async (name) => {
  const savedRecord = await model.FarmBuilding.findOne({
    where: {
      name: { [Op.iLike]: name },
    },
  });

  return !!savedRecord;
};
