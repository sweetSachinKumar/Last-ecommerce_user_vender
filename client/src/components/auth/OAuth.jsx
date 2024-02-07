import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import { decodeJwt } from 'jose'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { backendUrl } from '../../serverUrl'
import { Spinner } from '@material-tailwind/react'
import Loader from '../Layouts/Loader'

const OAuth = () => {
  const [loading, setLoading] = useState(false)
  console.log("oauth")
  const navigate = useNavigate()


  const onGoogleSuccess = async (credentialResponse) => {
    setLoading(true)
    const { credential } = credentialResponse
    const payload = credential ? decodeJwt(credential) : undefined
    const { name, email, picture } = payload


    if (credential) {

      await axios
        .post(
          `${backendUrl}user/googleauth`,
          {
            name,
            email,
            picture,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Login Success!");
          navigate("/");
          window.location.reload(true);
          setLoading(false)
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false)

        });
    }
  }


  return (
    <div className="flex items-center gap-3 justify-center" >
      {!loading ? <GoogleLogin
        onSuccess={onGoogleSuccess}
        buttonText="Sign in with Google"
        onError={err => console.log("google err: ", err)}


      /> :
        <Loader />
      }
      {/* <Spinner color="red"  className="h-10 w-10 text-gray-200"  /> */}
    </div>
  )
}

export default OAuth
