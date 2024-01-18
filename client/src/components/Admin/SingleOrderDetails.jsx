import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { singleOrder } from '../../slices/order'
import axios from 'axios'
import { backendUrl } from '../../serverUrl'

const SingleOrderDetails = () => {
    const dispatch = useDispatch()
    const { id:urlId } = useParams()
    const {singleOrderInfo} = useSelector(state => state.order)
    const statusOr = useRef("processing")

    const handleStatus = async (id) => {
        console.log(id, statusOr.current.value)
        const response =  await axios.put(`${backendUrl}order/admin-update-order/${id}`,{
            orderStatus: statusOr.current.value
        }, {
            withCredentials:true
        })
        if(response.data.success) {
            dispatch(singleOrder(urlId))
        }
    }

console.log(singleOrderInfo)
useEffect(()=> {
    dispatch(singleOrder(urlId))
},[])

  return (
    <div className="grid py-14 md:grid-cols-12  m-3 w-full ">
    <div className="lg:col-span-9  px-7 md:col-span-8 ">
      <div>
        <h3 className="text-xl font-semibold text-gray-800/75 sm:text-2xl">Shipping Info</h3>
        <div className="mx-2 my-2 flex min-h-[75px] flex-col justify-around gap-1  p-1 text-xs text-neutral-800 sm:mx-4 sm:min-h-[100px] sm:text-sm">
          <p><span>Name:</span> <span> {singleOrderInfo?.userData[0]?.name}</span></p>
          <p><span>Phone:</span> <span> {singleOrderInfo?.userData[0]?.phone}</span></p>
          <p><span>email:</span> <span> {singleOrderInfo?.userData[0]?.email}</span></p>
          <p><span>Address:</span> <span>  {singleOrderInfo?.shippingAddress
[0]?.home}  {singleOrderInfo?.shippingAddress
    [0]?.state}  {singleOrderInfo?.shippingAddress
        [0]?.pincode}</span></p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800/75 sm:text-2xl">Payment</h3>
        <div className="mx-2 my-2 flex min-h-[75px] flex-col justify-around gap-1 p-1 text-xs text-neutral-800 sm:mx-4 sm:min-h-[100px] sm:text-sm">
          <p className='text-green-800/80 font-semibold'>{singleOrderInfo?.payment}</p>
          <p><span>Amount:</span> <span> ${singleOrderInfo?.cart[0]?.price * singleOrderInfo?.cart[0]?.qty + singleOrderInfo?.shippingCharge}</span></p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800/75 sm:text-2xl">Order Status</h3>
        <div className="mx-2 my-2 flex min-h-[75px] flex-col justify-around gap-1 p-1 text-xs text-neutral-800 sm:mx-4 sm:min-h-[100px] sm:text-sm">
          <p>{singleOrderInfo?.orderStatus}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800/75 sm:text-2xl">Your Cart Items:</h3>
        <div className="mx-2 my-2  p-1">
          <SuborderItem item={singleOrderInfo?.cart[0]} />

        </div>
      </div>
    </div>
 
    <div className="mt-14 md:mt-0 w-full px-7 md:col-span-4 lg:col-span-3  ">
      <h3 className="text-xl font-semibold text-gray-800/75 sm:text-2xl">Order Status</h3>
      <div className="mx-auto mt-4 flex flex-col space-y-5 px-4 sm:px-0">

        <select ref={statusOr} className=" border px-4 py-1">
          <option value="processing">Choose Category</option>
          <option value="shipping">Shipping</option>
          <option value="deleverd">Delevered</option>
        </select>

        <button onClick={() => handleStatus(singleOrderInfo?._id)} className="border bg-orange-600/90 text-slate-200 hover:bg-orange-600/95 hover:text-slate-100 active:bg-orange-600/70">Process</button>
      </div>
    </div>
  </div>
  )
}


const SuborderItem = ({item}) => {
    const { _id: id, thumbnail, title, price, qty:quantity } = item
    return (
        <div className='flex flex-row px-1 py-2 my-2  bg-gray-100/60 text-gray-700 gap-3 ' key={id}>

      <div className='flex flex-col gap-5 ps-1 pb-1'>
        <img src={thumbnail} className=' w-20 ' alt="idno" />
        
      </div>
      {/* info */}
      <div className=' px-2  w-full relative  '>
        <div className='mb-5 pr-12'>
          {/* title */}
          <p className='hover:underline underline-offset-4 c'> {title}</p>
        </div>
       
        
        <div className='  sm:h-[36px] text-sm flex    sm:flex-row flex-col gap-4'>

         
          
          {/* item price  */}
          <div className='flex justify-between items-center sm:flex-1'>
          {quantity}X${parseFloat(price).toFixed(2)} =  $ {parseFloat(price * quantity).toFixed(2)}
          </div>

        </div>
      </div>
    </div>
    )
}



export default SingleOrderDetails
