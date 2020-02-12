import express from 'express';
//Dependencies
import * as firebaseAdmin from 'firebase-admin';
//Controllers
import { GetTickets } from '../controllers/GetTickets';
//Services
import TicketService from '../services/ticketService';

const Api = express.Router();

const ticketService = new TicketService(firebaseAdmin);

Api.get('/tickets', GetTickets(ticketService));

export default Api;
