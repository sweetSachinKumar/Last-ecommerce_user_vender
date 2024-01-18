const mongoose = require("mongoose")

const eventSchema =  new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please Enter the Product title"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter the description Name"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter the price Name"],
        maxLength: [8, "Price cannot excee 8 characters"]
    },
    rating: {
        type: Number,
        default: 0
    },
    // image:[{
    //     public_id:{
    //         type: String,
    //         // required:true
    //     },
    //     url:{
    //         type:String,
    //         // required: true
    //     }
    // }],
    images:[ {type:String}],
    category: {
        type: String,
        required: [true, "please enter Product category"]
    },
    Stock: {
        type: Number,
        required: [true, "please enter Stock number"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews:[
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
    // start_Date: {
    //     type: Date,
    //     required: true,
    //   },
    //   Finish_Date: {
    //     type: Date,
    //     required: true,
    //   },
      status: {
        type: String,
        default: "Running",
      },
})

module.exports = mongoose.model("Event", eventSchema)
