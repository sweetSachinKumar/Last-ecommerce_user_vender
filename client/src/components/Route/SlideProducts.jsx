import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ProductCard from './ProductCard'


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background:"#d1d0f738",borderRadius:" 44px 0px 0px 44px ",height:"80%",objectFit:"cover", display:"flex", justifyContent: "center", alignItems: "center"}}
      onClick={onClick}
    />
  );
}


function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background:"#d1d0f738",borderRadius:"0px 44px 44px 0px",height:"80%",objectFit:"cover", display:"flex", justifyContent: "center", alignItems: "center"}}
      onClick={onClick}
    />
  );
}



const SlideProducts = ({categoryProduct, title}) => {

  const arr = [1,3,4,5,6,7,8,8,4,3]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    initialSlide: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        
        }
      },
      {
        breakpoint: 832,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots:false
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots:false
        }
      }
    ]
  }


  return (
    <div className='mb-16 container mx-auto max-w-[1440px] '>
      {
        categoryProduct && (
<div>
        <h2 className='lg:text-3xl text-2xl font-bold text-neutral-700 ms-3 mb-2 lg:mb-5'>{title}</h2>

        <div className="mySlider">
          <Slider {...settings}>
            {
              categoryProduct.map(product => <ProductCard product={product} key={product?._id} /> )
            }
          </Slider>
        </div>
      </div>
        )
      }
      

    </div>
  )
}

export default SlideProducts
