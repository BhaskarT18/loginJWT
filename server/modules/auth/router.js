const express = require("express");
const { registerValidation, loginValidation } = require("./validator");
const controller = require("./controller");
const authenticateUser = require("../../middleware/authJwt");

const router = express.Router();

router.post("/register", registerValidation, controller.register);
router.post("/login", loginValidation, controller.login);
router.get("/user", authenticateUser ,controller.user);

module.exports = router;
