import React, { useEffect, useState } from 'react'
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { allOrder } from '../../slices/order';
import axios from 'axios';
import { backendUrl } from '../../serverUrl';
import { toast } from "react-toastify"
import { loadUser, updateUserInformation } from '../../slices/user';
 
const ProfileContent = ({ active }) => {
  const { user} = useSelector(state => state.user)
  const [name, setName] = useState(user && user?.name);
  const [email, setEmail] = useState(user && user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user?.phoneNumber);
  const [password, setPassword] = useState("");
  // const [avatar, setAvatar] = useState(null);
const dispatch = useDispatch()
  console.log(user)

  const handleImage = (e) => {
    const reader = new FileReader()

    reader.onload =async () => {
      if(reader.readyState == 2) {
        // setAvatar(reader.result)
        axios.put(`${backendUrl}user/update-avatar`, 
        { avatar: reader.result}, 
        {withCredentials: true})
        .then((response)=> {
          console.log(response)
          dispatch(loadUser())
          toast.success("avatar updated successfully")
        }).catch((error) => {
          toast.error(error)
        })
      }
    }

    reader.readAsDataURL(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phoneNumber, password)
    dispatch(updateUserInformation({name, email, phoneNumber, password}));
  };


  return (
    <div className='w-full'>

      {/* profile  */}
      {
        active === 1 && (
          <>
            <div className='flex justify-center w-full'>
              <div className="relative">
                <img src={user?.avatar?.url} alt="user" className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]" />

                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImage}
                  />
                  <label htmlFor="image" className=' cursor-pointer'>
                    <AiOutlineCamera />
                  </label>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="w-full px-5">
              <form onSubmit={handleSubmit} aria-required={true}>
                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Full Name</label>
                    <input
                      type="text"
                      className={` !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="text"
                      className={` border p-1 rounded-[5px] !w-[95%] mb-1 800px:mb-0`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="tel"
                      className={` border p-1 rounded-[5px] !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Enter your password</label>
                    <input
                      type="password"
                      className={` border p-1 rounded-[5px] !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                  required
                  value="Update"
                  type="submit"
                />
              </form>
            </div>
          </>
        )}

{
        active === 2 && (
          <AllOrders />
        )
      }

      {/* change password  */}
      {
        active === 6 && (
          <ChangePassword />
        )
      }

   
    </div>
  )
}

//  change password
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    await axios.put(`${backendUrl}user/update-user-password`, {
      oldPassword, newPassword, confirmPassword
    },
    {withCredentials: true}
    ).then((res)=> {
      toast.success(res.data.message)
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }).catch(error => toast.error(error.response.data.message))


  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`  !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`  !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`  !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};



//  alal orders 
const AllOrders = () => {
const {orders} = useSelector(state => state.order)
  const dispatch = useDispatch()
 

  useEffect(()=> {
  dispatch(allOrder())
  }, [])

  return (
    <>
    <div className='py-16 mb-32 overflow-auto  w-full'>
            <h3 className="uppercase text-center py-5 text-xl md:text-2xl font-semibold text-neutral-800/90">All Orders</h3>
            <table className="w-full text-xs sm:text-sm lg:text-base min-h-[80vh] h-full min-w-[400px] relative ">
           
                <thead>
                    <tr className="grid grid-cols-12  gap-3 bg-orange-600/80 text-white p-1">
                        <th className="col-span-3  break-words text-left ps-3">order Id</th>
                        <th className="col-span-4 break-words text-left ps-3">Product Name</th>
                        <th className="col-span-2  text-left">status</th>
                        <th className="col-span-1  text-right">Item Qty</th>
                        <th className="col-span-2  text-right pr-3">Amount</th>
                    </tr>
                </thead>
                <tbody>

                    {  orders &&
                   orders?.map(order=>{
                        return (

                             
                    <tr key={order._id} className="grid grid-cols-12 gap-3 even:bg-gray-500/10 odd:bg-transparent p-1">
                        <td className="col-span-3 break-words text-left ps-3">{order._id}</td>
                        <td className="col-span-4 break-words text-left ps-3">{order?.cart[0]?.title}</td>
                        <td className="col-span-2  text-left">{order?.orderStatus}</td>
                        <td className="col-span-1  text-right">{order?.cart[0]?.qty}</td>
                        <td className="col-span-2  text-right pe-3">${order?.cart[0]?.price * order?.cart[0].qty}</td>
                    </tr>
                    
                
                    )
                })
                }
                  

                </tbody>
            </table>

        </div>
    </>
  )
}







export default ProfileContent
