/**
 * @file Contains all function for JWT Token
 * @module models/utils/jwt
 */

const jwt = require('jsonwebtoken');
const { removeOccurrence, readFile } = require('./utils');

const secretKeyPath = './secret.key';

/**
 * This function calculate the update value of the token with the updatedAt value of the user
 * @param {Object} user
 * @returns {Number} update value of the token
 */
function calculateValueOfUpdate(user) {
  return (Math.floor(new Date(user.updatedAt.toString()) / 1000) * 8);
}

/**
 * Return a JWT Token according to the user given in arguments
 * @param {Object} payload Object contains data payload of the token
 * @param {Number} timeExpiration *Optional* = **3600** (1 hour)
 * number of seconds before the token will be expired
 * @returns {Object} JWT Token
 */
function createToken(payload, timeExpiration = 3600) {
  const secret = readFile(secretKeyPath);
  const dateOfTheDay = new Date();
  const dateOfExpiration = new Date();
  dateOfExpiration.setSeconds(dateOfExpiration.getSeconds() + timeExpiration);
  return {
    key: jwt.sign(
      payload,
      secret,
      {
        expiresIn: timeExpiration,
      },
    ),
    created: dateOfTheDay.toString(),
    expiration: dateOfExpiration.toString(),
  };
}

/**
 * Decode the token given in arguments
 * @param {Object} token Object user
 * @returns {Object} JWT Token are decoded.
 * This object will have **3 properties**, here is an example :
 ```js
  {
    header: { alg: 'HS256', typ: 'JWT' },
    payload: { id: 1332, update: 13245698736, iat: 1659537319, exp: 1659540919 },
    signature: 'Tmskyec8JxNX9FgP0xyyCJ0X3ptW2hVZy0vSWYQAnWg'
  }
 ```
 */
function decodeToken(token) {
  const tokenWithoutBearer = removeOccurrence(token, 'Bearer ');
  return jwt.decode(tokenWithoutBearer, { complete: true });
}

/**
 * Check if the token are available
 * @param {String} token
 * @throws {TokenExpiredError} Token is not valid
 * @returns {Object} Object given from the JWT Token
 */
function verifyToken(token) {
  const tokenWithoutBearer = removeOccurrence(token, 'Bearer ');
  const secret = readFile(secretKeyPath);
  return jwt.verify(tokenWithoutBearer, secret);
}

module.exports = {
  createToken, verifyToken, decodeToken, calculateValueOfUpdate,
};
