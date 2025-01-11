import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import { Autoplay, Pagination} from 'swiper/modules';

interface SliderProps {
    data: any;
  }
  
const ImageSlider: React.FC<SliderProps> = ({ data }) => {
  
    return(
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            slidesPerView={1}
            loop={true}
            pagination={{
                dynamicBullets: true,
              }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
          className="mySwiper">
            {data?.map((image: any)=>(<SwiperSlide>
              <img className='mb-4 w-full h-[20vh] lg:h-[30vh] center rounded-lg object-cover' src={image?.src} alt={image?.alt}/>
            </SwiperSlide>))}
        </Swiper>
    )
}

export default ImageSlider;