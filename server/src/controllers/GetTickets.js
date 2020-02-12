'use strict';

export const GetTickets = TicketService => async (req, res) => {
  try {
    const tickets = await TicketService.fetchTickets();
    return res.send(...tickets);
  } catch (error) {
    console.error(error.message);
    return res.sendStatus(500);
  }
};
