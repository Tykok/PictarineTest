const NODE_ENV = process.env.NODE_ENV || 'DEV';

function logError(error, req, res, next) {
  if (NODE_ENV === 'DEBUG') {
    // eslint-disable-next-line no-console
    console.error(error.toString() || error.message);
  }
  next(error);
}

module.exports = logError;
