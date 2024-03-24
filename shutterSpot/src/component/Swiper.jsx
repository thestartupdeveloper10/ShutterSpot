import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import slide_image_1 from '../assets/imgs/front-man.jpg';
import salmon from '../assets/imgs/salmon.jpg';
import wedding from '../assets/imgs/wedding.jpg';
import slide_image_2 from '../assets/imgs/man-3672010_1280.jpg';
import slide_image_3 from '../assets/imgs/hero-imge.jpg';
import slide_image_4 from '../assets/imgs/fashion-6066661_1280.jpg';
import slide_image_5 from '../assets/imgs/shoot.jpg';
import slide_image_6 from '../assets/imgs/iphone.jpg';
import slide_image_7 from '../assets/imgs/hero-model.jpg';
import { Button } from '@/components/ui/button';

const SwiperCarousal = () => {
  const detail_link = '/photographer'
    return ( 
        <div className="container">
      <h1 className="heading">Top Photographers</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        
        <SwiperSlide className='rounded-md'>
         
          
          <div className="overal  flex flex-col h-full bg-white">

<div className="images grid grid-cols-3 gap-1">
       <div className='col-span-2'>
           <img src={slide_image_1} className='md:h-[300px]  h-[250px] w-full object-cover' alt="slide_image" />
       </div>
   <div className="minor flex flex-col gap-1">
       <div className='w-full h-full'>
         <div className='w-full h-full'>
             <img src={salmon} className='h-full object-cover' alt="slide_image" />
         </div>
       </div>
       <div className='w-full h-full'>
        <div className='w-full h-full'>
             <img src={wedding} className='h-full object-cover' alt="slide_image" />
       </div>
       </div>
   </div>
 </div>

 <div className="name px-6 bg-white flex flex-col gap-5">
   <div className='h-24 w-24 rounded-full overflow-hidden -mt-10 border-4 border-spacing-2 border-white'>
   <img src={slide_image_1} className=' object-cover' alt="slide_image" />
   </div>
   <div className="flex flex-col">
   <div className='flex justify-between'>
 <div className="name flex flex-col gap-5">
 <h1 className='text-[20px]'>Cliffe Ibande</h1>
 <p className='text-[15px] pb-5'>Newyork</p>
 </div>
 <div className="name flex flex-col gap-5">
 <h1 className='text-[20px]'>$124</h1>
 <p className='text-[15px] pb-5'>5**</p>
 </div>
 </div>
 <div className="name flex items-center justify-center bg-blue-700">
 <Link to={detail_link}>
 < Button>View Details</Button>
 </Link>
 </div>
   </div>

 </div>
   </div>
         
         
          
          
          
        </SwiperSlide>
        
        <SwiperSlide>
          <img src={slide_image_2} className='pic' alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_3} className='pic' alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_4} className='pic' alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_5} className='pic' alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_6} className='pic' alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_7} className='pic' alt="slide_image" />
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
     );
}
 
export default SwiperCarousal;