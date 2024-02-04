const User = require("../models/User")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const bcypt = require("bcryptjs")
const crypto = require("crypto");
const cloudinary = require("cloudinary")
const Token = require("../models/TokenRestPass")



exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password, avatar} = req.body 
try{
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }
let user;

if(avatar) {
  
  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars"
  })
     user = await User.create({
        name, email, password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        }
    })
  } else {

    user = await User.create({
      name, email, password,
      avatar: {
        public_id: null,
        url: null,
      }
  })

  }




    // res.json({data:user})
    sendToken(user, 201, res)

} catch (err) {
    // res.status(400).json({"erroris":err})
    console.log(err)
    return next(new ErrorHandler(err.message, 400))
}
})


// login user
exports.loginUser = catchAsyncError (async (req, res, next) => {
      try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
  
        const user = await User.findOne({ email }).select("+password");
  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists!", 400));
        }
  
        const isPasswordValid = await user.comparePassword(password);
  
        if (!isPasswordValid) {
          return next(
            new ErrorHandler("Please provide the correct information", 400)
          );
        }
        // res.json({data:user})
    sendToken(user, 201, res)

      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })



exports.googleauth  =catchAsyncError (async (req, res, next) => {
  try{
    const user = await User.findOne({email: req.body.email})
    if(user){
       
      sendToken(user, 201, res)
    } else{
        const generatePassword = Math.random.toString(36).slice(-8) + Math.random.toString(36).slice(-8);

        const newUser =  await User.create({
            name : req.body.name,
            email: req.body.email,
            password: generatePassword,
            avatar: {
              url: req.body.picture,
              public_id: `googleImage${Date.now()}`
            }
        })
        
        sendToken(newUser, 201, res)
    }

}
catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})


// load user 
exports.getuser = catchAsyncError(async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id)
    if(!user) {
      return next(new ErrorHandler("User doesn't exists", 400))
    }

    res.status(200).json({
      success: true, user
    })
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})


// logout 
exports.logout = catchAsyncError(async (req, res, next) => {
try{
  res.status(201).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true}).json({ success: true,  message: "Log out successful!"})

} catch (err) {
  return next(new ErrorHandler(err.message, 500))
}
})



// forgot password  00------------------
exports.forgotPassword = catchAsyncError( async (req, res, next) => {
  const { email } = req.body

  try{
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "User does not exist" })
    }
    // Delete token if it exists in DB
    let token = await Token.findOne({userId: user._id})
    if(token) {
        await token.deleteOne()
    }


       // create reset token
       let resetToken = crypto.randomBytes(32).toString("hex") + user._id


        // Hash token before saving to DB
        const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Save Token to DB
    await Token.create({
        userId: user._id,
        token: hashedToken,
        createAt: Date.now(),
        expiresAt: Date.now() + 1000 * 60 * 30  // 30 minutes
    })
    const restUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`

  // Reset email
  const message = `
  <h2>Hellow ${user.name} </h2>
  <p> Please use the URL to reset your password </p>
  <p> reste link is valid for only 30 minutes </p>


  <a herf=${restUrl} clicktracklink="off" >${restUrl}</a>

  <p> Regards... </p>
  <p> Sachin's Team </p>
  `

const subject = "Password Reset Request"
const send_to = user.email
const send_from = process.env.EMAIL_USER


await sendEmail(subject, message, send_to, send_from)


return res.status(200).json({success:true, message:"Reset Email sent" })
   
  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})


// reset password url
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  try{

    const {password} = req.body
    const {token} =  req.params
    
    // hash token, then compare to token in DB
    const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    // find Token in DB
    const userToken = await Token.findOne({token:hashedToken, expiresAt:{$gt: Date.now()}})

    if(!userToken) {
        // res.status(404).send("Invalid or Expire Token")
        return next(new ErrorHandler("Invalid or Expire Token", 404));
    }

    
    if (req.body.password) {
      req.body.password = bcypt.hashSync(req.body.password, 10);
  }


   await User.findByIdAndUpdate(
      userToken.userId,
                  {
                      $set: {
                          password: req.body.password
                      },
                  },
                  { new: true }
              )

res.json({success: true, message: "Password Reset SuccessFully, Please Login"})

  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})


// Get all Users (admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  try{
    let page = Number(req.query.pageNo) || 1
    let limit = Number(req.query.limit) || 10
    let skip = (page - 1) * limit


  const users = await User.find().skip(skip).limit(limit)
  const usersLength = await User.find().countDocuments()

  res.status(200).json({
    success: true,
    users,
    usersLength
  })
  
}
catch (error) {
  return next(new ErrorHandler(error.message, 500));
}
})


// update user info
exports.updateUserInfo = catchAsyncError(async (req, res, next) => {
  try{
    const { email, password, phoneNumber, name } = req.body

    const user = await User.findOne({email}).select("+password")

    if(!user) {
      return next(new ErrorHandler("user Not Found", 400))
    }

    const isPasswordValid = await user.comparePassword(password)

    if(!isPasswordValid) {
      return next( new ErrorHandler("Please provide the correct information", 400))
    }

    user.name = name
    user.email = email
    user.phoneNumber = phoneNumber;

    await user.save()

    res.status(201).json({success:true, user})

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

// update user avatar 
exports.updateAvatar = catchAsyncError(async (req, res, next) => {
  try{
    let existUser = await User.findById(req.user.id)
    if(req.body.avatar !== "") {
      const imageId = existUser.avatar.public_id

      // await cloudinary.v2.uploader.destroy(imageId)

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      })

      existUser.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url 
      }
    }

    await existUser.save()

    res.status(200).json({
      success: true,
      user:existUser
    })


  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

// update user password
exports.updateUserPassword =  catchAsyncError(async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched) {
      return next( new ErrorHandler("Old password is incorrect", 400))
    }

    if(req.body.newPassword !== req.body.confirmPassword) {
      return next( new ErrorHandler("Password doesn't matched with each other!",400))
    }

    user.password = req.body.newPassword 

    await user.save()

    res.status(200).json({
      success: true,
      message: "password updated successfully!"
    })

  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})


// find user information with the userId
exports.singleUserInfo =  catchAsyncError(async (req, res, next) => {
  try{
const user = await User.findById(req.params.id)

res.status(201).json({
  success: true,
  user
})

  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})



// delete user -- admin
exports.deleteaUser =  catchAsyncError(async (req, res, next) => {
  try{
const user = await User.findById(req.params.id)

if (!user) {
  return next(
    new ErrorHandler("User is not available with this id", 400)
  );
}

const imageId = user.avatar.public_id

await cloudinary.v2.uploader.destroy(imageId)

await User.findByIdAndDelete(req.params.id)
 
res.status(201).json({
  success: true,
  message: "user deleted successfully!"
})

  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
