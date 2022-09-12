const { Article } = require('../db/models/article');

/**
 * @param {Number} articleId
 * @returns {Object}
 */
function getArticleById(articleId) {
  return Article.findByPk(articleId);
}

/**
 * @param {Number} articleId
 * @returns {Object}
 */
function getAllArticle() {
  return Article.findAll();
}

module.exports = { getArticleById, getAllArticle };
