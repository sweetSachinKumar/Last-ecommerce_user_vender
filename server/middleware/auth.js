const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncError = require("./catchAsyncError")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.isAuthenticate = catchAsyncError( async (req, res, next) => {
    const {token} = req.cookies;
    // console.log("token" ,token)
    if(!token) {
        return next(new ErrorHandler("Please login to continue", 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded.id)
    next();
})

exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} can not access this resources!`))
        }
        next();
    }
}