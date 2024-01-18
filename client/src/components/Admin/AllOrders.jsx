import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allOrderAdmin } from '../../slices/order'
import {Link} from "react-router-dom"

const AllOrders = () => {

    const {allOrders} = useSelector(state => state.order)
    const dispatch = useDispatch()
console.log(allOrders)

    useEffect(()=> {
dispatch(allOrderAdmin())
    }, [])
  return (
    <div className='py-12 overflow-x-auto  px-3   w-full  h-full flex-1' >
    <h3 className="uppercase text-center py-5 text-xl md:text-2xl font-semibold text-neutral-800/90">All Orders</h3>
    <table className="w-full text-xs  sm:text-sm lg:text-base min-h-[30vh] h-full  ">
                <thead>
                    <tr className="grid grid-cols-12  gap-3 bg-orange-600/80 text-white p-1">
                        <th className="col-span-3 break-words text-left ps-3">order Id</th>
                        <th className="col-span-3 break-words text-left ps-3">Product name</th>
                        <th className="col-span-2  text-left">status</th>
                        <th className="col-span-2  text-right">Item Qty</th>
                        <th className="col-span-2  text-right pr-3">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allOrders &&
                        allOrders?.map(order => {
                            return (
                             <tr key={order._id} className="grid grid-cols-12 gap-3 even:bg-gray-500/10 odd:bg-transparent p-1">
                                <td className="col-span-3 break-words text-left ps-3"><Link to={`/orderdetails/${order._id}`}>{order._id}</Link> </td>
                                <td className="col-span-3 break-words text-left ps-3" > <Link to={`/orderdetails/${order._id}`}>{order?.cart[0].title}</Link></td>
                                <td className="col-span-2 break-words text-left ps-3" > <Link to={`/orderdetails/${order._id}`}>{order.orderStatus} </Link></td>
                                <td className="col-span-2  text-right ">{order?.cart[0].qty}</td>
                                <td className="col-span-2  text-right pr-3">${order?.cart[0].price*order?.cart[0].qty + order?.shippingCharge }</td>
                            </tr>
                            )
                        })
                    }
                   


                </tbody>
            </table>
    </div>
  )
}

export default AllOrders
