const path = require('path');
// const fs = require('fs')
// const https = require('https')
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();

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
  collection: 'sessions'
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
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

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

//serves up static files from the public folder.Anything in public folder will just served up as the file it is .Define path for Static folder Public
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
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

//Mount Rout
app.use('/auth', authRoute);
app.use('/transaction', transactionRoute);
app.use('/portfolio', portfolioRoute);
app.use('/stock', stockRoute);
app.use('/list', listRoute);
app.use('/', mainRoute);
app.use('*', errorRoute);

app.use(errorHandler);

// hbs.registerHelper('getCurrentYear', () => {
//   return new Date().getFullYear();
// })

// hbs.registerHelper('getTimeFromNow', () => {
//   return moment().endOf('day').fromNow()
// })

//need
// require('./models/Stock')
// HTTP request logger MORGAN middleware for node.js
// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, 'access.log'),
//   { flags: 'a' }
// )

// Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help!
// app.use(helmet())
// The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.
// app.use(compression())
// HTTP request logger middleware for node.js
// app.use(morgan('combined', {stream: accessLogStream}))

connectDb().then(async () => {
  app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
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

///////////////////
