import { check } from 'express-validator';
import validate from './baseValidator';

const validationRules = {
  create: [
    check('name')
      .trim()
      .notEmpty()
      .withMessage('FARM BUILDING NAME is required')
      .isAlphanumeric()
      .withMessage('FARM BUILDING NAME must be in a alphanumeric format.'),
    check('type')
      .trim()
      .notEmpty()
      .withMessage('FARM UNIT TYPE is required.')
      .isAlphanumeric()
      .withMessage('FARM UNIT TYPE must be in a alphanumeric format.'),
  ],
};

export default (routeValidation) => [
  validationRules[routeValidation],
  validate,
];
