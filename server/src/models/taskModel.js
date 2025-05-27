const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const Tasks = sequelize.define('Tasks', {
    TaskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TaskName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Not Started'
    },
    Priority: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    StartDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    EstimatedDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'UserId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    timestamps: true,
    tableName: 'Tasks'
});

sequelize.sync({ force: false })
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('Error synchronizing models:', error);
    });

module.exports = Tasks;