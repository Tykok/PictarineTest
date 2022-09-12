async function jwtCheck(req, res, next) {
  try {
    const { authorization } = req.headers;

    // Get the user
    const result = true;

    // TODO : Chek if user exist and next if is true
    if (result) {
      next();
    } else {
      res.status(403).send({ message: 'You\'re not authorized' });
    }
  } catch (err) {
    res.status(500).send('An error occurred while processing your request');
  }
}

module.exports = jwtCheck;
