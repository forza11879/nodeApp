import { clearHash } from '../db/models/common/cache.js';

// module.exports = async (req, res, next) => {
//   await next();
//   clearHash(req.user.id);
// };

export default async (req, res, next) => {
  await next();
  console.log('cleanHash MIDDELWARE req.user.id: ', req.user.id);
  clearHash(req.user.id);
};
