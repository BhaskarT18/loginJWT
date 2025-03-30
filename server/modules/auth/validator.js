const { body } = require("express-validator");

const registerValidation = [
  body("loginid").notEmpty().withMessage("Login ID is required"),
  body("firstname").notEmpty().withMessage("First name is required"),
  body("lastname").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("mobile").isMobilePhone().withMessage("Invalid mobile number"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("loginid").notEmpty().withMessage("Login ID is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { registerValidation, loginValidation };
