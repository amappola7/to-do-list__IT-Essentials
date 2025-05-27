const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasksRoutes');
const usersRoutes = require('./routes/usersRoutes');
const actionItemsRoutes = require('./routes/actionItemsRoutes');
const db = require('./db/index');

const app = express();
const { swaggerUi, swaggerSpec } = require('./swagger');

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL/port
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize database connection
// db.connect();

// Set up routes
app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/action-items', actionItemsRoutes);

module.exports = app;