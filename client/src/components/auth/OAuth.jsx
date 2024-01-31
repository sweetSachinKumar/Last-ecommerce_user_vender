import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import React from 'react'
import { decodeJwt } from 'jose'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { backendUrl } from '../../serverUrl'

const OAuth = () => {
    console.log("oauth")
    const navigate = useNavigate()
  const onGoogleSuccess = async (credentialResponse) => {

    const {credential} = credentialResponse
    const payload = credential ? decodeJwt(credential) : undefined
    const {name, email, picture} = payload

    console.log(name, email, picture)

  if(credential){

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
    console.log(res)
  })
  .catch((err) => {
    toast.error(err.response.data.message);
  });  
}
}
  

  return (
    <div  className="flex items-center justify-center" >
      <GoogleLogin
          onSuccess={onGoogleSuccess}
          buttonText="Sign in with Google"
          onError={err => console.log("google err: ", err)}
          
            
        />
        
    </div>
  )
}

export default OAuth
