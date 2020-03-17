import { clearHash } from '../db/models/common/cache.js';

// module.exports = async (req, res, next) => {
//   await next();
//   clearHash(req.user.id);
// };

export default async (req, res, next) => {
  await next();
  console.log('cleanHash MIDDELWARE req.user.id: ', req.user.id);
  console.log(
    'cleanHash MIDDELWARE req.session.user._id: ',
    req.session.user._id
  );
  // clearHash(req.user.id);
  clearHash(req.session.user._id);
};
