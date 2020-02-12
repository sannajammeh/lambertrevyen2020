'use strict';

import TicketService from '../services/ticketService';

export const GetTickets = TicketService => async (req, res) => {
  const tickets = await TicketService.fetchTickets();

  return res.send(...tickets);
};
