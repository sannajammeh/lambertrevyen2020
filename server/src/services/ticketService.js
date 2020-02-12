'use strict';

import { PLAY_IS_BOOKED, PLAY_NOT_ENOUGH_SEATS, BAD_REQUEST } from '../error.types';

class TicketService {
  constructor(firestore, serverTime) {
    this.firestore = firestore;
    this.serverTime = serverTime;
  }

  async fetchTickets() {
    const ref = await this.firestore.collection('tickets').get();

    const tickets = ref.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tickets;
  }

  async createTicket({ name, email, phone, playId, date, tickets }) {
    const max = 180; // Max seat count

    const play = await this.firestore
      .collection('performances')
      .doc(playId)
      .get();

    if (!play.exists) throw new Error(BAD_REQUEST);

    const playData = play.data();
    const seatCount = playData.count;

    // Calc request seat count
    const requestedSeats = this.getTotalSeats(tickets);

    // Calc new seat count
    const newSeatCount = seatCount + requestedSeats;

    //Check for errors
    if (isNaN(requestedSeats)) throw new Error(BAD_REQUEST);
    if (seatCount >= max) throw new Error(PLAY_IS_BOOKED);
    if (newSeatCount >= max) throw new Error(PLAY_NOT_ENOUGH_SEATS);

    const ref = await this.firestore.collection('tickets').add({
      name,
      email,
      phone,
      playId,
      date,
      status: 'unpaid',
      tickets,
      createdAt: this.serverTime,
    });

    const updatedPlay = await play.ref.set({ count: newSeatCount }, { merge: true });

    return ref;
  }
  getTotalSeats(tickets = {}) {
    let count = 0;
    for (const value of Object.values(tickets)) {
      count += value ? Number(value) : 0;
    }
    return count;
  }
}

export default TicketService;
