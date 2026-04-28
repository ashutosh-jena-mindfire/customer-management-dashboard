import swaggerJsDoc from 'swagger-jsdoc';

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
    ],
  },
  // Look for .ts files in development and .js in production
  apis: ['./src/routes/*.ts', './dist/routes/*.js']
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
