import express from 'express';
import * as MovieController from '../api/controllers/movieController';
import { celebrate } from 'celebrate';
import { movieSchema } from './schemas/movieSchema';

const router = express.Router();

router.get('/movies', MovieController.getMovies); // Rota para obter todos os filmes
router.get('/movies/:id', MovieController.getMovieById); // Rota para obter um filme por ID
router.post('/movies', celebrate(movieSchema), MovieController.createMovie); // Rota para criar um novo filme
router.put('/movies/:id', celebrate(movieSchema), MovieController.updateMovie); // Rota para atualizar um filme por ID
router.delete('/movies/:id', MovieController.deleteMovie); // Rota para deletar um filme por ID

export default router;
