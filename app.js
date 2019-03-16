const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
// const hbs = require('hbs');
const exphbs  = require('express-handlebars')
const routesWebApi = require('./routes/webApiRoutes')
const routes = require('./routes/routes')
const routesError = require('./routes/error')
// const helpers = require('./helpers')
// const moment = require('moment')
require('./startup/db')()
const port = 3000

// Takes the raw requests(like forms) and turns them into usable properties on req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// // view engine setup
// hbs.registerPartials(__dirname + '/views/partials')
// //this is the folder(by default views folder) where we keep our hbs files
// app.set('view engine', 'hbs');

// Handlebars Middleware
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs' 
}))
app.set('view engine', 'hbs')

//serves up static files from the public folder.Anything in public folder will just served up as the file it is

// app.use(express.static(__dirname + '/public'));
// Static folder
app.use(express.static(path.join(__dirname, 'public')));



// app.use((req, res, next) => {
//   res.locals.h = helpers;
//   res.locals.flashes = req.flash();
//   res.locals.user = req.user || null;
//   res.locals.currentPath = req.path;
//   next();
// });

// const stamp = moment().endOf('day').fromNow()

// console.log(stamp)
app.use('/', routesWebApi)
app.use('/', routes)
app.use('/', routesError)

// hbs.registerHelper('getCurrentYear', () => {
//   return new Date().getFullYear();
// })

// hbs.registerHelper('getTimeFromNow', () => {
//   return moment().endOf('day').fromNow()
// })

//need
// require('./models/Stock')

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})



// //view engine setup
// app.set('views', path.join(__dirname, 'views'))
// //this is the folder where we keep our pug files
// app.use('view engine', pug)

// // serves up static files from the public folder. anything in public/ will just served us as the file is 
// app.use(express.static(path.join(__dirname, 'public')))

///////////////////



