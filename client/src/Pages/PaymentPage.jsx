import React from 'react'
import CheckOutSteps from '../components/CheckOut/CheckOutSteps'
import PaymentOrder from '../components/CheckOut/PaymentOrder'
import Navbar from '../components/Layouts/Navbar'
import Footer from '../components/Layouts/Footer'

const PaymentPage = () => {
  return (
    <>
    <Navbar/>
    <div className='mt-14 mb-32 px-6 '>
        <CheckOutSteps active={2}/>
        <PaymentOrder/>
      
    </div>
    <Footer/>
    </>
  )
}

export default PaymentPage
