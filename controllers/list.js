// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const Db = require('../db/models/List');

exports.getList = (req, res) => {
  console.log(`User session: ${JSON.stringify(req.session)}`);
  // console.log(req.session.isLoggedIn);
  console.log(`User session user ID: ${JSON.stringify(req.session.user._id)}`);
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

    isAuthenticated: req.session.isLoggedIn,
    // user: req.session.user
  });
};

exports.getWebApiList = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { symbol } = req.params;

    await Db.saveToDbList(symbol, userId);

    const urlArray = await Db.generateUrlArrayList(userId);
    // console.log(`urlArray list: ${urlArray}`.green);

    // Promise.all(urlArray.map(async url => await Db.fetchWebApiList(url)))
    Promise.all(urlArray.map(async url => Db.fetchWebApiList(url)))
      // Inside an async function, return await is seldom useful
      .then(item => {
        // console.log(`getWebApiList item: ${JSON.stringify(item)}`.green);
        res.send(item);
      })
      .catch(ex => console.log(`getWebApiList PromiseAll error: ${ex}`.red));
  } catch (ex) {
    // example of nice error handling - 500 Internal Server Error
    res.status(500).send(`getWebApiList error: ${ex}`.red);
  }
};
