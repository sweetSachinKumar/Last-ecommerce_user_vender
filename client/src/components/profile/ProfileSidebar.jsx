import React, { useState } from 'react'
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { backendUrl } from '../../serverUrl';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';




const ProfileSidebar = ({setActive, active}) => {

  const [isLogingOut, setIsLogingOut] = useState(false)


const navigate = useNavigate()
    const {user} = useSelector(state => state.user)


    const logoutHandler = async () => {
      setIsLogingOut(true)
      // console.log("logout")
      
//     const response = await axios.post(`${backendUrl}user/logout`,
//     { withCredentials: true }
// )

const response =  await axios.get(`${backendUrl}user/logout`,
          { withCredentials: true }
        )
        // return response.data

console.log(response)
if(response){
  navigate("/")
  console.log("log out")
  setIsLogingOut(false)

  window.location.reload(true); 
}
// setIsLogingOut(false)

    }

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
    <div
      className="flex items-center cursor-pointer w-full mb-8"
      onClick={() => setActive(1)}
    >
      <RxPerson size={20} color={active === 1 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 1 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Profile
      </span>
    </div>
    <div
      className="flex items-center cursor-pointer w-full mb-8"
      onClick={() => setActive(2)}
    >
      <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 2 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Orders
      </span>
    </div>

    <div
      className="flex items-center cursor-pointer w-full mb-8"
      onClick={() => setActive(6)}
    >
      <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 6 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Change Password
      </span>
    </div>

    {/* <div
      className="flex items-center cursor-pointer w-full mb-8"
      onClick={() => setActive(7)}
    >
      <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 7 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Address
      </span>
    </div> */}

    {user && user?.role === "Admin" && (
      <Link to="/admin/dashboard">
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(8)}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            color={active === 7 ? "red" : ""}
          />
          <span
            className={`pl-3 ${
              active === 8 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Admin Dashboard
          </span>
        </div>
      </Link>
    )}
    <div
      className="single_item flex items-center cursor-pointer w-full mb-8"
      onClick={logoutHandler}
    >
   { isLogingOut ? <Spinner/> : <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />}
      <span
        className={`pl-3 ${
          active === 8 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Log out
      </span>
    </div>
  </div>
  )
}

export default ProfileSidebar
