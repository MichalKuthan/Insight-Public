const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://michalkuthan:422514@cluster1.n55h6ee.mongodb.net/Profiles';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(`MongoDB Connection Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;