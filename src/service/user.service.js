const { User } = require('../db/models/user');

/**
 * @param {Number} UserId
 * @returns {Object}
 */
async function getUserByLoginAndPassword(login, password) {
  return User.findOne({
    where: {
      login: User.salt(login),
      password: User.salt(password),
    },
  });
}

module.exports = {
  getUserByLoginAndPassword,
};
