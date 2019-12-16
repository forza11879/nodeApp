/* eslint-disable no-use-before-define */
const { createServer } = require('http');
const WebSocket = require('ws');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const errorHandler = require('./middleware/error');
const { connectDb } = require('./startup/db');
const { User } = require('./db/models/User/User');
// const model = mongoose.models;
// //////
const app = express();
// //////
app.use(cors());
// Dev logging middleware - ONLY in development
app.use(morgan('dev'));
// MongoDBStore session
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: 'sessions',
});
// routes
const authRoute = require('./routes/auth');
const transactionRoute = require('./routes/transaction');
const portfolioRoute = require('./routes/portfolio');
const stockRoute = require('./routes/stock');
const listRoute = require('./routes/list');
const mainRoute = require('./routes/main');
const errorRoute = require('./routes/error');
// Takes the raw requests(like forms) and turns them into usable properties on req.body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json({ extended: false })); // Used to parse JSON bodies.
// app.use(express.json()); // Used to parse JSON bodies.

// //////
app.set('view engine', 'ejs');
// views tells EJS where to look for the file.
// it sets by default if you do not mention it
app.set('views', 'views');
// serves up static files from the public folder.Anything in public folder will just served up as the file it is .Define path for Static folder Public
app.use(express.static(path.join(__dirname, 'public')));
// Session
app.use(
  session({
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req, res, next) => {
  const { user } = req.session;
  // console.log('req.session: ', req.session);
  if (!user) {
    return next();
  }
  User.findById({ _id: user._id })
    .select('_id name cash equity')
    .then(userItem => {
      req.user = userItem;
      next();
    })
    .catch(err => console.log(err));
});

// Mount Rout
app.use('/auth', authRoute);
app.use('/transaction', transactionRoute);
app.use('/portfolio', portfolioRoute);
app.use('/stock', stockRoute);
app.use('/list', listRoute);
app.use('/', mainRoute);
// app.use('/', exampleRoute);
app.use('*', errorRoute);
app.use(errorHandler);

const port = process.env.PORT;

const server = createServer(app);

server.listen(port, function() {
  console.log(`Server is up on port ${port}`);
});

// once app is ready connect to DB
connectDb();

// websocket
const wss = new WebSocket.Server({ server });
wss.on('connection', ws => {
  console.info('Total connected clients:', wss.clients.size);
  app.locals.clients = wss.clients;
});
