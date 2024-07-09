import { Ticket } from '../../database/entities/Ticket';
import { Session } from '../../database/entities/Session';
import { AppDataSource } from '../../database/data-source';

const ticketRepository = AppDataSource.getRepository(Ticket);
const sessionRepository = AppDataSource.getRepository(Session);
interface ErrorResponse {
  code: number;
  status: string;
  message: string;
}

export const createTicket = async (
  sessionId: number,
  ticketData: Ticket,
): Promise<Ticket | ErrorResponse> => {
  const session = await sessionRepository.findOne({ where: { id: sessionId } });
  if (!session) {
    const error = {
      code: 404,
      status: 'Not Found',
      message: 'Sessão não encontrada',
    };
    return error;
  }

  const existingTicket = await ticketRepository.findOne({
    where: { chair: ticketData.chair, session: { id: sessionId } },
  });
  if (existingTicket) {
    return {
      code: 400,
      status: 'Bad Request',
      message: 'O assento já foi reservado.',
    };
  }
  const ticket = new Ticket();
  ticket.chair = ticketData.chair;
  ticket.value = ticketData.value;
  ticket.session = session;

  const newTicket = await ticketRepository.save(ticket);

  return newTicket;
};

export const updateTicket = async (
  id: number,
  sessionId: number,
  ticketData: Ticket,
): Promise<Ticket | ErrorResponse> => {
  const ticket = await ticketRepository.findOne({ where: { id } });
  if (!ticket) {
    return {
      code: 404,
      status: 'Not Found',
      message: 'Ingresso não encontrado!',
    };
  }
  const session = await sessionRepository.findOne({ where: { id: sessionId } });
  if (!session) {
    return {
      code: 404,
      status: 'Not Found',
      message: `Sessão de id ${sessionId} não encontrada!`,
    };
  }
  const existingTicket = await ticketRepository.findOne({
    where: { chair: ticketData.chair, session: { id: sessionId } },
  });
  if (existingTicket) {
    return {
      code: 400,
      status: 'Bad Request',
      message: 'A cadeira já está reservada para esta sessão!',
    };
  }

  ticket.chair = ticketData.chair;
  ticket.value = ticketData.value;
  ticket.session = session;
  const result = await ticketRepository.save(ticket);

  return result;
};

export const deleteTicket = async (id: number): Promise<boolean> => {
  const result = await ticketRepository.delete(id);
  return result.affected !== 0;
};
