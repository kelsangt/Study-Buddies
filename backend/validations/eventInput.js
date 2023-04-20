const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateEventInput = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 140 })
    .withMessage('Name must be between 5 and 140 characters long'),
  handleValidationErrors
];

module.exports = validateEventInput;