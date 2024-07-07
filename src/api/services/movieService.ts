import { Movie } from 'src/database/entities/Movie';
import { AppDataSource } from 'src/database/data-source';

// Obter todos os filmes
export const getMovies = async (): Promise<Movie[]> => {
  const movies = await AppDataSource.manager.find(Movie);
  return movies;
};

// Obter um filme pelo ID
export const getMovieById = async (id: number): Promise<Movie | undefined> => {
  const repository = AppDataSource.getRepository(Movie);
  const movie = await repository.findOneBy({ id });
  return movie ? movie : undefined;
};

// Criar novo filme
export const createMovie = async (body: Omit<Movie, 'id'>): Promise<Movie> => {
  const repository = AppDataSource.getRepository(Movie);
  const movie = repository.create(body);
  await repository.save(movie);
  console.log('Foi criado um filme:', movie);
  return movie;
};

// Atualizar filme existente
export const updateMovie = async (
  id: number,
  body: Omit<Movie, 'id'>,
): Promise<Movie | undefined> => {
  const repository = AppDataSource.getRepository(Movie);
  const movie = await repository.findOneBy({ id });
  if (movie) {
    repository.merge(movie, body);
    await repository.save(movie);
    console.log('Foi atualizado um filme:', movie);
    return movie;
  }
  return undefined;
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
