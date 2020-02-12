import express from 'express';

const Api = express.Router();

Api.get('/tickets', (req, res) => {
  return res.send('ticket1, ticket2, ticket3');
});

export default Api;
