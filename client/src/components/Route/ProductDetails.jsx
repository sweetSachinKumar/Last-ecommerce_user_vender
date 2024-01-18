import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import axios from 'axios'
import { toast } from 'react-toastify' 
import { getAllCart } from '../../slices/cart'
import { backendUrl } from '../../serverUrl'

const ProductDetails = ({singleProduct}) => {
    const {cart} = useSelector(state => state.cart)
const dispatch  = useDispatch()

    const addToCart = async (data) => {

        const checkItem = cart.find(item => item.productId === data._id)
    console.log("cart is already", checkItem)
        if(checkItem){
       toast.warn("already in cart"); 
        }
         else {
        
      console.log(data)
     const {brand, category, description, price, rating, thumbnail,title, _id} = data
    
     await axios.put(
       `${backendUrl}cart/addToCart`,
       {
        brand, category, description, price, rating, thumbnail,title, productId:_id
       },
       { withCredentials: true }
     )
     .then((res) => {
       toast.success("Add to Cart"); 
      dispatch(getAllCart())
    //    console.log(res)
     })
     .catch((err) => {
       toast.error(err.response.data.message);
     });
      }
      }


  return (
    <div  className=' min-h-[60vh] h-full'>
      
      {
        singleProduct && 
        <section className='h-screen pt-32 pb-12 lg:py-32 flex items-center'>
        <div className='container mx-auto'>

            <div className='flex flex-col lg:flex-row items-center'>
                <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>

                    <img src={singleProduct.thumbnail} alt={singleProduct.title} className='max-w-[200px] lg:max-w-sm ' />
                </div>

                <div className="flex-1 text-center lg:text-left">
                    <h1 className='text-[26px] font-medium mb-2 max-w-[460] lg:mx-0 mx-auto'>{singleProduct.title ? singleProduct.title : "[no data]"}</h1>

                    <div className='text-xl text-red-500 font-medium mb-6 '> $ {singleProduct.price ? singleProduct.price : "[no data]"} </div>

                    <p className='mb-8'>{singleProduct.description ? singleProduct.description : "[no data]"}</p>

                    <button onClick={() => addToCart(singleProduct)} className='bg-black py-4 rounded px-8 text-white font-bold text-xs md:text-base leading-relaxed tracking-wide hover:bg-black/70 active:bg-black/50'>Add to cart</button>
                </div>
            </div>
        </div>

    </section>
      }
    </div>
  )
}

export default ProductDetails
