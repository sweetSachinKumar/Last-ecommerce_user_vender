import React from 'react'
import AdminSidebar from '../components/Layouts/AdminSidebar'
import AllOrders from '../components/Admin/AllOrders'

const AdminOrders = () => {
  return (
    <div className='w-full flex'>
       <div className='w-[80px] 800px:w-[330px] '>
      <AdminSidebar active={2} />
    </div >
      <AllOrders/>
    </div> 
  )
}

export default AdminOrders
