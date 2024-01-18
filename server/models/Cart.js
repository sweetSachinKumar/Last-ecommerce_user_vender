const mongoose = require('mongoose')

const cartSchema =  new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"allproduct"
    }  ,   
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
        required: [true, "Please Enter the description Name"],
        maxLength: [8, "Price cannot excee 8 characters"]
    },
   
    qty: {
        type:Number,
        default: 1,
        required: [true, "Please Enter the quantity"],
    },
    
    brand:  {
        type:String,
        default:"sachin"
    },
    category: {
        type: String,
        required: [true, "please enter Product category"]
    },
    thumbnail:  {
        type:String,
        required:[true,"please enter Product category" ]
    } ,
     createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("mycart", cartSchema)