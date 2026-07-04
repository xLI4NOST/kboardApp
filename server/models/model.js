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
        order: {type: DataTypes.INTEGER, allowNull: false},
    })

    const Dashboard  = sequelize.define("dashboard", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        slug: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true},
    })


    User.hasMany(Dashboard, {foreignKey: 'userId', hooks: true, onDelete: "CASCADE"})
    Dashboard.belongsTo(User, {foreignKey: 'userId'})
    Dashboard.hasMany(Card, {foreignKey: 'dashboardId', hooks: true, onDelete: 'CASCADE'})
    Card.belongsTo(Dashboard, {foreignKey: 'dashboardId'})

    Card.hasMany(Task, {
        foreignKey: 'cardId',
        onDelete: 'CASCADE',
        hooks: true,
    })
    Task.belongsTo(Card, {foreignKey: 'cardId'})

    module.exports = {
       User,Dashboard, Card, Task
    }
