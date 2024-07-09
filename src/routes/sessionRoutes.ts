import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  createSession,
  updateSession,
  deleteSession,
} from '../api/controllers/sessionController';
import { sessionSchema } from './schemas/sessionSchema';

const router = Router();

router.post(
  '/movies/:movie_id/sessions',
  celebrate(sessionSchema),
  createSession,
);
router.put(
  '/movies/:movie_id/sessions/:id',
  celebrate(sessionSchema),
  updateSession,
);
router.delete('/movies/:movie_id/sessions/:id', deleteSession);

/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *         - room
 *         - capacity
 *         - day
 *         - time
 *       properties:
 *         room:
 *           type: string
 *           description: Nome da sala
 *         capacity:
 *           type: integer
 *           description: Capacidade da sala
 *         day:
 *           type: string
 *           format: date
 *           description: Data da sessão
 *         time:
 *           type: string
 *           format: time
 *           description: Hora da sessão
 *       example:
 *         room: "nome_da_sala"
 *         capacity: 100
 *         day: "03/06/2024"
 *         time: "14:23:00"
 */

/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions:
 *   post:
 *     summary: Cria uma nova sessão
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do filme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       201:
 *         description: Sessão criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions/{id}:
 *   put:
 *     summary: Atualiza uma sessão existente
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do filme
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sessão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       201:
 *         description: Sessão atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Sessão não encontrada
 */

/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions/{id}:
 *   delete:
 *     summary: Deleta uma sessão existente
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do filme
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sessão
 *     responses:
 *       204:
 *         description: Sessão deletada com sucesso
 *       404:
 *         description: Sessão não encontrada
 */

export default router;
