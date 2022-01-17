const model = require('../models');
const { Op } = require('sequelize');
const config = require('../../config/sysConfig');
const { getNumber, getThousand } = require('../../utils/checkNumber');
const logger = require('../../utils/logger');

const toDatabase = rawData => {
    return {
        name: rawData.name,
        healthPoint: getNumber(rawData.healthPoint, config.INITIAL_FARM_UNIT_HEALTH_POINTS),
        prevHealthPoint: getNumber(rawData.healthPoint, config.INITIAL_FARM_UNIT_HEALTH_POINTS),
        farmBuildingId: rawData.farmBuildingId,
        lastManualFeedTime: rawData.lastManualFeedTime || getThousand(Date.now()),
        lastFedTime: rawData.lastFedTime || getThousand(Date.now()),
        isDead: rawData.isDead
    };
};

const toDomain = dbData => {
    return {
        id: dbData.id,
        name: dbData.name,
        healthPoint: dbData.healthPoint,
        isDead: dbData.isDead
    };
};

exports.createAFarmUnit = async (data) => {
    const cleanedData = toDatabase(data);
    const newFarmUnit = await model.FarmUnit.create(cleanedData);

    return toDomain(newFarmUnit);
};

exports.updateAFarmUnit = async (id, data, transaction = null) => {
    const cleanedData = toDatabase(data);
    const options = { where: { id } };
    if (transaction) options.transaction = transaction;

    const response = await model.FarmUnit.update(cleanedData, options);

    return !!response;
};

exports.feedAFarmUnitManually = async (id) => {
    const minSecToManuallyFeedAUnit = getNumber(config.MIN_SECONDS_TO_MANUALLY_FEED_A_UNIT, 5);
    const response = await model.FarmUnit.update({
        healthPoint: model.sequelize.literal(`"healthPoint" + 1`),
        lastManualFeedTime: getThousand(Date.now())
    }, {
        lock: true,
        where: {
            // ensure the last manual feed time has exceeded 5 secs
            id,
            lastManualFeedTime: { [Op.lte]: (getThousand(Date.now()) - minSecToManuallyFeedAUnit) },
            isDead: false
        }
    });

    return response[0] !== 0;
};

exports.depleteSelectedFarmUnits = async () => {
    const farmUnitCountdownInterval = getNumber(config.FARM_UNIT_COUNTDOWN_INTERVAL, 10);
    try {
        const result = await model.sequelize.transaction(async (SequelizeTransaction) => {
            const response = await model.FarmUnit.update({
                healthPoint: model.sequelize.literal(`"healthPoint" - 1`),
                lastFedTime: model.sequelize.literal(`"lastFedTime" + ${farmUnitCountdownInterval}`),
                isDead: model.sequelize.literal(`CASE WHEN "lastFedTime" = 1 THEN true ELSE "isDead" END`)
            }, {
                lock: true,
                transaction: SequelizeTransaction,
                where: {
                    // get farm units that the lastFedTime is the configured time interval and isDead = false
                    lastFedTime: { [Op.lte]: (getThousand(Date.now()) - farmUnitCountdownInterval) },
                    isDead: false
                }
            });
            return response;
        });

        return result;

    } catch (error) {
        logger.error('Farm Unit Feeding Depletion Error: '+error);
    }
};

exports.listAllFarmUnitsInABuilding = async (farmBuildingId) => {
    const allRecords = await model.FarmUnit.findAll({ where: { farmBuildingId } });

    return allRecords.map(toDomain);
};

exports.getAFarmUnitById = async (id) => {
    const savedRecord = await model.FarmUnit.findByPk(id);

    return savedRecord;
};

exports.getAFarmUnitByName = async (name) => {
    const savedRecord = await model.FarmUnit.findOne({
        where: {
            name: { [Op.iLike]: name }
        }
    });

    return !!savedRecord;
};