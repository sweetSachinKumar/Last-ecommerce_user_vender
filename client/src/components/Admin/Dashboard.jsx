import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allOrderAdmin } from '../../slices/order'
import { getAllusers } from '../../slices/user'
import CTGproductChart from './CTGproductChart'
import { HiOutlineUserGroup, HiUsers } from 'react-icons/hi'
import { BsHandbag } from 'react-icons/bs'
import { FiShoppingBag } from 'react-icons/fi'
import AllUsers from "./AllUsers"
import Loader from '../Layouts/Loader'

const Dashboard = () => {
  const [dataSet, setDataSet] = useState(null)
  const { allProducts, loading } = useSelector(state => state.product)
  const { products, totalProduct } = useSelector(state => state.product)

  const { users, usersLength } = useSelector(state => state.user)
  const { allOrders } = useSelector(state => state.order)

  const ctgData = [
    { label: "for mens", dataLength: allProducts?.mensProduct?.length },
    { label: "for womens", dataLength: allProducts?.mensProduct?.length + 2 },
    { label: "tech", dataLength: allProducts?.mensProduct?.length },
    { label: "other", dataLength: allProducts?.mensProduct?.length - 3 },
  ]


  console.log(usersLength, ctgData, allOrders?.length, totalProduct)
  const dispatch = useDispatch()

  console.log(dataSet)


  useEffect(() => {
    setDataSet([
      { icon: <HiUsers />, iconColor: "bg-blue-500", text: "Total Users", lengths: usersLength },
      { icon: <BsHandbag />, iconColor: "bg-yellow-600", text: "Total Products", lengths: totalProduct },
      { icon: <FiShoppingBag />, iconColor: "bg-red-700/80", text: "Total Orders", lengths: allOrders?.length },

    ])
  }, [users, allOrders])

  useEffect(() => {
    dispatch(allOrderAdmin())
    dispatch(getAllusers(1))
    // dispatch(getProducts(1))

  }, [])
  return (
    <div className='pt-12 px-3 pb-12 w-full'>
      {loading ? <Loader /> :

(
<>
        <div className='grid grid-cols-3 gap-5 mx-auto'>
          {
            dataSet?.map(data => {
              return (
                <div className=' shadow-md shadow-gray-300 flex gap-2 items-center p-3'>
                  <span className={` text-xs md:text-sm  rounded-2xl p-2 text-white ${data.iconColor}`}>{data.icon}</span>
                  <div>
                    <p className='text-xs font-semibold text-slate-600'>{data.text}</p>
                    <p className='text-sm font-bold font-[Arial] ps-2 text-slate-800'>{data.lengths}</p>
                  </div>
                </div>
              )
            })
          }


        </div>
       
        <Loader />
      <div className=''>
        {(allProducts && !loading) &&
          <CTGproductChart allProduct={ctgData} />}
      </div>

      <div>
        <AllUsers />
      </div>
      </>
      )

}
    </div>
  )
}

export default Dashboard
