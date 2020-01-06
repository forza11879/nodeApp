/* eslint-disable import/first */
/* eslint-disable no-use-before-define */
import { createServer } from 'http';
import WebSocket from 'ws';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import storeFabric from 'connect-mongodb-session';
import cors from 'cors';

// routes
import authRoute from './routes/auth.js';
import transactionRoute from './routes/transaction.js';
import portfolioRoute from './routes/portfolio.js';
import stockRoute from './routes/stock.js';
import listRoute from './routes/list.js';
import mainRoute from './routes/main.js';
import errorRoute from './routes/error.js';

const __dirname = path.resolve();

// import errorHandler from './middleware/error';????
// const errorHandler = require('./middleware/error');

import { connectDb } from './startup/db.js';
import { User } from './db/models/User/User.js';

// //////
const app = express();
// //////
app.use(cors());
// Dev logging middleware - ONLY in development
app.use(morgan('dev'));
// MongoDBStore session
const MongoDBStore = storeFabric(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: 'sessions',
});

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
// app.use(errorHandler);

const port = process.env.PORT;

const server = createServer(app);
server.listen(port, function() {
  console.log(`Server is up on port ${port}`);
});

// once app is ready connect to DB
connectDb();

// websocket
const wss = new WebSocket.Server({ server });
// eslint-disable-next-line no-unused-vars
wss.on('connection', ws => {
  console.info('Total connected clients:', wss.clients.size);
  app.locals.clients = wss.clients;
});

// /////////////////
// app.on('ready', function() {
//   app.listen(port, function() {
//     console.log(`Server is up on port ${port}`);
//   });
// });

// const db = mongoose.connection;
// once connected to DB emit app ready
// db.once('open', function() {
//   // All OK - fire (emit) a ready event.
//   app.emit('ready');
// });

// db.on('error', err => {
//   console.error('connection error:', err);
// });
