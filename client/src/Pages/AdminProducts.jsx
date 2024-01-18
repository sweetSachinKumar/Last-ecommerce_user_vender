import React from 'react'
import AdminSidebar from '../components/Layouts/AdminSidebar'
import AllProduct from '../components/Admin/AllProduct'


const AdminProducts = () => {
  return (
    <div className='w-full flex'>
 
      <div className='w-[80px] 800px:w-[330px] '>
      <AdminSidebar active={5} />
    </div>
      <AllProduct />
    </div> 
  )
}

export default AdminProducts
