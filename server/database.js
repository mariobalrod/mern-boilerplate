const mongoose = require('mongoose');

require('dotenv').config();

const config = require("./config/key");

const URI = config.mongoURI;

mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}) 
    .then(() => console.log('DB connected:', URI))
    .catch(err => console.error(err));

module.exports = mongoose;