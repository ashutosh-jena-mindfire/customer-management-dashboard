const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customer.routes');
const errorMiddleware = require('./middlewares/error.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const requestLogger = require('./middlewares/logger.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/customers', customerRoutes);

// Error handler (must be last)
app.use(errorMiddleware);

module.exports = app;