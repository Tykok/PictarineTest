/**
 * @file Contains all basics functions needed when develop in JavaScript
 * @module models/utils/utils
 */

const fs = require('fs');

/**
 * This function return a new price, who is the price of the reduction
 * according to the percentageReduction
 * @param {Number} price
 * @param {Number} percentageReduction
 * @returns Integer was the price with a reduction
 */
function reduction(price, percentageReduction) {
  return price * (1 - (percentageReduction / 100));
}

/**
   * This function return the value of the environment variable
   * @param {String} envName The name of the Environment variable
   * @return {String} Return the value of the environment variable
   */
function getEnvValue(envName) {
  return process.env[envName];
}

/**
 * Remove occurrence of the remove argument in original argument
 * @param {String} original
 * @param {String} remove
 * @returns {String} String without the string need to be removed
 */
function removeOccurrence(original, remove) {
  try {
    return original.replace(remove, '');
  } catch (err) {
    return original;
  }
}

/**
 * @param {String} filePath
 * @returns {Promise} Return the file content
 */
function readFile(filePath) {
  return fs.readFileSync(filePath, { encoding: 'utf-8' });
}

module.exports = {
  reduction, getEnvValue, readFile, removeOccurrence,
};
