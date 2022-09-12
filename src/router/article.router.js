const express = require('express');
const { getArticleById } = require('../service/article.service');

const articleRouter = express.Router();

/**
 ***********************************************************************************
 ***********************************************************************************
 * ALL PATHS FOR /api/article
 ***********************************************************************************
 ***********************************************************************************
 */

// Receive token & return price
articleRouter.post('/', async (req, res) => {
  res.send(
    'This is a test',
  );
});

articleRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  getArticleById(id)
    .then((article) => {
      res.status(200)
        .send(article);
    })
    .catch((err) => {
      next(err);
    });
});

articleRouter.get('/', async (req, res, next) => {
  const { id } = req.params;
  getArticleById(id)
    .then((article) => {
      res.status(200)
        .send(article);
    })
    .catch((err) => {
      next(err);
    });
});

articleRouter.put('/:id', async (req, res) => {
  res.send(
    'This is a test',
  );
});

articleRouter.delete('/:id', async (req, res) => {
  res.send(
    'This is a test',
  );
});
module.exports = articleRouter;
