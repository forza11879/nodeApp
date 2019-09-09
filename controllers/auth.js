const bcrypt = require('bcryptjs');

const UserModal = require('../db/models/User');
const { User } = require('../db/models/User/User');

exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.redirect('/');
    }
    const doMatch = await bcrypt.compare(password, user.password);

    if (doMatch) {
      console.log('password doMatch');
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save(err => {
        console.log(err);
        res.redirect('/list'); // it is better to save() before re-directing cause redirect() might hapend before the new session was created in DB
      });
    }
    console.log('password !doMatch');
    res.redirect('/');
  } catch (ex) {
    console.log(`postLogin error: ${ex}`);
    res.redirect('/');
  }
};

exports.postLogout = (req, res) => {
  console.log('logged out');
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.postSignup = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log(email, name, password);
    // const userDoc = await UserModal.findUserEmailDB(email);
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
      console.log('User already in DB');
      return res.redirect('/');
    }
    await UserModal.creatUser(name, email, password);
    res.redirect('/');
  } catch (ex) {
    console.log(`postSignup error: ${ex}`);
  }
};

// exports.postLogin = (req, res) => {
//   // res.render('home', {
//   //   // res.render('main.handlebars', {
//   //   // res.render('index.html', {
//   //   // pageTitle: 'Home Page by '
//   //   // nameUpperCase: req.query.name.toUpperCase(),
//   //   // name: req.query.name,
//   //   // salesEnd: moment().endOf('day').fromNow()
//   // });
//   // req.isLoggedIn = true;
//   // res.setHeader('Set-Cookie', 'loggedIn=true');
//   // res.setHeader('Set-Cookie', 'loggedIn=true');
//   // res.set('Set-Cookie', 'loggedIn=true');
//   // res.header('Set-Cookie', 'loggedIn=true');
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log(`postLogin email: ${email}`);
//   console.log(`postLogin password: ${password}`);

//   // console.log(`session is ${JSON.stringify(req.session)}`);
//   // const userId = '5d5f6afb11a620047486274d';
//   // const userId = req.user.id;
//   // UserModal.fetchUserDataDB(userId)
//   User.findOne({ email: email })
//     .then(user => {
//       if (!user) {
//         return res.redirect('/');
//       }
//       bcrypt
//         .compare(password, user.password)
//         .then(doMatch => {
//           if (doMatch) {
//             console.log('password doMatch');
//             req.session.isLoggedIn = true;
//             req.session.user = user;
//             return req.session.save(err => {
//               console.log(err);
//               res.redirect('/'); // it is better to save() before re-directing cause redirect() might hapend before the new session was created in DB
//               // res.redirect('/');
//             });
//           }
//           console.log('password !doMatch');
//           res.redirect('/');
//         })
//         .catch(err => {
//           console.log(err);
//           res.redirect('/');
//         });
//     })
//     .catch(err => console.log(err));
// };
