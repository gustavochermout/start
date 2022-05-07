const express = require('express');
const UserController = require('../controllers/UserController');

const routes = express.Router();
const apiUserPath = '/api/user';

routes.post(apiUserPath + '/auth', UserController.auth);
routes.post(apiUserPath, UserController.store);

module.exports = routes;