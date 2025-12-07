const sequelize = require("../db");
const {DataTypes, INTEGER} = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const Card = sequelize.define("card", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull: false},
})

const Task = sequelize.define("task", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    priority: {type: DataTypes.STRING, defaultValue: 'LOW'},
    title: {type: DataTypes.STRING, allowNull: false, defaultValue: 'some title'},
    subtitle: {type: DataTypes.STRING, allowNull: true, defaultValue: ''},
})

User.hasMany(Card, {foreignKey: 'userId'})
Card.belongsTo(User, {foreignKey: 'userId'})

Card.hasMany(Task, {foreignKey: 'cardId'})
Task.belongsTo(Card, {foreignKey: 'cardId'})

module.exports = {
   User, Card, Task
}
