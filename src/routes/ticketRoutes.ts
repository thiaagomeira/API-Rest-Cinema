import express from 'express';
import * as TicketController from '../api/controllers/ticketController';
import { celebrate } from 'celebrate';
import { ticketSchema } from './schemas/ticketSchema';

const router = express.Router();

//router.get('/tickets', TicketController.getTickets);
//router.get('/tickets/:id', TicketController.getTicketById);
router.post(
  '/movies/:movie_id/sessions/:session_id/tickets',
  celebrate(ticketSchema),
  TicketController.createTicket,
);
router.put(
  '/movies/:movies_id/sessions/:session_id/tickets/:id',
  celebrate(ticketSchema),
  TicketController.updateTicket,
);

router.delete(
  '/movies/:movies_id/sessions/:session_id/tickets/:id',
  TicketController.deleteTicket,
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *         - chair
 *         - value
 *       properties:
 *         chair:
 *           type: string
 *           pattern: '^[a-z]\\d$'
 *           example: 'a1'
 *         value:
 *           type: integer
 *           example: 10
 */

/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions/{session_id}/tickets:
 *   post:
 *     summary: Cria um novo ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: session_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sessão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ticket criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions/{session_id}/tickets/{id}:
 *   put:
 *     summary: Atualiza um ticket existente
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: session_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sessão
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: Ticket atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Ticket não encontrado
 */

/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions/{session_id}/tickets/{id}:
 *   delete:
 *     summary: Deleta um ticket existente
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ticket
 *     responses:
 *       204:
 *         description: Ticket deletado com sucesso
 *       404:
 *         description: Ticket não encontrado
 */

export default router;
