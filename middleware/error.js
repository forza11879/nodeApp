const colors = require('colors');
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(`Error response error name: ${err.name}`.underline);
  console.log(`Error response error name: ${JSON.stringify(err)}`);
  console.log(`Error response error name: ${JSON.stringify(error)}`);
  console.log(`Error response error name: ${error.message}`.red);
  console.log(`Error response error name: ${err.message}`.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  // res.redirect('/', {
  //   success: false,
  //   error: error.message || 'Server Error'
  // });
  res.render('landing', {
    success: false,
    statusCode: error.statusCode || 500,
    error: error.message || 'Server Error',
    isAuthenticated: req.session.isLoggedIn
  });
  // res.status(error.statusCode || 500).json({
  //   success: false,
  //   error: error.message || 'Server Error'
  // });
};

module.exports = errorHandler;
