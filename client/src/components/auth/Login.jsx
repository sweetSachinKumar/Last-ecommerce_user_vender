import React from 'react'
import { useForm } from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';
import OAuth from './OAuth';
import { backendUrl } from '../../serverUrl';
const Login = () => {
    const navigate = useNavigate()
    const {register, handleSubmit,formState:{errors}} = useForm() 
//    const dispatch = useDispatch()
  

  
const submit = async (data) =>{
 const {email, password} = data
  await axios
    .post(
      `${backendUrl}user/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Login Success!");
      navigate("/");
      window.location.reload(true); 
      console.log(res)
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });

  
  }

      
  return (
    <div className='flex items-center justify-center h-screen px-9'>
    {/* box  */}
   <div className=' h-[50vh] w-full '>
   
     <h2 className='text-center text-2xl font-bold tracking-tight text-gray-900'>Log in </h2>
     <div className='my-5'>
      <OAuth />
     </div>
     <div className='mt-3 sm:mx-auto sm:w-full sm:max-w-sm '>
     <form className=' space-y-6' onSubmit={handleSubmit(submit)}>
    
           <div>
             <label htmlFor="email" className='block text-sm font-medium leading-6 text-gray-900'>Email</label>
             <input type="email" className='block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-2 sm:text-sm sm:leading-6' placeholder='enter your email' id="email"   {...register('email', {
                    required:"Email is required",
                    pattern:{value : /\S+@+\S+\.\S+/,
                    message:"Email is invalid"
                }
                    })}/>
                {errors.email && <span className='text-xs md:text-sm text-red-700/90 font-semibold'> {errors.email.message}</span>}

           </div>
           <div>
            <div className='flex justify-between'> <label htmlFor="password" className='block text-sm font-medium leading-6 text-gray-900'>Password</label>
                    <Link  to="/forgotPassword"  className='block text-sm font-medium leading-6 text-orange-700/90'>Forgot password?</Link>
            </div>
             <input type="password" className='mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-2 sm:text-sm sm:leading-6' placeholder='enter your Password' id="password"  {...register('password', {
                    required:"password is required",
                    minLength: {value: 3, message: "password should be at least 3 charater long"}
                }
                )}/>
                {errors.password && <span className='text-xs md:text-sm text-red-700/90 font-semibold'> {errors.password.message}</span>}

           </div>
           
           <div>
             <button type='submit' className=' w-full bg-orange-600/80 hover:bg-orange-600/90 active:bg-orange-600/70 text-white py-1.5 text-sm font-semibold leading-6 shadow-sm ' >
             Log in
             </button>
           </div>
         </form>
   
         <p className='mt-10 text-center text-sm text-gray-500'>
       New User? {" "}
        <Link to="/signup" className='font-semibold  leading-6 text-indigo-600  hover:text-indigo-500'>sign up  Now</Link>
         </p>
         </div>
         </div>
    
   
   
       </div>
  )
}

export default Login
