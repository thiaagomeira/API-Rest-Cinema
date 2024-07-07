import { Movie } from 'src/database/entities/Movie';
import { AppDataSource } from 'src/database/data-source';

const movieRepository = AppDataSource.getRepository(Movie);

interface ErrorResponse {
  code: number;
  message: string;
}

// Obter todos os filmes
export const getMovies = async (): Promise<Movie[]> => {
  return await movieRepository.find({ relations: ['sessions'] });
};

// Obter um filme pelo ID
export const getMovieById = async (
  id: number,
): Promise<Movie | ErrorResponse> => {
  const movie = await movieRepository.findOne({
    where: { id },
    relations: ['sessions'],
  });

  if (!movie) return { code: 400, message: 'Filme não encontrado' };
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
    return { code: 400, message: 'Já existe um filme com esse nome' };
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
  if (!movie) return { code: 400, message: 'Filme não encontrado' };

  const existingMovie = await movieRepository.findOne({
    where: { name: movieData.name },
  });
  if (existingMovie)
    return { code: 400, message: 'Já existe um filme com esse nome' };
  movie.name = movieData.name;
  movie.description = movieData.description;
  movie.image = movieData.image;
  movie.actors = movieData.actors;
  movie.release_date = movieData.release_date;
  await movieRepository.save(movie);
  return movie;
};

// Deletar filme
export const deleteMovie = async (id: number): Promise<boolean> => {
  const repository = AppDataSource.getRepository(Movie);
  const result = await repository.delete(id);
  if (result.affected !== 0) {
    console.log('Foi deletado um filme com id:', id);
    return true;
  }
  return false;
};
