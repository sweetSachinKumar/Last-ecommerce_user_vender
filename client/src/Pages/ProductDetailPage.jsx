import React, { useEffect } from 'react'
import Navbar from '../components/Layouts/Navbar'
import ProductDetails from '../components/Route/ProductDetails'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  fetchProductByQuery, getSingleProduct } from '../slices/product'
import ProductCard from '../components/Route/ProductCard'


const ProductDetailPage = () => {
    const { queryProduct } = useSelector(state => state.product)
    const {singleProduct} = useSelector(state => state.product)
    const {id:urlId} = useParams()
    const dispatch = useDispatch()
    const relatedProductCtg = singleProduct?.category
    
console.log(queryProduct, relatedProductCtg)
    useEffect(()=> {
        window.scrollTo(0,0)
        dispatch(getSingleProduct(urlId))
        dispatch(fetchProductByQuery(relatedProductCtg))
            },[urlId])
    useEffect(()=> {
        window.scrollTo(0,0)
        dispatch(getSingleProduct(urlId))
        dispatch(fetchProductByQuery(relatedProductCtg))
            },[])
  return (
    <div>
        <Navbar/>
    {  singleProduct &&  <ProductDetails singleProduct={singleProduct} />}


    {queryProduct &&
                 
                    <section className='pt-24 px-2 container mx-auto'>
                        <div >
                            {/* <h2 className='mx-4 pe-6 my-14 text-4xl font-light border-b-2 border-orange-400 inline-block '>some relative Product </h2> */}
                            <h2 className='lg:text-3xl text-2xl font-bold text-neutral-700 ms-3 mb-2 lg:mb-5'>Related Product</h2>
                            
                       
                            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 max-w-sm mx-auto md:max-w-none md:mx-0 gap-8'>
                                {queryProduct && queryProduct?.map(product => <ProductCard product={product} />)}
                            </div>
                      </div>
                    </section>
            }
    </div>
  )
}

export default ProductDetailPage
