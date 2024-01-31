import React from 'react'
import { Spinner } from '@material-tailwind/react'

const Loader = () => {
  return (
    <>
      <div className='w-full h-[30vh] flex items-center justify-center'>
    
        <Spinner  color="red"  className="h-20 w-20 text-gray-200" />
</div>
    </>
  )
}

export default Loader
