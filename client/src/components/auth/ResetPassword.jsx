import axios from 'axios';
import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form';
import { backendUrl } from '../../serverUrl';
import { toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';

const ResetPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { token } = useParams()
  //    const dispatch = useDispatch()
  // http://localhost:4000/user/resetPassword/

  const password = watch('password')


  const submit = async (data) => {

    await axios
      .put(
        `${backendUrl}user/resetPassword/${token}`,
        {
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("password change success fully. please login");
        // navigate("/");
        // window.location.reload(true); 
        setIsSuccess(res.data.success)
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

  }

  return (
    <div className='flex items-center justify-center h-screen px-9'>
      {/* box  */}
      <div className=' h-full pt-24 pb-16 w-full '>

        <h2 className='text-center text-2xl font-semibold  text-gray-900 mb-4 md:mb-5'>Create new password</h2>

        <div className='mt-3 sm:mx-auto sm:w-full sm:max-w-sm  '>
          <form onSubmit={handleSubmit(submit)} className=' space-y-6'>

            <div>
              <label htmlFor="password" className='block text-sm font-medium leading-6 text-gray-900'>New Password</label>
              <input type='password' className=' mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-2 sm:text-sm sm:leading-6' name="password" placeholder='enter your new Password' id="password"
                {...register('password', {
                  required: "password is required",
                  minLength: { value: 3, message: "password should be at least 3 charater long" }
                }
                )} />
              {errors.password && <span className='text-xs md:text-sm text-red-700/90 font-semibold'> {errors.password.message}</span>}

            </div>
            <div>
              <label htmlFor="Cpassword" className='block text-sm font-medium leading-6 text-gray-900'>Confirm Password</label>
              <input type="password" className='mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-2 sm:text-sm sm:leading-6' name="confirmPassword" placeholder='again enter your Password' id="Cpassword" {...register('Conpassword', {
                required: "conform password is required",
                minLength: { value: 3, message: "password should be at least 3 charater long" },
                validate: value => value === password || "password do not match"
              }
              )} />
              {errors.Conpassword && <span className='text-xs md:text-sm text-red-700/90 font-semibold'> {errors.Conpassword.message}</span>}

            </div>
            <div>
              <button type='submit' className=' w-full bg-orange-600/80 hover:bg-orange-600/90 active:bg-orange-600/70 text-white py-1.5 text-sm font-semibold leading-6 shadow-sm ' >
                Submit
              </button>
            </div>
          </form>

          {isSuccess && <Link to="/login" className='font-semibold  leading-6 text-indigo-600 px-3  mt-7  block hover:text-indigo-500'>login Now!</Link>}

        </div>
      </div>




    </div>
  )
}

export default ResetPassword
