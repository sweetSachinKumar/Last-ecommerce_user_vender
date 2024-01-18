import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllusers } from '../../slices/user'

const AllUsers = () => {
    const {users, usersLength} = useSelector(state=> state.user)
    const dispatch = useDispatch()
    const [pageNo, setPageNo] = useState(1)

    let DTlength = usersLength && Math.ceil(usersLength/10)


    let arrNumb = [] ;
    if(DTlength >=1){
        for(let i = 1; i<=DTlength; i++) {
          arrNumb.push(i)
        }
    } else {
        arrNumb = [1]
    }
    console.log(usersLength)

    useEffect(()=> {
        dispatch(getAllusers(pageNo))
    }, [])
    useEffect(()=> {
        dispatch(getAllusers(pageNo))
    }, [pageNo])
  return (
    <div className='py-12 overflow-auto px-3  w-full '>
    <h3 className="uppercase text-center py-5 text-xl md:text-2xl font-semibold text-neutral-800/90">All Users</h3>
    <table className="w-full text-xs sm:text-sm lg:text-base min-h-[30vh]">
                 <thead>
                   <tr className="grid grid-cols-12  gap-3 bg-orange-600/80 text-white p-1">
                         <th className="col-span-4  text-left ps-3">User Id</th>
                         <th className="col-span-2  text-left">name</th>
                         <th className="col-span-2  text-left">Email</th>
                         <th className="col-span-2  text-right pr-3">admin</th>
                         <th className="col-span-2  text-right pr-3">action</th>
                     </tr>
                 </thead>
                 <tbody>
                
                     {
                        users && users?.map(user=> {
                             return(
                                 <tr className="grid grid-cols-12 gap-3 even:bg-gray-500/10 odd:bg-transparent p-1">
                                 <td className="col-span-4  ps-3 break-words">{user._id}</td>
                                 <td className="col-span-2 ">{user.name}</td>
                                 <td className="col-span-2 break-words text-left">{user.email}</td>
                                 <td className="col-span-2  text-right pe-3">user</td>
                                 <td className="col-span-2  text-right pe-3 "> <span onClick={()=> deleteUser(user._id)} className='px-1 cursor-pointer text-red-100 bg-red-500/80 rounded-md'>delete</span></td>
                             </tr>
 
                             )
                         })
                     }
              
                   
                 
                   
 
                 </tbody>
             </table>
             <div className='border-4  h-24 w-full mt-4 flex items-center p-4 text-xs sm:text-sm font-semibold   text-right'>
   <span>Page no: </span>
   {
     arrNumb?.map(num => <span onClick={()=> setPageNo(num)} className={`${pageNo===num ? "text-orange-700": "text-gray-800"} hover:text-orange-500/80 cursor-pointer p-3`} >{num}</span>)
   }
 </div>
         </div>
  )
}

export default AllUsers
