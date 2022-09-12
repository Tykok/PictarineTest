const express = require('express');

const router = express.Router();

router.use('/api/article', require('./article.router'));

module.exports = router;
