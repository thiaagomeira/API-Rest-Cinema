import { AppDataSource } from '../../database/data-source';
import { Movie } from '../../database/entities/Movie';
import { Session } from '../../database/entities/Session';

const movieRepository = AppDataSource.getRepository(Movie);
const sessionRepository = AppDataSource.getRepository(Session);

interface Response {
  code: number;
  status: string;
  message: string;
  data?: Session;
}

export const createSession = async (
  movieId: number,
  sessionData: Session,
): Promise<Response> => {
  const findMovie = await movieRepository.findOne({
    where: { id: movieId },
  });

  if (!findMovie)
    return {
      code: 404,
      status: 'Not Found',
      message: `Não foi encontrado filme de id ${movieId}`,
    };

  const existingSession = await sessionRepository.findOne({
    where: {
      room: sessionData.room,
      day: sessionData.day,
      time: sessionData.time,
      movie: findMovie,
    },
  });
  if (existingSession) {
    return {
      code: 400,
      status: 'Bad Request',
      message: 'Já existe uma sessão cadastrada nessa sala no mesmo horário',
    };
  }

  const session = new Session();
  session.capacity = sessionData.capacity;
  session.day = sessionData.day;
  session.movie = findMovie;
  session.room = sessionData.room;
  session.time = sessionData.time;

  const result = await sessionRepository.save(session);

  return { code: 201, status: 'Created', message: '', data: result };
};

export const updateSession = async (
  sessionId: number,
  movieId: number,
  sessionData: Session,
): Promise<Response> => {
  const session = await sessionRepository.findOne({
    where: { id: sessionId },
  });
  if (!session) {
    return {
      code: 404,
      status: 'Not Found',
      message: `Não foi encontrado sessão de id ${sessionId}`,
    };
  }

  const movie = await movieRepository.findOne({ where: { id: movieId } });
  if (!movie) {
    return {
      code: 404,
      status: 'Not Found',
      message: `Não foi encontrado filme de id ${movieId}`,
    };
  }

  const existingSession = await sessionRepository.findOne({
    where: {
      room: sessionData.room,
      day: sessionData.day,
      time: sessionData.time,
    },
  });
  if (existingSession) {
    return {
      code: 400,
      status: 'Bad Request',
      message: 'Já existe uma sessão cadastrada nessa sala no mesmo horário',
    };
  }

  session.capacity = sessionData.capacity;
  session.day = sessionData.day;
  session.movie = movie;
  session.room = sessionData.room;
  session.time = sessionData.time;

  const result = await sessionRepository.save(session);
  return {
    code: 200,
    status: '',
    message: '',
    data: result,
  };
};

export const deleteSession = async (
  sessionId: number,
  movieId: number,
): Promise<Response> => {
  const session = await sessionRepository.findOne({
    where: { id: sessionId },
  });
  const sessionMovie = await sessionRepository.findOne({
    where: { id: sessionId, movie: { id: movieId } },
  });
  if (!session) {
    return {
      code: 404,
      status: 'Not Found',
      message: `Não foi encontrado sessão de id ${sessionId}`,
    };
  }

  if (!sessionMovie) {
    return {
      code: 404,
      status: 'Not Found',
      message: `Sessão de id ${sessionId} não está relacionada ao filme de id ${movieId}`,
    };
  }

  await sessionRepository.remove(session);
  return {
    code: 204,
    status: 'Deleted',
    message: '',
  };
};
