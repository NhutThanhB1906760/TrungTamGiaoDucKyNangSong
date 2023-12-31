const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port:process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    }
  }