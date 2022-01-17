const { check } = require('express-validator');
const validate = require('./baseValidator');

const validationRules = {
  create: [
    check('name')
      .trim()
      .notEmpty()
      .withMessage('FARM BUILDING NAME is required')
      .isAlphanumeric()
      .withMessage(
        'FARM BUILDING NAME must be in a alphanumeric format.',
      ),
    check('type')
      .trim()
      .notEmpty()
      .withMessage('FARM UNIT TYPE is required.')
      .isAlphanumeric()
      .withMessage(
        'FARM UNIT TYPE must be in a alphanumeric format.',
      ),
  ],
};

module.exports = (routeValidation) => [
  validationRules[routeValidation],
  validate,
];
