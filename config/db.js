const mongoose = require('mongoose');


let isConnected = false;
let cachedConnection = null;

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return cachedConnection;
    }

    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        cachedConnection = connection;
        console.log('MongoDB connected...');
        return connection;
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
