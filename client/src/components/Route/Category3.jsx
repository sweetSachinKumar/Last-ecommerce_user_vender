import React from 'react'
import cate1 from "../../assets/gallery-1.jpg"
import cate2 from "../../assets/category-3.jpg"
import cate3 from "../../assets/exclusive.png"

const Category3 = () => {
    const categoryArr = [
        {catImg: cate1, text: "For mans"},
        {catImg: cate2, text: "For womans"},
        {catImg: cate3, text: "Technology"},
    ]
    return (
        <div className='lg:max-w-[1250px] mx-auto w-[95%] my-12 '>
            <div className='flex gap-x-5 gap-y-7 justify-center items-center flex-col flex-wrap sm:flex-row'>
        {
            categoryArr.map(item=> {
                return (
<div key={item.text} className="max-w-[280px] border-gray-800 shadow relative group ">
                    <div className="h-[330px] w-full max-w-[270px]">
                        <img src={item.catImg} className="h-full rounded-t-lg object-cover bg-slate-200" alt="" />
                    </div>

                    <div className="mt-5 absolute bottom-0 left-0 w-full">
                        <h1 className=' text-2xl text-center  font-semibold font-[Arial] px-3 py-2 bg-orange-300 text-neutral-800/90'>{item.text}</h1>

                    </div>
                </div>
                )
            })
        }
                {/* card */}
                
             
            </div>
        </div>
    )
}

export default Category3
