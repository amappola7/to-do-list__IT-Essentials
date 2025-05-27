const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const Users = sequelize.define('Users', {
    UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'Users'
});

module.exports = Users;