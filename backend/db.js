const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://amanshukla4194:amans%40148@cluster0.ddqy0v1.mongodb.net/CyberNotes" // Replace with your actual database name

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
