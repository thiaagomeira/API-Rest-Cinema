import { Movie } from '../../database/entities/Movie';
import { AppDataSource } from '../../database/data-source';

const movieRepository = AppDataSource.getRepository(Movie);

interface ErrorResponse {
  code: number;
  message: string;
  status: string;
}

// Obter todos os filmes
export const getMovies = async (): Promise<Movie[]> => {
  return await movieRepository.find({
    relations: ['sessions', 'sessions.tickets'],
  });
};

// Obter um filme pelo ID
export const getMovieById = async (
  id: number,
): Promise<Movie | ErrorResponse> => {
  const movie = await movieRepository.findOne({
    where: { id },
    relations: ['sessions', 'sessions.tickets'],
  });

  if (!movie)
    return { code: 404, status: 'Not Found', message: 'Filme não encontrado' };
  return movie;
};

// Criar novo filme
export const createMovie = async (
  movieData: Movie,
): Promise<Movie | ErrorResponse> => {
  const findMovie = await movieRepository.findOne({
    where: { name: movieData.name },
  });

  if (findMovie)
    return {
      code: 400,
      status: 'Bad Request',
      message: 'Já existe um filme com esse nome',
    };
  const movie = new Movie();
  movie.name = movieData.name;
  movie.description = movieData.description;
  movie.image = movieData.image;
  movie.actors = movieData.actors;
  movie.release_date = movieData.release_date;

  const result = await movieRepository.save(movie);
  return result;
};

// Atualizar filme existente
export const updateMovie = async (
  id: number,
  movieData: Movie,
): Promise<Movie | ErrorResponse> => {
  const movie = await movieRepository.findOneBy({ id: id });
  if (!movie)
    return {
      code: 404,
      status: 'Not Found',
      message: `Filme de id ${id} não foi encontrado`,
    };

  const existingMovie = await movieRepository.findOne({
    where: { name: movieData.name },
  });
  if (existingMovie)
    return {
      code: 400,
      status: 'Bad Request',
      message: `Já existe um filme com o nome ${movieData.name}`,
    };
  movie.name = movieData.name;
  movie.description = movieData.description;
  movie.image = movieData.image;
  movie.actors = movieData.actors;
  movie.release_date = movieData.release_date;
  const result = await movieRepository.save(movie);
  return result;
};

// Deletar filme
export const deleteMovie = async (id: number): Promise<ErrorResponse> => {
  const movie = await movieRepository.findOne({ where: { id } });
  if (!movie)
    return { code: 404, status: 'Not Found', message: 'Filme não encontrado' };
  await movieRepository.delete(id);
  return { code: 204, status: '', message: '' };
};
