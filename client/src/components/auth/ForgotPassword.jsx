import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../../serverUrl';

// http://localhost:4000/user/forgotPassword

const ForgotPassword = () => {
  const [email, setEmail] = useState()

const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

   await axios
     .post(
       `${backendUrl}user/forgotPassword`,
       {
        email
       },
       { withCredentials: true }
     )
     .then((res) => {
       toast.success("reset password link email is send");
       navigate("/");
       window.location.reload(true); 
     })
     .catch((err) => {
       toast.error(err.response.data.message);
     });
 
   
   }
  
  return (
    <section className="bg-gray-50\">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/" className="flex items-center md:-mt-14 mb-6  ">
        <div className='xl:text-4xl lg:text-4xl text-3xl text-orange-600/90 font-semibold ' >
            Sachin's <small>store</small>
          </div>
        </Link>
        <div className="w-full p-6 bg-white rounded-lg    md:mt-0 sm:max-w-md   sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  ">
                Forgot your password?
            </h1>
            <p className="font-semibold text-sm  text-neutral-700  ">Enter your user account's verified email address and we will send you a password reset link.</p>
            <form className="mt-5 space-y-4 lg:mt-6 md:space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900  ">Your email</label>
                    <input type="email" value={email} required onChange={(e)=> setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@gmail.com"  />
                </div>
                  
                <button type="submit" className="w-full text-white focus:outline-none bg-orange-600  font-medium hover:bg-orange-600/90 active:bg-orange-600/80 rounded-lg text-sm px-5 py-2.5 text-center ">Reset password</button>
            </form>
        </div>
    </div>
  </section>
  )
}

export default ForgotPassword
