// import videoBG from '../assets/videos/video (1080p) (1).mp4'

import heroImg from '../../assets/imgs/hero/hero-imge.jpg'
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Footer from '../../component/Footer';
import Instructions from '../../component/Instructions';
import PhotographerCarousel from '../../component/Swiper';
import Capture from '../../component/Moments';
import Services from '../../component/Services';
import NavBar from '../../component/NavBar';
import InfoCardGrid from './InfoCard';



const Home = () => {


   
    return ( 
        <>
        <div className="mt-20 md:mt-12">
                <NavBar/>
        <div>    
        <div className="h-[70dvh] md:h-[70dvh] lg:h-screen items-center flex justify-center rounded-md my-2 relative ">
            <img src='https://cdn.pixabay.com/photo/2022/05/22/16/34/woman-7213852_960_720.jpg' className='bg-cover h-full w-full object-cover bg-right' alt="" />
            <div className="absolute md:left-10  lg:left-[155px] left-10 overal flex gap-10 md:gap-3 md:w-[500px] w-[300px]  rounded-md items-start justify-center flex-col text-white">
                <div className="text flex flex-col md:gap-2 gap-6 items-center">
                    <h1 className="md:text-[50px] text-[30px] font-extrabold text-start max-w-[800px]">Extraordinarily natural and cultural charm</h1>
                    <p className='text-start text-[12px] md:text-[15px] text-[#fbe4d8]'>The most efficient way to book photographers for business and company photo shoots, individual portraits, vacation photographers, and more.</p>
                </div>
                <div className="flex flex-col md:ml-0 md:flex-row gap-3 justify-center items-center rounded-3xl py-2 px-4 glass">
                <Link to="/book">             
                <Button variant="secondary" className="md:px-10">QUICK BOOKING</Button>
                </Link>
                <Link to="/all_photographers">
                <Button variant="secondary" className="md:px-10">SCHEDULE SHOOT</Button>
                </Link>
                </div>
            </div>         
        </div>
        <InfoCardGrid/>
        {/* page2 */}
        <div className=" md:mx-24 mx-5 mt-20">
            

{/* section 2 */}
<Services />

<Instructions />
< PhotographerCarousel />
{/* section 3 */}
<Capture />



      
</div>
</div>
<Footer/>
</div>
        
        </>
     );
}
 
export default Home;