/**
 * @file All URL for api/authorization/*
 * @module router/authorization.router
 */
const express = require('express');
const { createToken } = require('../service/jwt.service');
const { getUserByLoginAndPassword } = require('../service/user.service');

const authorizationRouter = express.Router();

/**
  * URL Path used to check if the token are actually valid
  * POST /api/authorization/login
  */
authorizationRouter.get('/token', async (req, res) => {
  const { login, password } = req.headers;

  const user = await getUserByLoginAndPassword(login, password);
  if (user !== undefined) {
    const token = createToken({ login, password });
    res.send(token);
  } else {
    res.send('Invalid login or password');
  }
});

module.exports = authorizationRouter;
