const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/Property'; // Replace with your MongoDB connection string

async function testConnection() {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection error:', error);
    } finally {
        mongoose.connection.close(); // Close connection after testing
    }
}


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = {connectDB,testConnection};