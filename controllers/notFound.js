// eslint-disable-next-line no-unused-vars
import colors from 'colors';

export const notFoundPage = (req, res) => {
  res.status(404).render('404');
};
