import React from 'react'
import CheckOutSteps from '../components/CheckOut/CheckOutSteps'
import ConfirmOrder from '../components/CheckOut/ConfirmOrder'
import Navbar from '../components/Layouts/Navbar'
import Footer from '../components/Layouts/Footer'

const ConfirmOrderPage = () => {
  return (
    <>
    <Navbar/>
    <div className='mt-14 mb-32 px-6 '>

        <CheckOutSteps active={2}/>
        <ConfirmOrder/>
      

</div>
<Footer/>
    </>
  )
}

export default ConfirmOrderPage
