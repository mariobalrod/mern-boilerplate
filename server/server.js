const express = require('express');
const morgan = require('morgan');

const routes = require('./routes/index');

require('dotenv').config();

require('./database');

const app = express();

// TODO: Settings
app.set('port', process.env.PORT || 8080);

// TODO: Middlewares
app.use(morgan('dev'));
app.use(express.json());

// TODO: Routes
app.use('/api', routes);

module.exports = app;