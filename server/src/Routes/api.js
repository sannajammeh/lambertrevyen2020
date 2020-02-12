'use strict';

import express from 'express';
//Dependencies
import firebaseAdmin from 'firebase-admin';
import firebaseKey from '../../firebaseKey.json';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseKey),
  databaseURL: 'https://lambertrevyen2020.firebaseio.com',
});

const firestore = firebaseAdmin.firestore();
const serverTime = firebaseAdmin.firestore.FieldValue.serverTimestamp();
//Controllers
import { GetTickets, CreateTicket } from '../controllers/Tickets';
//Services
import TicketService from '../services/ticketService';
import { HandleTicketErrors } from '../controllers/Errors';

const ticketService = new TicketService(firestore, serverTime);

const Api = express.Router();

Api.get('/tickets', GetTickets(ticketService), HandleTicketErrors);
Api.post('/tickets', CreateTicket(ticketService), HandleTicketErrors);

export default Api;
