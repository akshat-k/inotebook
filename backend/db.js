
const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false&connectTimeoutMS=10000000"


const connectToMongo = async () => {
    mongoose.connect(mongoURI, async () => {
        console.log("Connect to Mongo Databse")
    })
}

module.exports = connectToMongo;