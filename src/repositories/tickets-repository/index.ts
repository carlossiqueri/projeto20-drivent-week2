import { prisma } from '../../config';

async function getTicketsTypes() {
  return await prisma.ticketType.findMany();
}

async function getTickets(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    include: {
      TicketType: true,
    },
    where: {
      enrollmentId,
    },
  });
}

async function getTicketsById(id: number) {
  return await prisma.ticket.findFirst({
    where: {
      id,
    },
  });
}

async function getTicketType(id: number) {
  return await prisma.ticketType.findFirst({
    where: {
      id,
    },
  });
}

async function updateTicket(id: number) {
  return await prisma.ticket.update({
    data: {
      status: 'PAID',
    },
    where: {
      id,
    },
  });
}

async function newTicket(enrollmentId: number, ticketTypeId: number) {
  return await prisma.ticket.create({
    data: {
      status: 'RESERVED',
      ticketTypeId,
      enrollmentId,
      updatedAt: new Date(Date.now()),
    },
  });
}

const ticketsRepository = {
  getTicketsTypes,
  getTickets,
  newTicket,
  getTicketsById,
  getTicketType,
  updateTicket,
};

export default ticketsRepository;
