const User = require('../db/models/User');
exports.postLogin = (req, res) => {
  // res.render('home', {
  //   // res.render('main.handlebars', {
  //   // res.render('index.html', {
  //   // pageTitle: 'Home Page by '
  //   // nameUpperCase: req.query.name.toUpperCase(),
  //   // name: req.query.name,
  //   // salesEnd: moment().endOf('day').fromNow()
  // });
  // req.isLoggedIn = true;
  // res.setHeader('Set-Cookie', 'loggedIn=true');
  // res.setHeader('Set-Cookie', 'loggedIn=true');
  // res.set('Set-Cookie', 'loggedIn=true');
  // res.header('Set-Cookie', 'loggedIn=true');
  // console.log(`session is ${JSON.stringify(req.session)}`);
  const userId = '5d5f6afb11a620047486274d';
  User.fetchUserDataDB(userId)
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch();
};

exports.postLogout = (req, res) => {
  console.log('logged out');
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
