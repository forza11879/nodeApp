/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import * as User from '../db/models/User/index.js';
import { User as ModalUser } from '../db/models/User/User.js';

export const getList = (req, res) => {
  // console.log(`User session: ${JSON.stringify(req.session)}`);
  // console.log(req.session.isLoggedIn);
  // console.log(`User session user ID: ${JSON.stringify(req.session.user._id)}`);
  // console.log(`User session: ${JSON.stringify(req.session.user)}`);
  // console.log(`User session: ${JSON.stringify(req.session)}`);
  // // console.log(req.session.user.name);
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

export const getWebApiList = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { symbol } = req.params;

    const query = { _id: userId };

    const element = await ModalUser.findOne(query)
      .where('data')
      .elemMatch({ symbol: symbol });

    // console.log('List: ', element);
    // console.log('List typeof: ', typeof element);
    // console.log('list Object: ', Object.prototype.toString.call(element));

    if (!element) await User.saveToDbList(symbol, userId);

    const urlArray = await User.generateUrlArrayList(userId);

    const result = await Promise.all(
      urlArray.map(async url => User.fetchWebApiList(url))
      // .catch(error => console.log('getWebApiList urlArray: ', error))
      // It does not work not sure why
      // Handling the error for each promise. If you need to execute all the promises even if some have failed, or maybe you can handle the failed promises later. https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/ - look into WES BOS as well
    );
    // // Inside an async function, return await is seldom useful
    // .then(item => {
    //   // console.log(`getWebApiList item: ${JSON.stringify(item)}`.green);
    //   res.send(item);
    // })
    // .catch(ex => console.log(`getWebApiList PromiseAll error: ${ex}`.red));

    res.send(result);
  } catch (ex) {
    // example of nice error handling - 500 Internal Server Error
    res.status(500).send(`getWebApiList error: ${ex}`.red);
  }
};
