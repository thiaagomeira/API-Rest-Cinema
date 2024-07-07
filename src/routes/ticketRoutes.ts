import express from 'express';
import * as TicketController from '../api/controllers/ticketController';
import { celebrate, Joi, Segments } from 'celebrate';

const router = express.Router();
const ticketSchema = {
  [Segments.BODY]: Joi.object({
    chair: Joi.string()
      .pattern(/^[a-z]\d$/)
      .required()
      .messages({
        'string.pattern.base':
          'chair deve seguir o padrão: uma letra seguida por um número, por exemplo, a1',
        'any.required': 'chair é obrigatório',
      }),
    value: Joi.number().integer().positive().required().messages({
      'number.base': 'value deve ser um número',
      'number.integer': 'value deve ser um número inteiro',
      'number.positive': 'value deve ser um número positivo',
      'any.required': 'value é obrigatório',
    }),
  }),
};
router.get('/tickets', TicketController.getTickets);
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
 * /movies/{movie_id}/sessions/{session_id}/tickets:
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
 *       200:
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
 * /movies/{movie_id}/sessions/{session_id}/tickets/{id}:
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
 * /movies/{movie_id}/sessions/{session_id}/tickets/{id}:
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
 *       200:
 *         description: Ticket deletado com sucesso
 *       404:
 *         description: Ticket não encontrado
 */

export default router;
