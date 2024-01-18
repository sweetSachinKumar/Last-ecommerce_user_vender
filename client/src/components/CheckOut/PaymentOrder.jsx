import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
 
import {MdLocalShipping}  from 'react-icons/md'
import {BiCartDownload}  from 'react-icons/bi'
import {RiBankFill}  from 'react-icons/ri'
import {SiPaytm}  from 'react-icons/si'
import {GiTakeMyMoney}  from 'react-icons/gi'
import { createOrder } from '../../slices/order'



const PaymentOrder = () => {
  const [pay, setPay ] = useState("Pay on delevery")
  const [selectBox, setSelectBox] = useState(2)
  const [data, setData ] = useState([])
  const dispatch = useDispatch()
const navigate= useNavigate()
  const ptm = () => {
    setPay("paid")
     setSelectBox(1)
  }

  const noptm = () => {
    setPay("Pay on delevery")
     setSelectBox(2)
  } 


  const handleOrder = () => {
    const finalProcess = {userData: data.userData, shippingAddress: data.address, cart: data.cart, payment:pay }
    console.log(finalProcess)

    dispatch(createOrder(finalProcess))
localStorage.setItem("latestOrder", [])
navigate("/orderSuccess")

  }
   
  useEffect(()=> {
    const datas = JSON.parse(localStorage.getItem("latestOrder"))
    setData(datas)

  }, [])

  return (
    <div className="mt-14 flex items-center flex-col gap-5 justify-center ">
    <h3 className="sm:text-3xl text-2xl text-center border-b-2 px-7 pb-3 ">Card Info</h3>


    <div className=" space-y-3 w-full max-w-xs">
      <div onClick={ptm} className={`border p-3 hover:bg-orange-500/10 flex cursor-pointer ${selectBox===1? "bg-orange-500/10": ""}`}>
        <span className="pe-5 text-xl md:text-2xl"><SiPaytm /></span> <span className="text-sm font-semibold text-neutral-700">pay through Paytm</span>
      </div>


      <div onClick={noptm} className={`border p-3 hover:bg-orange-500/10 cursor-pointer flex items-center ${selectBox===2? "bg-orange-500/10": ""}`} >
        <span className="pe-5"><GiTakeMyMoney/></span> <span className="text-sm font-semibold  text-neutral-700">pay on develery</span>
      </div>


      <div className=" flex items-center justify-center ">
        <button onClick={handleOrder}  className="bg-orange-600/80 hover:bg-orange-600/95 active:bg-orange-600/70 mt-4 text-xs sm:text-sm font-semibold text-gray-200 py-2 w-full text-center"> pay ${data.totalMoneyShipping} </button>
      </div>
    </div>
  </div>
  )
}

export default PaymentOrder
