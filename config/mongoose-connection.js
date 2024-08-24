const mongoose = require('mongoose');
require('dotenv').config();

console.log('MONGODB_URL:', process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected'))
    .catch((err) => console.error('Connection error:', err));

module.exports = mongoose.connection;