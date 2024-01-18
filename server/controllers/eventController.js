const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const Event = require("../models/Event")


exports.createEvent = catchAsyncError(async (req, res, next )=> {
    try{
    const event = await Event.create(req.body)
    console.log(req.body)
    res.status(201).json(      
        {success: true, event})

    }
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
})


// Get a single product details
exports.getsingleEvent = catchAsyncError( async (req, res, next) => {
    try{
        const event = await Event.findById(req.params.id)
        console.log(req.params.id)

        if(!event) {
            return next(new ErrorHandler("event Not Found", 404))
        }
        res.status(200).json({success: true, event})
next()
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
})


// Get a all event
exports.getAllEvent = catchAsyncError( async (req, res, next) => {
    try{
        const event = await Event.find()
        // console.log(req.params.id)

        if(!event) {
            return next(new ErrorHandler("event Not Found", 404))
        }
        res.status(200).json({success: true, event})
next()
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
})