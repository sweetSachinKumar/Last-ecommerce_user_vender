import React from 'react'
import {BsPlus, BsEyeFill} from 'react-icons/bs'
import {Link, NavLink } from 'react-router-dom'

import axios from "axios"
import { toast } from 'react-toastify';
import { backendUrl } from '../../serverUrl';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCart } from '../../slices/cart';

const ProductCard =  (product) => {
  const {thumbnail, title, rating,price, _id } = product?.product
  // console.log(product)
  const {cart} = useSelector(state => state.cart)

const dispatch = useDispatch()

  const addToCart = async (data) => {

    const checkItem = cart.find(item => item.productId === data._id)
console.log(checkItem)
    if(checkItem){
   toast.warn("already in cart"); 
    }
     else {
    
  console.log(data)
 const {brand, category, description, price, rating, thumbnail,title, _id} = data

 await axios
 .put(
   `${backendUrl}cart/addToCart`,
   {
    brand, category, description, price, rating, thumbnail,title, productId:_id
   },
   { withCredentials: true }
 )
 .then((res) => {
   toast.success("Add to Cart"); 
  dispatch(getAllCart())
   console.log(res)
 })
 .catch((err) => {
   toast.error(err.response.data.message);
 });
  }
  }

  return (
    <div className="max-w-[280px] w-full border-gray-800 shadow mx-auto relative group">
    <div className="h-[175px] w-[280px]">
      <img src={thumbnail} className=" h-full w-full rounded-t-lg object-cover " alt="" />
    </div>
         <div className="absolute right-0 top-0 opacity-0 transition m-4  duration-300 group-hover:opacity-100 flex flex-col space-y-5  ">

         <button onClick={()=> addToCart(product?.product)} className=" rounded-md text-l flex items-center justify-center w-14 h-9 text-white  bg-red-500 hover:bg-red-600"><BsPlus size={30}/></button>

<NavLink to={`/product/${_id}`} className=" rounded-md w-14 h-9 flex items-center justify-center bg-white hover:drop-shadow-lg shadow-lg "><BsEyeFill  size={20}/></NavLink>

        </div>
    <div className="mt-4 px-5 pb-5">
      <Link  to={`/product/${_id}`}>
        <h5 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h5>
        <div className="mb-5 mt-2.5 flex items-center">{rating} stars</div>
        <p>
          <span className="text-3xl font-bold text-orange-700/90 me-1">${price}</span>
          <span className="text-sm text-orange-900/80 font-semibold line-through">${price}</span>
        </p>
      </Link>
    </div>
  </div>
  )
}

export default ProductCard
