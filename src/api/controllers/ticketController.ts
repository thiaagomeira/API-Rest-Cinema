import { Request, Response } from 'express';
import * as ticketService from '../services/ticketService';

export const createTicket = async (req: Request, res: Response) => {
  try {
    const ticketData = req.body;
    const { session_id } = req.params;
    const result = await ticketService.createTicket(
      Number(session_id),
      ticketData,
    );
    if ('code' in result) {
      res.status(result.code).json(result);
    } else {
      res.status(201).json({
        id: result.id,
        session_id: result.session.id,
        chair: result.chair,
        value: result.value,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const result = await ticketService.updateTicket(
      Number(req.params.id),
      Number(req.params.session_id),
      req.body,
    );
    if ('code' in result) {
      res.status(result.code).json(result);
    } else {
      res.status(200).json({
        id: result.id,
        session_id: result.session.id,
        chair: result.chair,
        value: result.value,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  const success = await ticketService.deleteTicket(Number(req.params.id));
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({
      code: 404,
      status: 'Not Found',
      message: 'Ingresso não encontrado!',
    });
  }
};
