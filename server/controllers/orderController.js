const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler")
const Order = require("../models/Order")

exports.createOrder =  catchAsyncError(async (req, res, next) => {
    const { cart, shippingAddress, payment, userData } = req.body;

    try{
        // const order = await Order.create({...req.body, user:req.user.id})

        const orders = []
        for (const item of cart) {
          const order = await Order.create({
            cart: item,
              shippingAddress,userData,
              payment,
              shippingCharge: 1.5,
              user:req.user.id 
          })
          // const order ={
          //   cart: item,
          //   shippingAddress,userData,
          //   payment,
          //   shippingCharge: 1.5,
          //   user:req.user.id 
          // }
          orders.push(order)
        }


        // const totalMoney = cart[0].price * cart[0].qty
        res.status(200).json({success: true,orders})

        

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })

  

// for users s
 exports.allOrders =  catchAsyncError(async (req, res, next) => { 

      try{

        const orders = await Order.find({user:req.user.id, orderStatus:{$ne:"deleverd"}}).sort("-createdAt")
        if(!orders) {
          return next(new ErrorHandler("Orders  is Empty", 400))
        }
        res.status(200).json({
          success: true, orders
        })

        
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })


  // admin all orders 
  exports.getAllOrders =  catchAsyncError(async (req, res, next) => { 

    try{

      const orders = await Order.find({orderStatus:{$ne:"deleverd"}}).sort("-createdAt")
      if(!orders) {
        return next(new ErrorHandler("Orders  is Empty", 400))
      }
      res.status(200).json({
        success: true, orders
      })

      
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})


  // admin single orders 
  exports.getaOrder =  catchAsyncError(async (req, res, next) => { 
    
    const urlId = req.params.id
    try{

        let getorder = await Order.findById(urlId)

        if(!getorder) {
         return next(new ErrorHandler('Not found', 404))
        }

        res.status(200).json({
          success: true, getorder
        }) 

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})




// for update order status 
exports.updateOrder =  catchAsyncError(async (req, res, next) => {
  const urlId = req.params.id
    const {orderStatus} = req.body
    if(!orderStatus){
      return  res.status(400).json({error: "orderStatus is undefinde"})
    }
    
  try{
    let getItem = await Order.findById(urlId)
      
    if(!getItem) {
      return res.status(404).json({status:'Not found'})
     }
 
     if(orderStatus=="deleverd"){
         getItem = await Order.findByIdAndUpdate(urlId, {$set : {orderStatus,payment:"Paid"}}, {new:true})
     }else{
         getItem = await Order.findByIdAndUpdate(urlId, {$set : {orderStatus}}, {new:true}) 
 
     }

     res.status(200).json({
      success: true, getItem
    })
      

  } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })

