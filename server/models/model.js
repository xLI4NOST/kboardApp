const sequelize = require("../db");
const {DataTypes, INTEGER} = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const DashBoard = sequelize.define("dashBoard", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Task = sequelize.define("task", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    priority: {type: DataTypes.STRING, defaultValue: 'LOW'},
    title: {type: DataTypes.STRING, allowNull: false, defaultValue: 'some title'},
    subtitle: {type: DataTypes.STRING, allowNull: true, defaultValue: ''},
})

User.hasMany(DashBoard, {foreignKey: 'userId'})
DashBoard.belongsTo(User, {foreignKey: 'userId'})

DashBoard.hasMany(Task, {foreignKey: 'userId'})
Task.belongsTo(DashBoard, {foreignKey: 'userId'})

module.exports = {
   User, DashBoard, Task
}