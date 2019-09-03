// const moment = require('moment')
exports.getMain = (req, res) => {
  console.log(req.session);
  // console.log(req.session.isLoggedIn);
  console.log(`User session: ${JSON.stringify(req.session.user)}`);
  console.log(`User session: ${JSON.stringify(req.session)}`);
  // console.log(req.session.user.name);
  // console.log(req.session.user.cash);
  // console.log(req.session.user._id);
  // console.log(req.session.user._id);
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
    // user: req.session.user
  });
};
