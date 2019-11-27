/* eslint-disable no-use-before-define */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
// const Pusher = require('pusher');
const errorHandler = require('./middleware/error');
// const { initDbConnection } = require('./startup/dbm');
// const { getDb, initDb } = require('./startup/dbSS');

const { User } = require('./db/models/User/User');

// //////
const app = express();
// pusher
// const pusher = new Pusher({
//   appId: process.env.INSERT_APP_ID,
//   key: process.env.INSERT_APP_KEY,
//   secret: process.env.INSERT_APP_SECRET,
//   cluster: process.env.INSERT_APP_CLUSTER,
//   useTLS: true,
// });
// const channel = 'myChannel';
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
app.use(express.json()); // Used to parse JSON bodies.
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
  // console.log(user);
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
// //////
const router = express.Router();
router.use(
  '/stock',
  function(req, res, next) {
    console.log(`Request URL App.js: ${req.originalUrl}`.red);
    console.log(`Request Params App.js: ${req.params}`.red);

    next();
  },
  function(req, res, next) {
    console.log(`Request Type App.js: ${req.method}`.red);
    next();
  }
);

router.use(
  '/stock',
  function(req, res, next) {
    console.log(`Request URL App.js: ${req.originalUrl}`.red);
    console.log(`Request Params App.js: ${req.params}`.red);

    next();
  },
  function(req, res, next) {
    console.log(`Request Type App.js: ${req.method}`.red);
    next();
  }
);

const port = process.env.PORT;

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
// Connect to our Database and handle any bad connections

// await mongoose.connect(process.env.MONGODB_URL.REPLICASET.RS, {

mongoose.connect('mongodb://localhost:27017/myapp?replicaSet=rs0', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

db.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });

  // const taskCollection = db.collection('stocks');
  // // const pipeline = [
  // //   {
  // //     $match: { symbol: req.params.symbol },
  // //   },
  // // ];
  // const changeStream = taskCollection.watch(
  //   { fullDocument: 'updateLookup' }
  //   // pipeline
  // );
  // changeStream.on('change', change => {
  //   const { operationType, fullDocument } = change;

  //   // console.log(`CHANGE : ${JSON.stringify(change).green}`);

  //   // const logData = fullDocument.data.map(item => ({
  //   //   date: parseFloat(item.date),
  //   //   open: parseFloat(item.open),
  //   //   high: parseFloat(item.high),
  //   //   low: parseFloat(item.low),
  //   //   close: parseFloat(item.close),
  //   //   volume: parseInt(item.volume),
  //   // }));

  //   // pusher.trigger(channel, 'AnyEvent', {
  //   //   // eslint-disable-next-line object-shorthand
  //   //   chartData: logData,
  //   // });
  // });
});

// app.use((req, res, next) => {
//   req.resultMongo = result;
//   next();
// });

// initDbConnection().then(() => {
//   app.listen(port, () => {
//     console.log(`Server is up on port ${port}`);
//   });
// const db = mongoose.connection;
// db.once('open', function() {
//   console.log(`client MongoDB Connection ok!`.green);

//   const taskCollection = db.collection('stocks');
//   const changeStream = taskCollection.watch({ fullDocument: 'updateLookup' });

//   changeStream.on('change', change => {
//     const { operationType, fullDocument } = change;

//     console.log(`CHANGE : ${JSON.stringify(change).green}`);

//     // const logData = fullDocument.data.map(item => ({
//     //   date: parseFloat(item.date),
//     //   open: parseFloat(item.open),
//     //   high: parseFloat(item.high),
//     //   low: parseFloat(item.low),
//     //   close: parseFloat(item.close),
//     //   volume: parseInt(item.volume),
//     // }));

//     // console.log(`CHANGE : ${JSON.stringify(change).green}`);

//     // pusher.trigger(channel, 'AnyEvent', {
//     //   // eslint-disable-next-line object-shorthand
//     //   chartData: logData,
//     //   symbol: fullDocument.symbol,
//     // });
//   });
// });
// });

// initDb(function(err) {
//   app.listen(port, function(err) {
//     if (err) {
//       throw err; //
//     }
//     console.log(`API Up and running on port: ${port}`);
//   });
// });

// function exampleRoute(req, res) {
//   const db = getDb();
//   const results = db.once('open', function() {
//     console.log(`client MongoDB Connection ok!`.red);

//     const taskCollection = db.collection('stocks');
//     const changeStream = taskCollection.watch({
//       fullDocument: 'updateLookup',
//     });

//     return changeStream.on('change', change => {
//       // const { operationType, fullDocument } = change;

//       // const logData = fullDocument.data.map(item => ({
//       //   date: parseFloat(item.date),
//       //   open: parseFloat(item.open),
//       //   high: parseFloat(item.high),
//       //   low: parseFloat(item.low),
//       //   close: parseFloat(item.close),
//       //   volume: parseInt(item.volume),
//       // }));

//       console.log(`CHANGE : ${JSON.stringify(change).green}`);
//       return change;

//       // pusher.trigger(channel, 'AnyEvent', {
//       //   // eslint-disable-next-line object-shorthand
//       //   chartData: logData,
//       //   symbol: fullDocument.symbol,
//       // });
//     });
//   });
//   res.json(results);
// }
