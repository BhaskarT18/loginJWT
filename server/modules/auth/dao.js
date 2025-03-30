const bcrypt = require("bcryptjs");
const { sequelize } = require("../../config/db");

module.exports = {
  async createUser({ loginid, firstname, lastname, email, mobile, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await sequelize.query(
        `INSERT INTO users (loginid, firstname, lastname, email, mobile, password, status) 
         VALUES (?, ?, ?, ?, ?, ?, 'Active')`,
        {
          replacements: [loginid, firstname, lastname, email, mobile, hashedPassword],
          type: sequelize.QueryTypes.INSERT,
        }
      );
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async findUserByLoginId(loginid) {
    const [user] = await sequelize.query(
      `SELECT * FROM users WHERE loginid = ? LIMIT 1`,
      {
        replacements: [loginid],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return user;
  },

  async findUserByEmail(email) {
    const [user] = await sequelize.query(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      {
        replacements: [email],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return user;
  },
};
