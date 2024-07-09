import { AppDataSource } from 'src/database/data-source';
import { Movie } from 'src/database/entities/Movie';
import { Session } from 'src/database/entities/Session';

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
  movieId: number,
  sessionId: number,
  sessionData: Partial<Session>,
): Promise<Response> => {
  const session = await sessionRepository.findOne({
    where: { id: sessionId, movie: { id: movieId } },
  });
  if (!session) {
    throw new Error('Session not found');
  }

  sessionRepository.merge(session, sessionData);
  return await sessionRepository.save(session);
};

export const deleteSession = async (
  movieId: number,
  sessionId: number,
): Promise<Response> => {
  const session = await sessionRepository.findOne({
    where: { id: sessionId, movie: { id: movieId } },
  });
  if (!session) {
    throw new Error('Session not found');
  }

  await sessionRepository.remove(session);
};
