import express, { Request, Response } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { AppDataSource } from '../database/data-source';
import routes from '../routes';
import { errors } from 'celebrate';
import { swaggerUi, specs } from '../swagger';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(routes);
app.use(errors());
app.use(cors);

AppDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.log(error));

export default app;
