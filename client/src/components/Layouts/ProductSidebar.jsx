import React from 'react'
import { useSelector } from 'react-redux'

const ProductSidebar = ({setMyQuery,myQuery, open, setOpen}) => {
     const sideNav = [
      "smartphones",
      "laptops",
      "womens-jewellery",
      "womens-shoes",
      "women's clothing",
      "womens-dresses",
      "groceries",
      "skincare",
      "mens-shirt",
      "mens-shoes"
     ]
  return (
    <>
      <div className={` w-full   shadow-sm rounded-[10px] p-4 pt-8 md:static  bg-white absolute top-12 ${open? "left-0": "left-full"} z-50  h-[80vh]  max-w-[250px]`}>
        <div className='bg-white'>
       <h3 className='md:text-2xl font-semibold mt-8 font-[Arial] text-xl text-neutral-800/90'>Categories</h3>   
    <ul className='ps-5 text-sm md:text-base space-y-1 mt-3 capitalize'>
      
       {
        sideNav.map((item, i) =>     <li key={i} onClick={()=>{ 
          setMyQuery(item);
          setOpen(!open);
        
        }}  className={`hover:text-orange-400 p-1 ${myQuery === item ? "text-orange-600" : "text-slate-800"}  cursor-pointer`}>{item}</li>)
       }
    </ul>
        </div>

      </div>
    </>
  )
}

export default ProductSidebar
