const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const actionItems = sequelize.define('ActionItems', {
    ActionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TaskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tasks', 
            key: 'TaskId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    Comment: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'ActionItems'
});

module.exports = actionItems;