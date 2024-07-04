import { Router } from 'express';
import movieRouter from './movieRoutes';

const routes = Router();

routes.use('/api/v1/', movieRouter);

export default routes;
