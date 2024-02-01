import React from 'react'
import { Spinner } from '@material-tailwind/react'
import lodingImg from "./loadingSpinner.svg"

const Loader = () => {
  return (
    <>
      <div className='w-full min-w-[55vw] mx-auto h-[30vh] flex items-center justify-center'>
    
        {/* <Spinner  color="red"  className="h-20 w-20 text-gray-200" /> */}
        <img src={lodingImg} alt="loaidng" className=' block  '/>
</div>
    </>
  )
}

export default Loader
