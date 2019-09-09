const Db = require('../db/models/List');

exports.getList = (req, res) => {
  console.log(req.session);
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

    isAuthenticated: req.session.isLoggedIn
    // user: req.session.user
  });
};

exports.getWebApiList = async (req, res) => {
  try {
    const userId = req.session.user._id;
    // console.log(
    //   `getWebApiList user ID: ${JSON.stringify(req.session.user._id)}`
    // );
    const curValue = req.params.symbol;
    const apiKey = process.env.API_TOKEN_QUOTE;
    const urlCompact = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiKey}`;

    let urlArray = await Db.generateUrlArrayList({}, { _id: 0 });

    if (!urlArray.includes(urlCompact)) urlArray.push(urlCompact);

    await Promise.all(
      urlArray.map(async url => {
        const data = await Db.fetchWebApiList(url);
        await Db.saveToDbList(data, userId);
      })
    );

    const dataFromDB = await Db.fetchDataFromDbList({}, { _id: 0 });

    res.send(dataFromDB);
  } catch (ex) {
    // example of nice error handling - 500 Internal Server Error
    res.status(500).send(`getWebApiList: ${ex}`);
  }
};
