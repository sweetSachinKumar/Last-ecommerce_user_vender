import React from 'react'
import AdminSidebar from '../components/Layouts/AdminSidebar'
import AllUsers from '../components/Admin/AllUsers'

const AdminUsers = () => {
  return (
    <div className='w-full flex'>
      <div className='w-[80px] 800px:w-[330px] '>
      <AdminSidebar active={4} />
    </div>
      <AllUsers />
    </div>
 
  )
}

export default AdminUsers
