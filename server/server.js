const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

require('./database');

const app = express();

// TODO: Settings
app.set('port', process.env.PORT || 8080);

// TODO: Middlewares
app.use(morgan('dev'));
app.use(express.json());

module.exports = app;