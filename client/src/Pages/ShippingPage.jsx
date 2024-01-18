import React from 'react'
import CheckOutSteps from '../components/CheckOut/CheckOutSteps'
import Shipping from '../components/CheckOut/Shipping'
import Footer from '../components/Layouts/Footer'
import Navbar from '../components/Layouts/Navbar'
const ShippingPage = () => {
  return (
    <>
    <Navbar />
    <div className='mt-14 mb-32 px-6 '>
      <CheckOutSteps active={1}/>
      <Shipping/>
    </div>
    <Footer/>
    </>
  )
}

export default ShippingPage
