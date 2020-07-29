// import mongoose from 'mongoose';
import WebSocket from 'ws';
import { Stock } from '../db/models/Stock/Stock.js';

const broadcast = (clients, message) => {
  console.log('clients WS', clients);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

// VERIFY async/await
export const changeStreams = (app, server) => {
  try {
    // websocket
    const wss = new WebSocket.Server({ server });
    // eslint-disable-next-line no-unused-vars
    wss.on('connection', ws => {
      console.info('Total connected clients:', wss.clients.size);
      app.locals.clients = wss.clients; // The app.locals object has properties that are local variables within the application. Once set, the value of app.locals properties persist throughout the life of the application, in contrast with res.locals properties that are valid only for the lifetime of the request.
      console.log('app.locals.clients', app.locals.clients);
    });

    const pipeline = [
      {
        $match: {
          'ns.db': 'myapp',
          'ns.coll': 'stocks',
          // 'fullDocument.symbol': 'RY' || req.symbol,
        },
      },
    ];

    const options = { fullDocument: 'updateLookup' };
    const changeStream = Stock.watch(pipeline, options);

    changeStream.on('change', event => {
      const { operationType, fullDocument } = event;
      const symbolDb = event.fullDocument.symbol;
      console.log('symbolDb: ', symbolDb);

      broadcast(app.locals.clients, JSON.stringify(fullDocument));
    });

    //   // we need to handle the changeStream error separatley from try/catch to trap the errors
    changeStream.on('error', err => {
      console.log(err);
      changeStream.close();
      throw err;
    });
    // web push https://thecodebarbarian.com/sending-web-push-notifications-from-node-js.html
  } catch (error) {
    console.log('changeStreams error: ', error);
  }
};
