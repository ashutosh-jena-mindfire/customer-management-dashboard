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

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'https://customer-management-dashboard-opal.vercel.app'
]

app.use(cors({
  origin: defaultAllowedOrigins,
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
