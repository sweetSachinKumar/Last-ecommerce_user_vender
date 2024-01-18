import React from 'react'
import AdminSidebar from '../components/Layouts/AdminSidebar'

const AdminDashboard = () => {
  return (
    <div className='w-full flex'>
      <div className='flex'>
        <div className='w-[80px] 800px:w-[330px] '>
            <AdminSidebar active={1} />
        </div>
        overview
    </div> 
    </div>
  )
}

export default AdminDashboard
