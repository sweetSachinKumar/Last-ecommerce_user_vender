const mongoose = require("mongoose")
// const url = "mongodb://127.0.0.1:27017/myecomerce"

const connectDatabase = async  (url) => {
    try{
console.log("connect to db")
        await mongoose.connect(url)
    } catch (err) {
        console.log("could not connected to db")
    }
}

module.exports = connectDatabase;