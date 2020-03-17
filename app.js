/* eslint-disable object-shorthand */
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
// import messagesExpress from 'express-messages';
// import flash from 'connect-flash';
// import toastr from 'express-toastr';
import cookieParser from 'cookie-parser';
// import flash from 'express-flash-2';
// import expressValidator from 'express-validator';
import { Stock as StockModel } from './db/models/Stock/Stock.js';

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

import { changeStreams } from './startup/changeStreams.js';
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

// cookieParser
app.use(cookieParser(process.env.MY_SECRET));

// Initialize the Session
app.use(
  session({
    secret: process.env.MY_SECRET,
    resave: false, // does not save session on each request
    saveUninitialized: false,
    store: store,
  })
);

// flash message middleware
app.use((req, res, next) => {
  res.locals.message = req.session.message; // res.locals An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request / response cycle (if any). Otherwise, this property is identical to app.locals.This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on.
  delete req.session.message;
  next();
});

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
  console.log(`Server is up on portt ${port}`);
});

// once app is ready connect to DB
connectDb();
// MongoDB change Streams
changeStreams(app, server);
