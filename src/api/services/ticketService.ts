import { getRepository, Repository } from 'typeorm';
import { Ticket } from '../../database/entities/Ticket';
import { Session } from '../../database/entities/Session';
import { AppDataSource } from 'src/database/data-source';

let ticketRepository: Repository<Ticket>;
let sessionRepository: Repository<Session>;


export const getTickets = async (): Promise<Ticket[]> => {
  const ticket = await AppDataSource.manager.find(Ticket)
  return ticket;
};

export const getTicketById = async (id: number): Promise<Ticket | null> => {
  return await ticketRepository.findOne({ where: { id } });
};

export const createTicket = async (sessionId: number, ticketData: Partial<Ticket>): Promise<Ticket> => {
  const session = await sessionRepository.findOne({ where: { id: sessionId } });
  if (!session) {
    throw new Error('Sessão não encontrada');
  }

  const existingTicket = await ticketRepository.findOne({ where: { chair: ticketData.chair, session: { id: sessionId } } });
  if (existingTicket) {
    throw new Error('A cadeira já está reservada para esta sessão!');
  }

  const newTicket = ticketRepository.create({ ...ticketData, session });
  return await ticketRepository.save(newTicket);
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
