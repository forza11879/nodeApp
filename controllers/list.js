/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import * as List from '../db/models/List/index.js';
import { List as ModalList } from '../db/models/List/List.js';

export const getList = (req, res) => {
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

export const getWebApiList = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { symbol } = req.params;

    const query = { userId: userId };

    const element = await ModalList.findOne(query)
      .where('data')
      .elemMatch({ symbol: symbol });

    // console.log('List: ', position);
    // console.log('List typeof: ', typeof position);
    // console.log('list Object: ', Object.prototype.toString.call(position));

    if (element === null) await List.saveToDbList(symbol, userId);

    const urlArray = await List.generateUrlArrayList(userId);

    Promise.all(
      urlArray.map(async url => List.fetchWebApiList(url))
      // .catch(error => console.log('getWebApiList urlArray: ', error))
      // It does not work not sure why
      // Handling the error for each promise. If you need to execute all the promises even if some have failed, or maybe you can handle the failed promises later. https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/
    )
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
