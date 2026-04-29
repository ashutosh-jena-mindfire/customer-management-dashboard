import path from "node:path";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
openapi: '3.0.0',
info: {
title: 'My API',
version: '1.0.0',
description: 'My API Description',
},
};

const options = {
swaggerDefinition,
servers: [
    { url: 'http://localhost:5000/api/v1', description: 'Local' },
    { url: 'https://customer-api-jcx2.onrender.com', description: 'Production' }
  ],
apis: [path.join(process.cwd(), 'src/**/*.ts')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
