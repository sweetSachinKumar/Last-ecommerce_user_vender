import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import { IoMdCart, IoMdClose, IoMdMenu } from 'react-icons/io'
import { BsPersonFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Navbar = () => {
  
  const {cart} = useSelector(state => state.cart)

  // const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
 const {user} = useSelector(state => state.user)

  const navItem = [
    { item: "Home", togo: "/" },
    { item: "Products", togo: "/products" },
    { item: "Contact Us", togo: "/contact" },
    { item: "FAQ", togo: "/faq" },
  
  ]
  const checkUser =  useSelector(state => state.user.isAuthenticated)



  return (
    <>
           <div className='z-30 shadow shadow-neutral-800/10 transition-shadow sticky left-0 right-0 top-0 bg-neutral-100/80 w-full'>
        <div className='  container mx-auto px-4 py-2  items-center justify-between  hidden lg:flex '>
          {/* logo  */}
          <div className='xl:text-4xl lg:text-2xl text-xl text-orange-600/90 font-semibold ' >
            Sachin's <small>store</small>
          </div>

          <nav>
            <ul className='flex xl:gap-9 lg:gap-6 gap-4 text-base xl:text-lg  '>
              {
                navItem?.map(item => <li key={item.togo}> <Link to={item.togo} className={`${location.pathname === item.togo ? "text-orange-700" : "text-neutral-800 "}   hover:text-neutral-950 active:text-gray-600`} >{item.item}</Link> </li>)
              }
              <li>
               
              </li>

            </ul>
          </nav>
          {/* link  */}
          <div className='flex lg:gap-3 gap-2'>
          

            <Link to="/gotocart" className=' hover:text-neutral-700/80  transition active:text-neutral-950/70 text-neutral-800  px-4 py-1 rounded-md relative' >

              <IoMdCart size={30} />
              {(cart && checkUser) && <span className='text-neutral-100 font-bold font-mono bg-orange-600/80  px-2 text-base rounded-xl absolute z-40 -bottom-1 right-2'>{cart?.length}</span>}

            </Link>

            {
              !checkUser ?

                <>

                  <Link to="/signup" className='border-2 border-transparent bg-neutral-800 text-neutral-100  px-8 py-1 rounded-md  hover:bg-neutral-900/80 transition hover:border-neutral-900'>sing in</Link>

                  <Link to="/login" className='border-2 border-transparent bg-neutral-800 text-neutral-100  px-8 py-1 rounded-md  hover:bg-neutral-900/80 transition hover:border-neutral-900'>log in</Link>
                </>
                :
                <>
                  <Link to="/profile" className=' hover:text-neutral-700/80  transition active:text-neutral-950/70 text-neutral-800  text-xl px-6 py-1 rounded-md ' >

                    <BsPersonFill size={30} />

                  </Link>
                 
                </>
            }
            {(user && user.role === "Admin") &&
<Link to="/admin/dashboard" className='border-2 border-transparent bg-neutral-800 text-neutral-100  px-8 py-1 rounded-md  hover:bg-neutral-900/80 transition hover:border-neutral-900'> Admin Dashboard</Link>
}
          </div>
        </div>
      </div>


      {/* mobiles  */}
      <div className='z-30 shadow shadow-neutral-800/10 transition-shadow sticky left-0 right-0 top-0 bg-neutral-100/90 w-full '>
        <div className=' p-2  mx-auto   lg:hidden block'>
          {/* logo  */}
          <div className='flex justify-between items-center '>
            <Link to="/" className='text-xl   sm:text-2xl  text-orange-600/90 font-semibold'>
            Sachin's <small>store</small>
            </Link>
            <div className='flex items-center gap-2'>
              <Link to="/gotocart" className=' hover:text-neutral-700/80  transition active:text-neutral-950/70 text-neutral-800  text-xl  rounded-md relative' >

                <IoMdCart size={25} />
                {(cart && checkUser) && <span className='text-neutral-100 font-bold font-mono text-sm bg-orange-600/90  px-2 rounded-xl absolute z-40 -bottom-1 right-3'>{cart?.length}</span>}

              </Link>
              <div onClick={() => setIsOpen(!isOpen)} className='text-2xl  z-10 px-2 cursor-pointer transition'>
                {isOpen ? <IoMdClose /> : <IoMdMenu />}
              </div>

            </div>
          </div>

          <nav className={` px-2 transition-all duration-300 absolute top-[3rem] ${isOpen ? "left-0 translate-x-0 translate-y-0" : "scale-50 left-full translate-x-24 translate-y-16"} w-full  origin-bottom-right h-[300px] z-40 bg-neutral-100/95 transform   `}>
            <ul className='flex gap-3 flex-col my-8'>
              {/* <ul className='flex xl:gap-9 lg:gap-6 gap-4 text-xl lg:text-2xl  '> */}
              {
                navItem.map(item => <li key={item.togo}> <Link onClick={() => setIsOpen(false)} to={item.togo} className={`${location.pathname === item.togo ? "text-orange-700 " : "text-neutral-800 "}  hover:text-neutral-950 active:text-gray-600 text-sm sm:test-base`} >{item.item}</Link> </li>)
              }

            </ul>

            {/* link  */}
            <div className='flex flex-wrap gap-2'>
              {!checkUser ?
                <>
                  <Link onClick={() => setIsOpen(false)} to="signup" className='border-2 border-transparent bg-neutral-800 text-neutral-100 sm:text-sm px-8 py-1 rounded-md  hover:bg-neutral-900/80 transition hover:border-neutral-900 text-sm'>sing in</Link>
                  <Link to="/login" onClick={() => setIsOpen(false)} className='border-2 border-transparent bg-neutral-800 text-neutral-100 text-sm sm:text-sm px-8 py-1 rounded-md  hover:bg-neutral-900/80 transition hover:border-neutral-900'>log in</Link>
                </> :
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className='bg-neutral-800 text-neutral-100 text-sm px-6 py-1 rounded-md  hover:bg-neutral-900/90 active:bg-neutral-900/80 transition hover:border-neutral-900' >
                    Account
                  </Link>
                  
                </>

              }
       {(user && user.role === "Admin") &&          <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className='bg-neutral-800 text-neutral-100 text-sm px-6 py-1 rounded-md  hover:bg-neutral-900/90 active:bg-neutral-900/80 transition hover:border-neutral-900' >
                 Admin Dashboard
                  </Link>
}
            </div>

          </nav>
          {isOpen && <div onClick={() => setIsOpen(false)} className='fixed top-0 left-0 w-full h-full bg-slate-800/20 transition-all duration-300 ease-in-out'></div>}
        </div>
      </div> 
    </>
  )
}

export default Navbar
