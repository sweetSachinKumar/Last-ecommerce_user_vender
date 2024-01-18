import React from 'react'

const SubOrderItem = ({item}) => {
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
        <p className='hover:underline underline-offset-4 '> {title}</p>
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

export default SubOrderItem
