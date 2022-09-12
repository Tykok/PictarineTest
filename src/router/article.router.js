const express = require('express');
const multer = require('multer');
const {
  getArticleById, getAllArticle, createArticle, updateArticle, deleteArticle,
} = require('../service/article.service');

const upload = multer({ dest: 'uploads/' });
const articleRouter = express.Router();

/**
 ***********************************************************************************
 ***********************************************************************************
 * ALL PATHS FOR /api/article
 ***********************************************************************************
 ***********************************************************************************
 */

// Receive token & return price
articleRouter.post('/', upload.single('picture'), async (req, res, next) => {
  createArticle(req.body, req.file)
    .then((article) => {
      res.status(200)
        .send(article);
    })
    .catch((err) => {
      next(err);
    });
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
  getAllArticle(id)
    .then((article) => {
      res.status(200)
        .send(article);
    })
    .catch((err) => {
      next(err);
    });
});

articleRouter.put('/:id', upload.single('picture'), async (req, res, next) => {
  const { id } = req.params;
  updateArticle(req.body, id, req.file)
    .then((article) => {
      res.status(200)
        .send(article);
    })
    .catch((err) => {
      next(err);
    });
});

articleRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  deleteArticle(id)
    .then(() => {
      res.status(200)
        .send('Article deleted successfully');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = articleRouter;
