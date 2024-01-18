import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SubOrderItem from './SubOrderItem'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {
 const [address, setAddress] = useState()
const {user} = useSelector(state => state.user)
const {cart} = useSelector(state => state.cart)

const TotalPrice = cart?.reduce((acc, item)=> acc + item.qty * item.price, 0)
// console.log(TotalPrice);
const navigate = useNavigate()

const totalMoneyShipping = TotalPrice + (cart?.length * 1.5)

const GoToPay = () => {
  const userData = {
   name : user?.name,
   email: user?.email,
   phone: address?.phone
  }
  const localData = {
    userData, address, cart, totalMoneyShipping
  }
  localStorage.setItem("latestOrder", JSON.stringify(localData))

  navigate("/order/paymentStep")


}

    useEffect(()=> {
        const data = JSON.parse(localStorage.getItem("latestOrder"))
        setAddress(data.shippingAddress
            )
    },[])

  return (
    <div className="mt-16 grid items-start px-3 sm:grid-cols-12 sm:px-0">
    {/* <!-- row1 --> */}
    <div className="sm:col-span-8 sm:border-r">
      <div>
        <h3 className="text-2xl font-semibold text-neutral-800/90 sm:text-3xl">Shipping Info</h3>
        <div className="space-y-1 p-3 text-xs sm:p-8 sm:text-sm lg:text-base">
          <p><span>Name:</span> <span>{user?.name}</span></p>
          <p><span>Email:</span> <span>{user?.email}</span></p>
          <p><span>Phone:</span> <span>{address?.phone}</span></p>
          <p><span>Address:</span> <span>{address?.home}, {address?.state}, {address?.country} </span></p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-neutral-800/90 sm:text-3xl">Your cart Items:</h3>
        <div className="pt-3 sm:p-8">

    {
        cart?.map(item => <SubOrderItem item={item}  />)
    }

          
        </div>
      </div>
    </div>
    {/* <!-- row 2 --> */}

    <div className="mx-auto mt-16 flex w-full max-w-xs flex-col items-center justify-center sm:col-span-4">
      <h4 className="text-xl font-semibold text-neutral-800/90 sm:text-2xl">Order Summery</h4>

      <div className="mx-auto my-4 w-full space-y-5 border-b-2 border-t-2 border-gray-300 py-6 sm:w-[80%]">
        <div className="flex justify-between">
          <span className="text-xs font-semibold text-neutral-700 sm:text-sm">Subtotal:</span>
           <span className="text-xs sm:text-sm">$ {parseFloat(TotalPrice).toFixed(2)}</span>
          </div>

        <div className="flex justify-between">
          <span className="text-xs font-semibold text-neutral-700 sm:text-sm">Shipping Charges:</span> 
          <span className="text-xs sm:text-sm"> {cart?.length}X${ parseFloat(1.5).toFixed(2)} = ${cart?.length * 1.5}  </span>
        </div>

      </div> 
      <p className="flex w-[80%] justify-between"><span className="text-xs font-bold text-neutral-700/90 sm:text-sm">Total:</span> <span className="text-xs font-semibold text-neutral-800/90 sm:text-sm"> $ {totalMoneyShipping}</span></p>

      <button onClick={GoToPay}  className="mt-5 w-[80%] bg-orange-600/80 hover:bg-orange-600/95 active:bg-orange-600/70 p-2 text-xs text-white sm:text-sm text-center" >Proceed To Payment</button>
    </div>
  </div>
  )
}

export default ConfirmOrder
