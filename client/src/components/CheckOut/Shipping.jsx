import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
 

const Shipping = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
const navigate = useNavigate()


  const submit = async (data) => {
console.log(data)

const shippingData = {
    shippingAddress: data
}

localStorage.setItem("latestOrder", JSON.stringify(shippingData))

navigate("/order/confirmOrder")
  }

  return (
    <div className="mt-16 flex flex-col items-center">
    <h1 className="border-b-2 border-gray-400/50 px-10 pb-5 text-xl">Shipping Details</h1>
    <div className="mt-12 w-full max-w-[280px] p-2">
      <form onSubmit={handleSubmit(submit)} className="w-full space-y-4">
        <div>
          <div className="flex w-full gap-3 border-2 p-2 md:p-3">
            <label htmlFor="" className=" text-sm font-semibold text-gray-800">home</label>
            <input type="text" placeholder="your address" className="w-full text-sm font-semibold text-gray-700 outline-none placeholder:text-xs placeholder:font-normal" {...register('home', { required: "Enter your address" })} />
          </div>
          {errors.home && <span className='text-xs md:text-sm text-red-700/90 font-semibold'>{errors.home.message}</span>}
        </div>
        <div>
          <div className="flex w-full gap-3 border-2 p-2 md:p-3">
            <label htmlFor="" className=" text-sm font-semibold text-gray-800">state</label>
            <input type="text" placeholder="your state" className="w-full text-sm font-semibold text-gray-700 outline-none placeholder:text-xs placeholder:font-normal" {...register('state', { required: "enter your state name " })} />
          </div>
          {errors.state && <span className='text-xs md:text-sm text-red-700/90 font-semibold'> {errors.state.message}</span>}
        </div>
        <div>
          <div className="flex w-full gap-3 border-2 p-2 md:p-3">
            <label htmlFor="" className=" text-sm font-semibold text-gray-800">pin</label>
            <input type="text" placeholder="10037" className="w-full text-sm font-semibold text-gray-700 outline-none placeholder:text-xs placeholder:font-normal" {...register('pincode', { required: "enter your pincode of area  " })} />
          </div>
          {errors.pincode && <span className='text-xs md:text-sm text-red-700/90 font-semibold'> {errors.pincode.message}</span>}
        </div>
        <div>
          <div className="flex w-full gap-3 border-2 p-2  md:p-3">
            <label htmlFor="" className=" text-sm font-semibold text-gray-800">country</label>
            <input type="text" value="india" placeholder="your country" className="w-full text-sm font-semibold text-gray-700 outline-none placeholder:text-xs placeholder:font-normal" {...register('country', { required: "enter your conuntry " })} />
          </div>
          {errors.country && <span className='text-xs md:text-sm text-red-700/90 font-semibold'> {errors.country.message}</span>}
        </div>
        <div>
          <div className="flex w-full gap-3 border-2 p-2  md:p-3">
            <label htmlFor="" className=" text-sm font-semibold text-gray-800">phone</label>
            <input type="tel" placeholder="your phone no." className="w-full text-sm font-semibold text-gray-700 outline-none placeholder:text-xs placeholder:font-normal" {...register('phone', { required: "enter you Phone no." })} />
          </div>
          {errors.phone && <span className='text-xs md:text-sm text-red-700/90 font-semibold'> {errors.phone.message}</span>}
        </div>


        <div className="  ">
          <button type='submit' className="bg-orange-600/80 hover:bg-orange-600/95 active:bg-orange-600/70 w-full mt-4 text-xs sm:text-sm font-semibold text-gray-200 py-2 text-center" > continue </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Shipping
