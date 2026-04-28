import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customer.routes';
import errorMiddleware from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import requestLogger from './middlewares/logger.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', customerRoutes);

// Error handler (must be last)
app.use(errorMiddleware);

export default app;
