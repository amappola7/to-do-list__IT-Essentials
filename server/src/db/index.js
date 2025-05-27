const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('YourDatabaseName', 'YourUsername', 'YourPassword', {
//   host: 'YourServerNameOrIP', // e.g. "127.0.0.1" or "my-sqlserver.company.net"
//   port: 1433, // Default SQL Server port
//   dialect: 'mssql',
//   dialectModule: require('tedious'),
//   dialectOptions: {
//     options: {
//       encrypt: true, // Required for Azure; can be false for local
//       trustServerCertificate: true, // Set to true for self-signed certs/local dev
//     }
//   },
//   logging: false // Set to true for SQL debug logs
// });

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', // Use ':memory:' for an in-memory database
    logging: false,
});

const startConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startConnection();

module.exports = sequelize;