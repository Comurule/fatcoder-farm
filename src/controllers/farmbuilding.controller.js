import * as farmBuildingService from '../services/farmbuilding.service';

export const createAFarmBuilding = async (req, res, next) => {
  try {
    const result = await farmBuildingService.createAFarmBuilding(req.body);
    return res.status(201).json({
      status: 'success',
      message: 'Farm Building record created successfully.',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

export const listAllFarmBuildings = async (req, res, next) => {
  try {
    const result = await farmBuildingService.listAllFarmBuildings();
    return res.status(200).json({
      status: 'success',
      message: 'Farm Building list.',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};
