const path = require('path');
// const fs = require('fs')
// const https = require('https')
const express = require('express');
const app = express();

// const helmet = require('helmet')
// const compression = require('compression')
// var morgan = require('morgan')

const bodyParser = require('body-parser');
// const hbs = require('hbs');
const exphbs = require('express-handlebars');
const transactionRoute = require('./routes/transaction');
const portfolioRoute = require('./routes/portfolio');
const stockRoute = require('./routes/stock');
const listRoute = require('./routes/list');
const main = require('./routes/main');
const routesError = require('./routes/error');
// const helpers = require('./helpers')
require('./startup/db')();
const port = process.env.PORT;

// Takes the raw requests(like forms) and turns them into usable properties on req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // view engine setup
// hbs.registerPartials(__dirname + '/views/partials')
// //this is the folder(by default views folder) where we keep our hbs files
// app.set('view engine', 'hbs');

// Handlebars Middleware - express-handlebars
app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
  })
);
app.set('view engine', 'hbs');

//serves up static files from the public folder.Anything in public folder will just served up as the file it is .Define path for Static folder Public
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   res.locals.h = helpers;
//   res.locals.flashes = req.flash();
//   res.locals.user = req.user || null;
//   res.locals.currentPath = req.path;
//   next();
// });

app.use('/transaction', transactionRoute);
app.use('/portfolio', portfolioRoute);
app.use('/stock', stockRoute);
app.use('/list', listRoute);
app.use('/', main);
app.use('/', routesError);

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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
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
