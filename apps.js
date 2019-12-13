const { createServer } = require('http');
const express = require('express');
const WebSocket = require('ws');

const app = express();
app.use(express.json({ extended: false }));
app.use('/api/pets', require('./routes/api/pets'));

const port = process.env.PORT || 5000;
const server = createServer(app);
server.listen(port, () => console.info(`Server running on port: ${port}`));

const webSocketServer = new WebSocket.Server({ server });
webSocketServer.on('connection', (webSocket) => {
  console.info('Total connected clients:', webSocketServer.clients.size);

  app.locals.clients = webSocketServer.clients;
});

/////////

const router = require("express").Router();
const WebSocket = require("ws");

const broadcast = (clients, message) => {

    clients.forEach((client) => {

        if (client.readyState === WebSocket.OPEN) {

            client.send(message);
        }
    });
};

router.get("/dog", (req, res) => {

    broadcast(req.app.locals.clients, "Bark!");

    return res.sendStatus(200);
});

router.get("/cat", (req, res) => {

    broadcast(req.app.locals.clients, "Meow!");

    return res.sendStatus(200);
});

module.exports = router;
