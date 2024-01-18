const mongoose = require("mongoose")

const connectDatabase = async  (url) => {
    try{
console.log("connect to db")
        await mongoose.connect(url)
    } catch (err) {
        console.log("could not connected to db")
    }
}

module.exports = connectDatabase;