import imgBG1 from '../assets/imgs/couples/couple-landscape.jpg'
import strawbberry from '../assets/imgs/food/hamburger-1238246_1280.jpg'
import wedding from '../assets/imgs/wedding/bride-1255520_1280.jpg'
import female from '../assets/imgs/streets/nike-5126389_1280.jpg'
import workout from '../assets/imgs/Mmodels/man-gym.jpg'
import studio from '../assets/imgs/Fmodels/fashion-6066661_1280.jpg'
const Services = () => {
    return ( 
        <div className=" mt-20">
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className='col-span-2 relative'>
            <img className=" max-w-full rounded-lg" src={imgBG1} alt=""/>
            <div className="details absolute bottom-2 px-1 mx-2 lg:bottom-28 lg:w-[500px] lg:left-20 text-white glass md:px-4 md:py-4">
                <h2 className='text-[20px] lg:text-[30px] font-bold '>Natures Canvas</h2>
                <p className='py-1 text-[#fbe4d8]'> From majestic mountains to serene lakes, 
                explore the wonders of nature captured through the lens of talented photographers</p>
            </div>
        </div>
        <div className='col-span-1 flex flex-col gap-4 h-full justify-between '>
            <div className='relative'>
            <img className="h-full max-w-full rounded-lg bg-cover bg-center" src={studio} alt=""/>
            <div className="details absolute md:bottom-3 bottom-2 w-[360px] md:w-auto lg:w-[380px] md:left-3 p-2 left-2 text-white ">
                <h2 className='text-[20px] lg:text-[30px] font-bold '>Studio Shoot</h2>
                <p className='md:hidden lg:block text-[#fcf9f7]'>
                Indulge in the refined elegance and sophistication of our professional studio shoots, where every image is crafted with meticulous precision.
                </p>
            </div>
            </div>
            <div className='relative'>
            <img className="h-full max-w-full rounded-lg bg-cover bg-center" src={workout} alt=""/>
            <div className="details absolute md:bottom-3 bottom-2 w-[360px] md:w-auto lg:w-[380px] md:left-3 p-2 left-2 text-white ">
                <h1 className='text-[20px] lg:text-[30px] font-bold  '>Fit & Fabulous</h1>
                <p className='md:hidden lg:block text-[#fcf9f7]'>
                Ignite your passion for fitness and wellness with our inspiring collection of workout motivation, designed to empower and energize.
                </p>
            </div>
            </div>
        </div>
        
    </div>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-5">
    <div className='col-span-1 flex flex-col gap-4 justify-between'>
            <div className='relative'>
            <img className="h-full w-full md:max-w-full rounded-lg bg-cover bg-center" src={female} alt=""/>
            <div className="details absolute md:bottom-3 bottom-2 w-[360px] md:w-auto lg:w-[380px] md:left-3 p-2 left-2 text-white ">
                <h1 className='text-[20px] lg:text-[30px] font-bold  '>Urban shoots</h1>
                <p className='md:hidden lg:block text-[#fcf9f7]'>
                Experience the vibrant tapestry of city life through the candid lens of street photography, capturing the essence of urban culture and diversity.
                </p>
            </div>
            </div>
            <div className='relative'>
            <img className="h-full max-w-full rounded-lg bg-cover bg-center" src={strawbberry} alt=""/>
            <div className="details absolute md:bottom-3 bottom-2 w-[360px] md:w-auto lg:w-[380px] md:left-3 p-2 left-2 text-white ">
                <h1 className='text-[20px] lg:text-[30px] font-bold  '>Food Gallery</h1>
                <p className='md:hidden lg:block text-[#fcf9f7]'>
                Savor the artistry and flavors of culinary delights showcased in our gourmet gallery of mouthwatering food photography.
                </p>
            </div>
            </div>
        </div>
        <div className='col-span-2 h-full relative'>
            <img className="h-auto max-w-full rounded-lg" src={wedding} alt=""/>
            <div className="details absolute bottom-2 px-1 mx-2 lg:bottom-28 lg:w-[500px] lg:left-20 text-white glass md:px-4 md:py-4">
                <h1 className='text-[20px] lg:text-[30px] font-bold  '>Love in Focus</h1>
                <p className='py-1 text-[#fbe4d8]'> Immerse yourself in the timeless romance and heartfelt moments of weddings, beautifully preserved in each captivating photograph.</p>
            </div>
        </div>
        
    </div>
</div>
     );
}
 
export default Services;