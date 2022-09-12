// eslint-disable-next-line no-unused-vars
function apiErrorHandler(error, req, res, next) {
  let dataError;
  let status;

  // Manage error message with the throwing error
  switch (error.constructor.name) {
    // All errors can't be captured in the switch statement
    default:
      dataError = { error: 'An error appears, and we can\'t explain where is coming from' };
      status = 500;
  }

  // Send the final response
  res.status(status).send(dataError);
}

module.exports = apiErrorHandler;
