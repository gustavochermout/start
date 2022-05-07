require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

routes.useRoutes(app);

app.listen(port);