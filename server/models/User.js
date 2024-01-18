const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "password should be greate than 4 characters"],
        select: false
    },
    phoneNumber: {
        type: Number
    },
    addresses: [
        {
            country: {
                type: String
            },
            city: {
                type: String
            },
            address1: {
                type: String
            },
            address2: {
                type: String
            },
            ZipCode: {
                type: Number
            },

        }
    ],
    role: {
        type: String,
        default: "user"
    },
    avatar: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordTime: Date
})
            
// Hash password
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// jwt Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this.id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES})
}



module.exports = mongoose.model("User", userSchema)