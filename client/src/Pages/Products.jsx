import React, { useEffect, useState } from 'react'
import Navbar from '../components/Layouts/Navbar'
import ProductSidebar from '../components/Layouts/ProductSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductByQuery } from '../slices/product'
import ProductCard from '../components/Route/ProductCard'
import { BiFilterAlt, BiSortDown } from 'react-icons/bi'

const Products = () => {
  const [myQuery, setMyQuery] = useState("laptops")
  const [open, setOpen ] = useState(false)
console.log(myQuery)
  const dispatch = useDispatch()

  const { queryProduct } = useSelector(state => state.product)

  console.log(queryProduct)

  useEffect(()=> {
    dispatch(fetchProductByQuery(myQuery))
  }, [myQuery])

  useEffect(()=> {
    dispatch(fetchProductByQuery(myQuery))
  },[])

  return (
    <div>
    <Navbar />
      <div className='flex gap-2'>
      <ProductSidebar myQuery={myQuery} setMyQuery={setMyQuery} open={open} setOpen={setOpen} />
      <div className='mt-7 p-2 w-full'>
        <div className='flex items-center justify-between mb-9 '>
        <h4 className='text-2xl md:text-3xl font-bold tracking-wide text-neutral-700 mb-8'>Products</h4>
        <span className='p-4 cursor-pointer text-neutral-800 md:hidden active:text-neutral-800/85' onClick={()=> setOpen(!open)}  >
        <BiSortDown size={30}/>
        </span>
        </div>
        <div className=' flex flex-col sm:flex-row flex-wrap items-center justify-around  gap-y-6 gap-x-3 '>
          {
            queryProduct && queryProduct?.map(product => <ProductCard product={product} key={product._id} /> )
          }
        </div>
      </div>
      </div>
    </div>
  )
}

export default Products
