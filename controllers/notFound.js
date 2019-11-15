// eslint-disable-next-line no-unused-vars
const colors = require('colors');

exports.notFoundPage = (req, res) => {
  res.status(404).render('404');
};
