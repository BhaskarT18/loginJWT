const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dao = require("./dao");

module.exports = {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { loginid, firstname, lastname, email, mobile, password } = req.body;

      // Check if user already exists
      const existingUser = await dao.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Create user
      const newUser = await dao.createUser({ loginid, firstname, lastname, email, mobile, password });

      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { loginid, password } = req.body;

      const user = await dao.findUserByLoginId(loginid);
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userid: user.userid, loginid: user.loginid }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,  // ✅ Prevents client-side access
        secure: false,   // ❌ Set to true in production (requires HTTPS)
        sameSite: "Lax"  // Helps with CSRF attacks
      });
  
      console.log("token",token)

      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  },

  async user(req, res){
    try {
      const user = await dao.findUserByLoginId(req.user.loginid);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
  
};
