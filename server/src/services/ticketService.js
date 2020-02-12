'use strict';

class TicketService {
  constructor(firebaseAdmin) {
    this.firestore = firebaseAdmin;
  }

  async fetchTickets() {
    const ref = await this.firestore.col('tickets').get();

    const tickets = ref.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tickets;
  }
}

export default TicketService;
