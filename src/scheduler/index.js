const { CronJob } = require('cron');
const farmBuildingService = require('../services/farmbuilding.service');
const farmUnitService = require('../services/farmUnit.service');

module.exports = () => {
  const job = new CronJob('* * * * * *', (async () => {
    await farmUnitService.depleteTheHealthPointOfAllFarmUnits();
    await farmBuildingService.feedAllFarmBuilding();
  }));

  return job.start();
};
