const express = require("express");
const authRoutes = require("../modules/auth/router");

const router = express.Router();

router.use("/auth", authRoutes);

module.exports = router;
