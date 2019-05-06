exports.postAuth = (req, res) => {
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
  req.session.isLoggedIn = true;
  res.redirect('/');
};
