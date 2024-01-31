import React from 'react'
import { Link } from 'react-router-dom'


const SuccessOrder = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen flex-col gap-2">
 
    <span className="border rounded-full bg-orange-500 px-6 py-6 text-white text-3xl font-semibold">ok</span>
    <p className="text-sm sm:text-base md:text-xl">Your Order has been Placed successfully</p>
    <Link to="/profile" className="mt-4 sm:px-16 px-5 bg-slate-900 hover:bg-slate-900/90 text-white py-1 rounded">View Order</Link>
   
   </div>
  )
}

export default SuccessOrder
