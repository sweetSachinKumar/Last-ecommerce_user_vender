import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Cart from '../components/Cart'
import Navbar from '../components/Layouts/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Layouts/Footer'
import Loader from '../components/Layouts/Loader'

const CartPage = () => {
    const {cart, loading} = useSelector(state => state.cart) 
    const {isAuthenticated} = useSelector(state => state.user) 
const [total, setTotal] = useState(0)


const shopNow = () => {

}

useEffect(() => {
    const totals = cart?.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.qty
    }, 0)
    setTotal(totals)
  }, [cart])


  return (
    <> <Navbar /> 
    <div className='py-8 min-h-[80vh] h-full  xl:container sm:px-2 mx-auto '>
            <div className='grid grid-cols-1 xl:grid-cols-12 gap-8 '>

          <div className='container px-5 mx-auto col-span-1 xl:col-span-8'>
{/* {loading && <Loader/>} */}

{
    cart && isAuthenticated &&  cart.length === 0 ? 
    <ZeroItemMSG/> :   
    cart.map(item => <Cart item={item}/> )
}

    </div>
    <div className='col-span-1 xl:col-span-4'>
              {cart && isAuthenticated &&
                <div className='p-9 bg-orange-200/80 max-w-sm m-2  md:mb-0  rounded-sm  self-start'>
                  <h2 className='lg:text-2xl text-xl font-semibold text-neutral-900 '>Total Product in cart: {cart && cart?.length}</h2>
                  <p className='lg:text-xl text-gray-800  text-base mt-2'>  <span>Total Price: </span> <span className='font-semibold '> $ {parseFloat(total).toFixed(2)} </span></p>
                <div className=' mt-5 '>
                  <Link to="/order/shipping"  className='bg-orange-600 hover:bg-orange-600/70 active:bg-orange-600/90 text-white md:text-xl rounded-full font-semibold w-[80%] px-12 py-2' >check out</Link>
                  </div>
                </div>
              }
            </div>

    </div>

 {!isAuthenticated &&   <div className={`flex items-center  justify-center h-[55vh] max-w-2xl mx-auto`}>
          <CreateAccMSG />
        </div> }
    </div>
    
<Footer/>
    </>
  )
}

export default CartPage



const ZeroItemMSG = () => {

  return (
    <div className='flex items-center flex-col h-[30vh] justify-center '>
      <p className='text-xl font-semibold text-neutral-800'>No any item in carts </p>
      <Link to="/" className='text-5xl mt-2 hover:underline transition-all duration-300 font-bold text-orange-600 hover:text-orange-700'>shop Now</Link>

    </div>
  )
}

// account message error
export const CreateAccMSG = () => {

  return (
    <>
    <div className='border p-8 sm:p-12 md:p-16 rounded-md shadow-lg hover:shadow-md'>
      <h2 className='md:text-5xl text-2xl sm:text-3xl font-semibold my-4 md:my-8 text-neutral-800'>You have no account! </h2>
      <p> <span className='text-base md:text-xl'>create your new account Now </span>   <Link to="/signup" className=' text-orange-800 text-xs md:text-base hover:text-orange-900/70 font-bold tracking-wide px-3  underline '>sing up</Link>
      </p>
    </div>

    </>
  )
}