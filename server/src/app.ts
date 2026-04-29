import express from 'express';
import customerRoutes from './modules/customer/customer.routes';
import errorMiddleware from './middlewares/error.middleware';
import requestLogger from './middlewares/logger.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import helmet from 'helmet';
import cors from 'cors';
import { limiter } from './config/rate-limiter';
import { ALLOWED_ORIGINS } from './config';

const app = express();

app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true
}));
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', customerRoutes);

// Error handler (must be last)
app.use(errorMiddleware);

export default app;
