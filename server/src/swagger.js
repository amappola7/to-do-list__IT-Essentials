const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API',
      version: '1.0.0',
      description: 'API para gestionar tareas',
    },
  },
  apis: ['./src/controllers/*.js'], // Ajusta la ruta según tu estructura
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };