const fs = require('fs');
const { Article } = require('../db/models/article');

/**
 * @param {Number} articleId
 * @returns {Object}
 */
async function getArticleById(articleId) {
  return Article.findByPk(articleId);
}

/**
 * @returns {Array}
 */
async function getAllArticle() {
  return Article.findAll();
}

async function createArticle(article, picture) {
  const imageData = fs.readFileSync(picture.path);
  return Article.create({
    title: article.title,
    content: article.content,
    picture: imageData,
  });
}

async function updateArticle(article, articleId, picture = undefined) {
  // Check if picture are defined or not
  if (picture.path !== undefined) {
    const imageData = fs.readFileSync(picture.path);
    Object.assign(article.picture, imageData);
  }

  return Article.update(
    article,
    {
      where: {
        id: articleId,
      },
    },
  );
}

async function deleteArticle(articleId) {
  return Article.destroy({
    where: {
      id: articleId,
    },
  });
}

module.exports = {
  getArticleById, getAllArticle, createArticle, updateArticle, deleteArticle,
};
