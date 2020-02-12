'use strict';
import express from 'express';
import Api from './Routes/api';

export function server(dependencies) {
  const app = express();
  app.use('/api', Api);

  app.listen(5000, port => {
    console.log(`Listening on port 5000`);
  });

  return app;
}
