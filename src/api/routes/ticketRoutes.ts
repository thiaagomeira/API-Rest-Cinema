import express from 'express';
import * as TicketController from '../controllers/ticketController';
import { celebrate, Joi, Segments } from 'celebrate';

const router = express.Router();
const schema = {
  [Segments.BODY]: Joi.object({
    chair: Joi.string()
      .pattern(/^[a-z]\d$/)
      .required(),
    value: Joi.number().integer().positive().required(),
  }),
};
router.get('/tickets', TicketController.getTickets);
//router.get('/tickets/:id', TicketController.getTicketById);
router.post(
  '/movies/:movie_id/sessions/:session_id/tickets',
  celebrate(schema),
  TicketController.createTicket,
);
router.put(
  '/movies/:movies_id/sessions/:session_id/tickets/:id',
  celebrate(schema),
  TicketController.updateTicket,
);

router.delete(
  '/movies/:movies_id/sessions/:session_id/tickets/:id',
  TicketController.deleteTicket,
);

export default router;
