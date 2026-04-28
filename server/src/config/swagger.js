const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Customer API',
      version: '1.0.0',
      description: 'Customer Management API'
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // where swagger comments exist
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;