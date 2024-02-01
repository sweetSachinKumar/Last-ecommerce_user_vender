import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {RxAvatar} from "react-icons/rx"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import OAuth from './OAuth';
import { backendUrl } from '../../serverUrl';
import { Spinner } from '@material-tailwind/react';



const SignUp = () => {
const [avatar, setAvatar] = useState(null)
const [loading, setLoading] = useState(false)
    const {register, handleSubmit, watch, formState:{errors}} = useForm() 
    //    const dispatch = useDispatch()
      const navigate = useNavigate()
      
const password = watch('password')
  
const handleFileInputChange = (e) => {
  const reader = new FileReader()

  reader.onload = () => {
    if(reader.readyState == 2){
      setAvatar(reader.result)
    }
  }
  reader.readAsDataURL(e.target.files[0])
}
     
const submit = async (data) =>{
  setLoading(true)
  const {name,email, password} = data
   await axios
     .post(
       `${backendUrl}user/register`,
       {
        name,
         email,
         password,
         avatar
       },
       { withCredentials: true }
     )
     .then((res) => {
      setLoading(false)
       toast.success("Login Success!");
       navigate("/");
       window.location.reload(true);
       console.log(res)
     })
     .catch((err) => {
      setLoading(false)
       toast.error(err.response.data.message);
     });
 
   
   }
 
          
  return (
    <div className='flex items-center justify-center h-screen px-9'>
    {/* box  */}
   <div className=' h-fullpt-14 w-full '>
   
     <h2 className='text-center text-2xl font-bold tracking-tight text-gray-900'>Sign Up </h2>
     <div className='my-5'>
     <OAuth />
     </div>
     <div className='mt-3 sm:mx-auto sm:w-full sm:max-w-sm  '>
         <form onSubmit={handleSubmit(submit)}  className=' space-y-3'>
           <div>
             <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Your Name</label>
             <input  type="text" className='block mt-1 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-2 sm:text-sm sm:leading-6' name="name" placeholder='enter your name' id="name" {...register('name', {required:"Name is required"})} />
      { errors.name && <span className='text-xs md:text-sm text-red-700/90 font-semibold'>{errors.name.message}</span>}
           </div>
           <div>
             <label htmlFor="email" className='block text-sm font-medium leading-6 text-gray-900'>Email</label>
             <input   className='block  mt-1  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-2 sm:text-sm sm:leading-6' name="email" placeholder='enter your email' id="email"   {...register('email', {
                       required:"Email is required",
                       pattern:{value : /\S+@+\S+\.\S+/,
                       message:"Email is invalid"
                   }
                       })}  />
                   {errors.email && <span className='text-xs md:text-sm text-red-700/90 font-semibold'> {errors.email.message}</span>}
   
   
           </div>
           <div>
             <label htmlFor="password" className='block text-sm font-medium leading-6 text-gray-900'>Password</label>
             <input type='password' className=' mt-1 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-2 sm:text-sm sm:leading-6' name="password" placeholder='enter your Password' id="password"
             {...register('password', {
               required:"password is required",
               minLength: {value: 3, message: "password should be at least 3 charater long"}
           }
           )} />
                   {errors.password && <span className='text-xs md:text-sm text-red-700/90 font-semibold'> {errors.password.message}</span>}
   
           </div>
           <div>
             <label htmlFor="Cpassword"  className='block text-sm font-medium leading-6 text-gray-900'>Confirm Password</label>
             <input   type="password" className='mt-1 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-2 sm:text-sm sm:leading-6'  name="confirmPassword" placeholder='again enter your Password' id="Cpassword" {...register('Conpassword', {
                       required:"conform password is required",
                       minLength: {value: 3, message: "password should be at least 3 charater long"},
                       validate: value => value === password || "password do not match"
                   }
                   )} />
                   {errors.Conpassword && <span className='text-xs md:text-sm text-red-700/90 font-semibold'> {errors.Conpassword.message}</span>}
   
           </div>
           <div className='p-4'>
            <label htmlFor="avatar" className=''></label>
            <div className='flex items-center'>
                 <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                   {
                    avatar ? (<img src={avatar} alt="avatar" className='h-full w-full object-cover rounded-full'/>  ) : (<RxAvatar className="h-8 w-8" />)
                   }
                 </span>
                 <label htmlFor="file-input" className='ml-5 flex items-center justify-center px-4 py-2 border shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                 <span>Upload a file </span>
                 <input type="file" name='avatar' id='file-input' accept='.jpg, .jpeg, .png' onChange={handleFileInputChange} className='sr-only'/>
                 </label>
                 
            </div>
           </div>
           <div>
             <button type='submit' disabled={loading} className=' w-full h-full flex items-center justify-center bg-orange-600/80 hover:bg-orange-600/90 active:bg-orange-600/70 text-white py-1.5 text-sm font-semibold leading-6 shadow-sm ' >
          {loading ? <Spinner/> : "Sign in"}   
             </button>
           </div>
         </form>
   
         <p className='mt-10 text-center text-sm text-gray-500'>
       already have account? {" "}
        <Link to="/login" className='font-semibold  leading-6 text-indigo-600  hover:text-indigo-500'>Login Now</Link>
         </p>
     
         </div>
         </div>
    
   
   
   
       </div>
  )
}

export default SignUp
