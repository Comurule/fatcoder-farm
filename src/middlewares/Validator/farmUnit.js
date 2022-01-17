const { check } = require('express-validator')
const validate = require('./baseValidator')

const validationRules = {
	checkId: [
		check('id')
			.trim()
			.notEmpty()
			.withMessage('ID is required.')
			.isInt()
			.withMessage('ID must be an integer'),
	],
	checkFarmBuildingId: [
		check('farmBuildingId')
			.trim()
			.notEmpty()
			.withMessage('FARM BUILDING ID is required.')
			.isInt()
			.withMessage('FARM BUILDING ID must be an integer'),
	],
	create: [
		check('name')
			.trim()
			.notEmpty()
			.withMessage('FARM UNIT NAME is required')
			.isString()
			.withMessage(
				'FARM UNIT NAME must be in a string format.'
			),
		check('healthPoint')
			.trim()
			.optional()
			.notEmpty()
			.withMessage('HEALTH POINT can not be empty.')
			.isInt({ min: 50, max: 100 })
			.withMessage('HEALTH POINT must be an integer within the range 50 - 100.'),
	],
}

module.exports = (routeValidation) => [
	validationRules[routeValidation],
	validate,
]
