import React from 'react'
import {MdLocalShipping}  from 'react-icons/md'
import {BiCartDownload}  from 'react-icons/bi'
import {RiBankFill}  from 'react-icons/ri' 


const CheckOutSteps = ({active}) => {
  return (
    <div className="flex h-[15vh] items-center justify-center container mx-auto ">
    <div className="relative mx-auto flex  sm:w-[89%] w-full items-center justify-between">
      <div className="relative bg-white p-3">
        <span className={`${active == 1 || 2 || 3 ? "text-orange-600" : "text-gray-500/80" } text-xl md:text-2xl`}> <MdLocalShipping /></span>
        <p className="absolute -left-4 top-12 w-32 text-xs text-neutral-700 font-semibold">shipping Detail</p>
      </div>

      <div className="relative bg-white p-3">
        <span className={`${active == 2 || 3 ? "text-orange-600" : "text-gray-500/80" } text-xl md:text-2xl`}> <BiCartDownload/></span>
        <p className="absolute -left-4 top-12 w-32 text-xs text-neutral-700 font-semibold">Confirm Order</p>
      </div>

      <div className="relative bg-white p-3">
        <span className={`${active == 3 ? "text-orange-600" : "text-gray-500/80" } text-xl md:text-2xl`}> <RiBankFill/> </span>
        <p className="absolute -left-4 top-12 w-32 text-xs text-neutral-700 font-semibold">Payment</p>
      </div>
      {/* <!-- indicator  --> */}
      <div className="absolute -z-10 h-[2px] w-full bg-slate-400">
        <div className="h-full w-[0%] "></div>
      </div>
    </div>
  </div>
  )
}

export default CheckOutSteps
