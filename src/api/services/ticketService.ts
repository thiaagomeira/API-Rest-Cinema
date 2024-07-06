import { Ticket } from '../../database/entities/Ticket';
import { Session } from '../../database/entities/Session';
import { AppDataSource } from 'src/database/data-source';

const ticketRepository = AppDataSource.getRepository(Ticket);
const sessionRepository = AppDataSource.getRepository(Session);
interface ErrorResponse {
  code: number;
  message: string;
}

export const getTickets = async (): Promise<Ticket[]> => {
  const ticket = await AppDataSource.manager.find(Ticket);
  return ticket;
};

export const getTicketById = async (id: number): Promise<Ticket | null> => {
  return await ticketRepository.findOne({ where: { id } });
};

export const createTicket = async (
  sessionId: number,
  ticketData: Ticket,
): Promise<Ticket | ErrorResponse> => {
  const session = await sessionRepository.findOne({ where: { id: sessionId } });
  if (!session) {
    const error = { code: 400, message: 'Sessão não encontrada' };
    return error;
  }

  const existingTicket = await ticketRepository.findOne({
    where: { chair: ticketData.chair, session: { id: sessionId } },
  });
  if (existingTicket) {
    return {
      code: 400,
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

export const updateTicket = async (id: number, ticketData: Partial<Ticket>): Promise<Ticket | null> => {
  const ticket = await ticketRepository.findOne({ where: { id } });
  if (!ticket) {
    throw new Error('Ingresso não encontrado!');
  }

  const existingTicket = await ticketRepository.findOne({ where: { chair: ticketData.chair, session: { id: ticket.session.id } } });
  if (existingTicket && existingTicket.id !== id) {
    throw new Error('A cadeira já está reservada para esta sessão!');
  }

  ticketRepository.merge(ticket, ticketData);
  return await ticketRepository.save(ticket);
};

export const deleteTicket = async (id: number): Promise<boolean> => {
  const result = await ticketRepository.delete(id);
  return result.affected !== 0;
};
