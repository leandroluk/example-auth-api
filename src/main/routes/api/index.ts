import { loggerMiddleware } from '$/main/middlewares/logger';
import { Router } from 'express';
import authRoutes from './auth.routes';

const apiRoutes = Router();

apiRoutes.use(loggerMiddleware);

apiRoutes.use('/auth', authRoutes);

export default apiRoutes;