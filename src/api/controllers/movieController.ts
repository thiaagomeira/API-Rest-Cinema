import { Request, Response } from 'express';
import * as movieService from '../services/movieService'; // Importa os métodos do movieService

// Tipo para funções que recebem req (Request) e res (Response) e retornam Promise<void>
type AsyncHandler = (req: Request, res: Response) => Promise<void>;

// Capturar erros e enviar respostas
const handleAsync =
  (fn: AsyncHandler) => async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro!', error }); // Se ocorrer um erro, retorna um status 500 com mensagem de erro
    }
  };

export const getMovies = handleAsync(async (req: Request, res: Response) => {
  const movies = await movieService.getMovies();
  res.status(200).json(movies);
});

export const getMovieById = handleAsync(async (req: Request, res: Response) => {
  const result = await movieService.getMovieById(Number(req.params.id));
  if ('code' in result) {
    res.status(result.code).json(result);
  } else {
    res.status(201).json(result);
  }
});

export const createMovie = handleAsync(async (req: Request, res: Response) => {
  const result = await movieService.createMovie(req.body);
  if ('code' in result) {
    res.status(result.code).json(result);
  } else {
    res.status(201).json(result);
  }
});

export const updateMovie = handleAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await movieService.updateMovie(Number(id), req.body);
  if ('code' in result) {
    res.status(result.code).json(result);
  } else {
    res.status(200).json(result);
  }
});

export const deleteMovie = handleAsync(async (req: Request, res: Response) => {
  const result = await movieService.deleteMovie(Number(req.params.id));
  if (result.code === 204) {
    res.status(204).send();
  } else {
    res.status(result.code).json(result);
  }
});
