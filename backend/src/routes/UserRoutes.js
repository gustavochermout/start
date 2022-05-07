const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

const routes = express.Router();
const apiUserPath = '/api/user';

routes.use(authMiddleware);

routes.put(apiUserPath + '/password', UserController.updatePassword);
routes.put(apiUserPath + '/email', UserController.updateEmail);

module.exports = routes;