export default (req, res, next) => {
  if (!req.session.isLoggedIn) {
    console.log('User NOT Authenticated');
    return res.redirect('/api/v1');
  }
  next();
};
