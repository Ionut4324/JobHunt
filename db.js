const mongoose = require("mongoose");
dbConnect()
async function dbConnect() {

    try {
        await mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        console.log('Mongo DB Connection success')
    } catch (error) {
        console.log('Mongo DB Connection failed')
    }

}

module.exports = mongoose


