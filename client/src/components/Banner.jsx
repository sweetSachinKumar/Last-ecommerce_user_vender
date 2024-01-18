import bannerImg from "../assets/image1.png"
const Banner = () => {

  return (
    <div className="xl:h-[600px] md:h-[550px] h-[400px] w-full " style={{ background: " radial-gradient(#FFCCBC, #ff704391)" }}>
      <div className="w-[95%] mx-auto px-2 flex items-center justify-center h-full ">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl lg:6xl font-bold mb-5">Give your Workout <br /> A New Stryle?</h2>
          <p className="w-[80%] lg:my-5 text-xs font-[Arial] sm:text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam necessitatibus nobis similiquer.</p>
          <button className=" bg-orange-600 hover:bg-orange-600/90 active:bg-orange-700/55 text-white mt-3 rounded-full text-sm md:text-base group w-44 h-10 flex items-center justify-center gap-2 group ">Explore Now <span className="text-[24px] group-hover:ms-1 duration-200 ">&rarr;</span></button>
        </div>
        <div className="hidden flex-1 lg:flex items-center justify-center">
          <img src={bannerImg} className="max-w-[400px] lg:max-w-[500px]  bg-cover w-full h-full" alt="img" />
        </div>
      </div>
    </div>
  )
}

export default Banner
