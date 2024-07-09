import { Router } from 'express';
import ticketRouter from './ticketRoutes';
import movieRouter from './movieRoutes';
import sessionRouter from './sessionRoutes';

const routes = Router();

routes.use('/api/v1/', movieRouter);
routes.use('/api/v1/', sessionRouter);
routes.use('/api/v1', ticketRouter);

export default routes;
