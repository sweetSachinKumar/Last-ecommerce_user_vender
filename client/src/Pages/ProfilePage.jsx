import React, {useState} from 'react'
import Navbar from "../components/Layouts/Navbar"
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ProfileContent from '../components/profile/ProfileContent'

const ProfilePage = () => {
    const [active, setActive] = useState(1)

  return (
    <div>
      <Navbar/>
      <div className={`w-11/12 mx-auto flex bg-[#f5f5f5] py-10 `}>
        <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%] ">
            <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent  active={active} />
      </div>
    </div>
  )
}

export default ProfilePage
