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

// Obter todos os filmes
export const getMovies = handleAsync(async (req: Request, res: Response) => {
  const movies = await movieService.getMovies(); // Chama o serviço para obter todos os filmes
  res.json(movies); // Retorna os filmes em formato JSON
});

// Obter um filme por ID
export const getMovieById = handleAsync(async (req: Request, res: Response) => {
  const movie = await movieService.getMovieById(Number(req.params.id));
  if (movie) {
    res.json(movie); // Se o filme for encontrado, retorna-o em formato JSON
  } else {
    res.status(404).json({ message: 'Filme não encontrado!' }); // Se o filme não for encontrado, retorna um status 404 com mensagem de erro
  }
});

// Criar um novo filme
export const createMovie = handleAsync(async (req: Request, res: Response) => {
  const result = await movieService.createMovie(req.body);
  if ('code' in result) {
    res.status(result.code).json(result);
  } else {
    res.status(201).json(result);
  }
});

// Atualizar um filme existente por ID
export const updateMovie = handleAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await movieService.updateMovie(Number(id), req.body);
  if ('code' in result) {
    res.status(result.code).json(result);
  } else {
    res.status(200).json(result);
  }
});

// Deletar um filme por ID
export const deleteMovie = handleAsync(async (req: Request, res: Response) => {
  const success = await movieService.deleteMovie(Number(req.params.id)); // Deletar um filme por ID
  if (success) {
    res.status(204).send(); // Se o filme for deletado com sucesso, retorna um status 204
  } else {
    res.status(404).json({ message: 'Filme não encontrado!' });
  }
});
