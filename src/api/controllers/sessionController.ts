import { Request, Response } from 'express';
import * as sessionService from '../services/sessionService';

export const createSession = async (req: Request, res: Response) => {
  const { movie_id } = req.params;
  const sessionData = req.body;

  try {
    const result = await sessionService.createSession(
      Number(movie_id),
      sessionData,
    );
    if (result.data) {
      const { id, movie, room, capacity, day, time } = result.data;
      res
        .status(result.code)
        .json({ id, movie_id: movie.id, room, capacity, day, time });
      return;
    }
    res.status(result.code).json(result);
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado.',
      details: error,
    });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const sessionData = req.body;
    const { movie_id, id } = req.params;
    const session = await sessionService.updateSession(
      Number(id),
      Number(movie_id),
      sessionData,
    );

    if (session.code === 200) {
      res.status(200).json(session.data);
      return;
    }
    res.status(session.code).json(session);
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado.',
      details: error,
    });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  const { movie_id, id } = req.params;

  try {
    const result = await sessionService.deleteSession(
      Number(id),
      Number(movie_id),
    );
    if (result.code === 404) {
      res.status(404).json(result);
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado.',
      details: error,
    });
  }
};
