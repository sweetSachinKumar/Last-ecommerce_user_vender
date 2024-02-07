import React from 'react'
import { Spinner } from '@material-tailwind/react'
import lodingImg from "./loadingSpinner.svg"

const Loader = () => {
  return (
    <>
      <div className='w-full min-w-[55vw] mx-auto h-[10vh] md:h-[30vh] my-5 md:my-0 flex items-center justify-center'>
    
        {/* <Spinner  color="red"  className="h-20 w-20 text-gray-200" /> */}

        <img src={lodingImg} alt="loaidng" className=' block bg-contain w-full h-full '/>
</div>
    </>
  )
}


export const smLoader = () => {

  return(

    <img src={lodingImg} alt="loaidng" className=' inline-block bg-contain w-[20px] h-[20px] mx-5'/>
 
  )
}



export default Loader
