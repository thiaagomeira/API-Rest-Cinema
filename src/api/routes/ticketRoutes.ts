import express from 'express';
import * as TicketController from '../controllers/ticketController';

const router = express.Router();

router.get('/tickets', TicketController.getTickets);
//router.get('/tickets/:id', TicketController.getTicketById);
//router.post('/tickets', TicketController.createTicket);
//router.put('/tickets/:id', TicketController.updateTicket);
//router.delete('/tickets/:id', TicketController.deleteTicket);

export default router;
