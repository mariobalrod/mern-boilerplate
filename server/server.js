const express = require('express');
const morgan = require('morgan');
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const routes = require('./routes/index');

require('dotenv').config();

require('./database');

const app = express();

// TODO: Settings
app.set('port', process.env.PORT || 8080);

// TODO: Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// TODO: Routes
app.use('/api', routes);

// TODO: Production
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

module.exports = app;