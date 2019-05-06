// const moment = require('moment')
exports.getMain = (req, res) => {
  console.log(req.session.isLoggedIn);
  console.log(req.session.user);
  // console.log(req.get('Cookie'));
  // const isLoggedIn = req.get('Cookie');
  res.render('home', {
    // res.render('main.handlebars', {
    // res.render('index.html', {
    // pageTitle: 'Home Page by '
    // nameUpperCase: req.query.name.toUpperCase(),
    // name: req.query.name,
    // salesEnd: moment().endOf('day').fromNow()
    isAuthenticated: req.session.isLoggedIn
  });
};
