const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('development:mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URL || config.get('MONGO_URI'); // Fallback to config if env is not set

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase server selection timeout to 30 seconds
})
    .then(() => {
        console.log('Connected to MongoDB');
        debug('Mongoose connection successful');
    })
    .catch((err) => {
        console.error('Mongoose connection error:', err.message);
        debug('Mongoose connection error:', err);
    });

const db = mongoose.connection;

// Optional: Handle MongoDB connection events
db.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
    debug('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('MongoDB connection is open');
    debug('MongoDB connection is open');
});

module.exports = db;
