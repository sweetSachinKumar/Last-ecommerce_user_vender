import React from 'react'
import Navbar from '../components/Layouts/Navbar'
import Banner from "../components/Banner"
import Category3 from '../components/Route/Category3'
import SlideProducts from '../components/Route/SlideProducts'
import { useSelector } from 'react-redux'
import Footer from '../components/Layouts/Footer'
const Home = () => {
  const {allProducts} = useSelector(state => state.product)
  return (
    <div>
      <Navbar />
      <Banner />
      <Category3/>
{
  allProducts &&(
    <>
    <SlideProducts categoryProduct={allProducts?.mensProduct} title="Products for mens"/>
    <SlideProducts categoryProduct={allProducts?.womensProduct} title="Products for womens"/>
    <SlideProducts categoryProduct={allProducts?.techProduct} title="Tech Products "/>
    <SlideProducts categoryProduct={allProducts?.otherProduct} title="Products "/>
    </>
  )
}

<Footer/>
</div>
  )
}

export default Home
