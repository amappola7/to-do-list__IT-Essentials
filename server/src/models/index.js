const Users = require('./userModel');
const Tasks = require('./taskModel');
const ActionItems = require('./actionItemModel');

// Associations
Tasks.belongsTo(Users, { foreignKey: 'UserId' });
Users.hasMany(Tasks, { foreignKey: 'UserId' });

ActionItems.belongsTo(Tasks, { foreignKey: 'TaskId' });
Tasks.hasMany(ActionItems, { foreignKey: 'TaskId' });

module.exports = {
    Users,
    Tasks,
    ActionItems
};