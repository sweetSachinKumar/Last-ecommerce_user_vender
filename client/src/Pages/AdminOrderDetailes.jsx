import React from 'react'
import SingleOrderDetails from '../components/Admin/SingleOrderDetails'
import AdminSidebar from '../components/Layouts/AdminSidebar'

const AdminOrderDetailes = () => {
  return (
    <div className='w-full flex'>
       <div className='w-[80px] 800px:w-[330px] '>
      <AdminSidebar active={2} />
    </div >
      <SingleOrderDetails/>
    </div> 
  )
}

export default AdminOrderDetailes
