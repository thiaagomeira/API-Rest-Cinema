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

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - image
 *         - name
 *         - description
 *         - actors
 *         - genre
 *         - release_date
 *       properties:
 *         image:
 *           type: string
 *           description: URL da imagem
 *         name:
 *           type: string
 *           description: Nome do filme
 *         description:
 *           type: string
 *           description: Descrição do filme
 *         actors:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de atores
 *         genre:
 *           type: string
 *           description: Gênero do filme
 *         release_date:
 *           type: string
 *           format: date
 *           description: Data de lançamento
 *       example:
 *         image: "http://exemplo.com/imagem.jpg"
 *         name: "nome_do_filme"
 *         description: "descricao_do_filme"
 *         actors: ["ator1", "ator2", "ator3"]
 *         genre: "genero_do_filme"
 *         release_date: "10/03/2024"
 */

/**
 * @swagger
 * /api/v1/movies:
 *   post:
 *     summary: Cria um novo filme
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Filme criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     summary: Retorna a lista de filmes
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Lista de filmes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

/**
 * @swagger
 * /api/v1/movies/{id}:
 *   get:
 *     summary: Retorna um filme pelo ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do filme
 *     responses:
 *       200:
 *         description: Filme encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Filme não encontrado
 */

/**
 * @swagger
 * /api/v1/movies/{id}:
 *   put:
 *     summary: Atualiza um filme pelo ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do filme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Filme não encontrado
 */

/**
 * @swagger
 * /api/v1/movies/{id}:
 *   delete:
 *     summary: Deleta um filme pelo ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do filme
 *     responses:
 *       204:
 *         description: Filme deletado com sucesso
 *       404:
 *         description: Filme não encontrado
 */

export default router;
