import express from 'express';
import customerRoutes from './modules/customer/customer.routes';
import errorMiddleware from './middlewares/error.middleware';
import requestLogger from './middlewares/logger.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true
    })
);
app.use(requestLogger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', customerRoutes);

// Error handler (must be last)
app.use(errorMiddleware);

export default app;
