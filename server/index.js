const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // ✅ Import cookie-parser
const { connectDB, sequelize } = require("./config/db");
const routes = require("./router/index");

dotenv.config();

const app = express();

// ✅ Configure CORS to allow credentials (Important for cookies)
app.use(cors({ 
  origin: "http://localhost:3000", // Change this to your frontend URL
  credentials: true // ✅ Allows frontend to send cookies
}));

app.use(express.json());
app.use(cookieParser()); // ✅ Use cookie-parser

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await sequelize.authenticate();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
