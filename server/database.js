const mongoose = require('mongoose');

require('dotenv').config();

const URI = process.env.MONGO_URI || 'mongodb://localhost/mern-boilerplate';

mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}) 
    .then(db => console.log('DB connected:', URI))
    .catch(err => console.error(err));

module.exports = mongoose;