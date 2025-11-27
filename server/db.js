const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    String(process.env.DB_PASSWORD),
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
)