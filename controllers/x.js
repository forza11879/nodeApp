const SocketServer = require('ws').Server;
let express = require('express');

let connectedUsers = [];

// init Express
let app = express();

// init Express Router
let router = express.Router();
let port = process.env.PORT || 80;

// REST route for GET /status
router.get('/status', function(req, res) {
  res.json({ status: 'App is running!' });
});

// connect path to router
app.use('/', router);

// add middleware for static content
app.use(express.static('static'));
let server = app.listen(port, function() {
  console.log(
    'node.js static, REST server and websockets listening on port: ' + port
  );
});

// if serving static app from another server/port, send CORS headers in response
// { headers: {
// "Access-Control-Allow-Origin": "*",
//    "Access-Control-Allow-Headers": "http://localhost:3000",
//    "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
// } }
const wss = new SocketServer({ server });

// init Websocket ws and handle incoming connect requests
wss.on('connection', function connection(ws) {
  console.log('connection ...');

  // on connect message
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    connectedUsers.push(message);
  });

  ws.send('something');
});
