const CustomError = require('../utils/customError');
const logger = require('../utils/logger');

module.exports = (err, req, res) => {
  if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({ status: 'error', message: err.message });
  }
  let resObj = {};

  if (process.env.NODE_ENV === 'production') {
    logger.error(err);
    resObj = {
      status: 'fail',
      messsage: 'Something went wrong. Try again later.',
    };
  } else {
    resObj = {
      status: 'fail',
      message: err.message,
      data: err.stack,
    };
  }

  res.status(500).json(resObj);
  return process.exit(0);
};
