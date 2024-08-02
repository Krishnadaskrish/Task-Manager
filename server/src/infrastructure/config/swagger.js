// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo Manager API',
      version: '1.0.0',
      description: 'A simple Todo Manager API',
    },
    servers: [
      {
        url: 'http://localhost:3001', // 
      },
    ],
  },
  apis: [
    path.join(__dirname, '../../docs/auth.yaml'),
    path.join(__dirname, '../../docs/todo.yaml'),
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
