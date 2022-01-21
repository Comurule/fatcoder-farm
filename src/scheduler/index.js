import { CronJob } from 'cron';
import { feedAllFarmBuilding } from '../services/farmbuilding.service';
import { depleteTheHealthPointOfAllFarmUnits } from '../services/farmUnit.service';

export default () => {
  const job = new CronJob('* * * * * *', async () => {
    await depleteTheHealthPointOfAllFarmUnits();
    await feedAllFarmBuilding();
  });

  return job.start();
};
