const mongoose = require('mongoose');
require('dotenv').config();
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,      // Tells mongoose to use the new url Parse not the old
            useUnifiedTopology: true,   // Tells use the new stable way of connecting to mongodb server
        })
        console.log('Mongodb connected successfully!');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDb;