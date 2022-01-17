const { CronJob } = require('cron');
const farmBuildingService = require('../services/farmbuilding.service');
const farmUnitService = require('../services/farmUnit.service');
const config = require('../config/sysConfig');
const {getNumber} = require('../utils/checkNumber');
const logger = require('../utils/logger');

const feedingCountdown = getNumber(config.FARM_BUILDING_FEEDING_INTERVAL, 60);
const timer = `*/${feedingCountdown} * * * * *`;

module.exports = () => {
    const job = new CronJob('* * * * * *', async function (){
        await farmUnitService.depleteTheHealthPointOfAllFarmUnits();
        await farmBuildingService.feedAllFarmBuilding();
    });

    return job.start();
};