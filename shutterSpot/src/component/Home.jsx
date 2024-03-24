// import videoBG from '../assets/videos/video (1080p) (1).mp4'

import heroImg from '../assets/imgs/hero-imge.jpg'
import { Button,buttonVariants } from "@/components/ui/button";





import Footer from './Footer';
import Instructions from './Instructions';
import SwiperCarousal from './Swiper';
import Capture from './Moments';
import Services from './Services';
import ShuffleHero from './ShuffleImg';

const Home = () => {
   
    return ( 
        <>
        <div className=" h-full w-full mb-10 mt-28 md:mt-12">

            {/* Hero */}
            
        <div className=" h-[60dvh] md:h-[70dvh] lg:h-[100dvh] items-center flex justify-center rounded-md mx-2 my-2 relative ">
        {/* <video src={videoBG} autoPlay loop muted className='w-full h-full object-cover rounded-md'></video> */}
            <img src={heroImg} className='bg-cover h-full w-full object-cover bg-right' alt="" />
            {/* <div className='overlay'></div> */}
            <div className="absolute md:left-10  lg:left-[155px] left-10 overal flex gap-10 md:gap-3 md:w-[500px] w-[300px]  rounded-md items-start justify-center flex-col text-white">
                <div className="text flex flex-col md:gap-2 gap-6 items-center">
                    <h1 className="md:text-[50px] text-[30px] font-extrabold text-start max-w-[800px]">Extraordinarily natural and cultural charm</h1>
                    <p className='text-start text-[15px] text-[#fbe4d8]'>The most efficient way to book photographers for business and company photo shoots, individual portraits, vacation photographers, and more.</p>
                </div>
                <div className="flex flex-col md:ml-0 md:flex-row gap-3 justify-center items-center rounded-3xl py-2 px-4 glass">
                <Button variant="secondary" className="px-10">QUICK BOOKING</Button>
                <Button variant="secondary" className="px-10">SELECT LOCATION</Button>
                </div>
            </div>         
        </div>
        <div className="small-cards grid md:grid md:grid-cols-2 md:mx-10 lg:flex items-center justify-center gap-5 z-20 -mt-[50px] relative">
        <div className="div px-28 py-8  rounded-md shadow-lg  bg-white items-center justify-center flex flex-col">
                <h1 className="font-extrabold text-3xl">10M+</h1>
                <p className="text-gray-600">Total Customers</p>
            </div>
            <div className="div py-8 rounded-md shadow-lg px-28  bg-white items-center justify-center flex flex-col">
                <h1 className="font-extrabold text-3xl">10M+</h1>
                <p className="text-gray-600">Total Customers</p>
            </div>
            <div className="div py-8 rounded-md shadow-lg px-28  bg-white items-center justify-center flex flex-col">
                <h1 className="font-extrabold text-3xl">10M+</h1>
                <p className="text-gray-600">Total Customers</p>
            </div>
            <div className="div py-8 rounded-md shadow-lg px-28  bg-white items-center justify-center flex flex-col">
                <h1 className="font-extrabold text-3xl">10M+</h1>
                <p className="text-gray-600">Total Customers</p>
            </div>
        </div>
        {/* page2 */}
        <div className=" md:mx-24 mx-5 mt-20">
            <div className="intro flex flex-col gap-5">
                <p>Best Location</p>
                <div>
                    <div className=" flex-col md:flex md:flex-row md:gap-10 gap-5 justify-between items-start">
                        <h2 className=" font-bold ">ShutterSpot: Your Instant Photography Connection</h2>
                        <p className="flex-grow  md:pt-1">ShutterSpot: Your Instant Photography Connection. Discover and book talented photographers nearby in real-time. Whether it is outdoor landscapes, picnics, weddings, or more, SnapSync matches you with the perfect photographer at the touch of a button. Embrace spontaneity and bring your vision to life effortlessly.
                        </p>
                    </div>
                </div>
            </div>

{/* section 2 */}
<Services />
<Instructions />
{/* section 3 */}
        <Capture />
         {/* swiper */}
         <div className='w-full'>
        < SwiperCarousal />
                </div>
        <div className="w-full bg-[#fffff0]">
        <ShuffleHero/>
        </div>
        </div>
        </div>
        <Footer/>
        </>
     );
}
 
export default Home;