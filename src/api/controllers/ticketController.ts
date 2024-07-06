import { Request, Response } from 'express';
import * as ticketService from '../services/ticketService';

const handleAsync = (fn: Function) => async (req: Request, res: Response) => {
  try {
    await fn(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Aconteceu um erro!', error });
  }
};

export const getTickets = async (req: Request, res: Response) => {
  const tickets = await ticketService.getTickets();
  res.status(200).json(tickets);
};

export const getTicketById = handleAsync(async (req: Request, res: Response) => {
  const ticket = await ticketService.getTicketById(Number(req.params.id));
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404).json({ message: 'Ingresso não encontrado!' });
  }
});

export const createTicket = handleAsync(async (req: Request, res: Response) => {
  const { sessionId } = req.body;
  const ticketData = req.body;

  try {
    const newTicket = await ticketService.createTicket(sessionId, ticketData);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: 'Falha ao criar ingresso!', error });
  }
});

export const updateTicket = handleAsync(async (req: Request, res: Response) => {
  const updatedTicket = await ticketService.updateTicket(Number(req.params.id), req.body);
  if (updatedTicket) {
    res.json(updatedTicket);
  } else {
    res.status(404).json({ message: 'Ingresso não encontrado!' });
  }
});

export const deleteTicket = handleAsync(async (req: Request, res: Response) => {
  const success = await ticketService.deleteTicket(Number(req.params.id));
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Ingresso não encontrado!' });
  }
});
