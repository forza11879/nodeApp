const path = require('path');
// const fs = require('fs')
// const https = require('https')
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const Pusher = require('pusher');
const errorHandler = require('./middleware/error');

// pusher
const pusher = new Pusher({
  appId: process.env.INSERT_APP_ID,
  key: process.env.INSERT_APP_KEY,
  secret: process.env.INSERT_APP_SECRET,
  cluster: process.env.INSERT_APP_CLUSTER,
  encrypted: true,
});
// pusher
const channel = 'tasks';

const app = express();

// // pusher
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

// Dev logging middleware - ONLY in development
app.use(morgan('dev'));

// const User = require('../db/models/User');
// const User = require('./db/models/User');
const { User } = require('./db/models/User/User');

// const helmet = require('helmet')
// const compression = require('compression')
// var morgan = require('morgan')
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: 'sessions',
});
// const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
const authRoute = require('./routes/auth');
const transactionRoute = require('./routes/transaction');
const portfolioRoute = require('./routes/portfolio');
const stockRoute = require('./routes/stock');
const listRoute = require('./routes/list');
const mainRoute = require('./routes/main');
const errorRoute = require('./routes/error');
// const helpers = require('./helpers')

// require('./startup/db')();
const { connectDb } = require('./startup/db');

const port = process.env.PORT;

// app.use(express.cookieParser());

// Takes the raw requests(like forms) and turns them into usable properties on req.body
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json()); //utilizes the body-parser package
// Takes the raw requests(like forms) and turns them into usable properties on req.body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Used to parse JSON bodies

// // Handlebars Middleware - express-handlebars
// app.engine(
//   'hbs',
//   exphbs({
//     defaultLayout: 'main',
//     extname: 'hbs'
//   })
// );
// app.set('view engine', 'hbs');

app.set('view engine', 'ejs');
// views tells EJS where to look for the file.
// it sets by default if you do not mention it
app.set('views', 'views');

// serves up static files from the public folder.Anything in public folder will just served up as the file it is .Define path for Static folder Public
app.use(express.static(path.join(__dirname, 'public')));

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

// app.use((req, res, next) => {
//   res.locals.h = helpers;
//   res.locals.flashes = req.flash();
//   res.locals.user = req.user || null;
//   res.locals.currentPath = req.path;
//   next();
// });

// Mount Rout
app.use('/auth', authRoute);
app.use('/transaction', transactionRoute);
app.use('/portfolio', portfolioRoute);
app.use('/stock', stockRoute);
app.use('/list', listRoute);
app.use('/', mainRoute);
app.use('*', errorRoute);

app.use(errorHandler);

// need
// require('./models/Stock')
// HTTP request logger MORGAN middleware for node.js
// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, 'access.log'),
//   { flags: 'a' }
// )

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
// Connect to our Database and handle any bad connections

// await mongoose.connect(process.env.MONGODB_URL.REPLICASET.RS, {

mongoose.connect('mongodb://localhost:27017/myapp?replicaSet=rs0', {
  useNewUrlParser: true,
  useFindAndModify: false,
  // useUnifiedTopology: true,
  useCreateIndex: true,
});

// (node:571) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

db.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// connectDb().then(async () => {
//   app.listen(port, () => {
//     console.log(`Server is up on port ${port}`);
//   });
// });

// const db = connectDb();
// pusher
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });

  const taskCollection = db.collection('stocks');
  const changeStream = taskCollection.watch();
  changeStream.on('change', change => {
    console.log(
      `CHANGE : ${
        JSON.stringify(change.updateDescription.updatedFields.data[0]).green
      }`
    );

    // if (change.operationType === 'insert') {
    //   const task = change.fullDocument;
    //   pusher.trigger(channel, 'inserted', {
    //     id: task._id,
    //     task: task.task,
    //   });
    // } else if (change.operationType === 'delete') {
    //   pusher.trigger(channel, 'deleted', change.documentKey._id);
    // }
  });
});

// app.listen(port, () => {
//   console.log(`Server is up on port ${port}`);
// });

// if you need to implement HTTPS mode
// https.createServer({key: privateKey, cert: certificate}, app).listen(process.env.PORT || port, () => {
//   console.log(`Server is up on port ${port}`)
// })

// //view engine setup
// app.set('views', path.join(__dirname, 'views'))
// //this is the folder where we keep our pug files
// app.use('view engine', pug)

// // serves up static files from the public folder. anything in public/ will just served us as the file is
// app.use(express.static(path.join(__dirname, 'public')))

// /////////////////
