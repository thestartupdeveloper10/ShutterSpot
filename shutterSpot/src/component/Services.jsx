import imgBG1 from '../assets/imgs/couple-landscape.jpg'
import strawbberry from '../assets/imgs/strawberry.jpg'
import wedding from '../assets/imgs/wedding.jpg'
import female from '../assets/imgs/beautiful-2637484_1280.jpg'
import workout from '../assets/imgs/man-gym.jpg'
import studio from '../assets/imgs/fashion-6066661_1280.jpg'
const Services = () => {
    return ( 
        <div className=" mt-20">
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className='col-span-2 relative'>
            <img className=" max-w-full rounded-lg" src={imgBG1} alt=""/>
            <div className="details absolute bottom-2 px-1 mx-2 lg:bottom-28 lg:w-[500px] lg:left-20 text-white glass md:px-4 md:py-4">
                <h1 className='text-[25px] lg:text-[40px] '>Natures Canvas</h1>
                <p className='py-1'> From majestic mountains to serene lakes, 
                explore the wonders of nature captured through the lens of talented photographers</p>
            </div>
        </div>
        <div className='col-span-1 flex flex-col gap-4 h-full justify-between '>
            <div className='relative'>
            <img className="h-full max-w-full rounded-lg bg-cover bg-center" src={studio} alt=""/>
            <div className="details absolute md:bottom-3 bottom-2 w-[360px] md:w-auto lg:w-[380px] md:left-3 p-2 left-2 text-white ">
                <h1 className='text-[25px] lg:text-[40px]  '>Studio Shoot</h1>
                <p className='md:hidden lg:block'>
                Indulge in the refined elegance and sophistication of our professional studio shoots, where every image is crafted with meticulous precision.
                </p>
            </div>
            </div>
            <div className='relative'>
            <img className="h-full max-w-full rounded-lg bg-cover bg-center" src={workout} alt=""/>
            <div className="details absolute md:bottom-3 bottom-2 w-[360px] md:w-auto lg:w-[380px] md:left-3 p-2 left-2 text-white ">
                <h1 className='text-[25px] lg:text-[40px]  '>Fit & Fabulous</h1>
                <p className='md:hidden lg:block'>
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
                <h1 className='text-[25px] lg:text-[40px]  '>Urban shoots</h1>
                <p className='md:hidden lg:block'>
                Experience the vibrant tapestry of city life through the candid lens of street photography, capturing the essence of urban culture and diversity.
                </p>
            </div>
            </div>
            <div className='relative'>
            <img className="h-full max-w-full rounded-lg bg-cover bg-center" src={strawbberry} alt=""/>
            <div className="details absolute md:bottom-3 bottom-2 w-[360px] md:w-auto lg:w-[380px] md:left-3 p-2 left-2 text-white ">
                <h1 className='text-[25px] lg:text-[40px]  '>Food Gallery</h1>
                <p className='md:hidden lg:block'>
                Savor the artistry and flavors of culinary delights showcased in our gourmet gallery of mouthwatering food photography.
                </p>
            </div>
            </div>
        </div>
        <div className='col-span-2 h-full relative'>
            <img className="h-auto max-w-full rounded-lg" src={wedding} alt=""/>
            <div className="details absolute bottom-2 px-1 mx-2 lg:bottom-28 lg:w-[500px] lg:left-20 text-white glass md:px-4 md:py-4">
                <h1 className='text-[25px] lg:text-[40px]  '>Love in Focus</h1>
                <p className='py-1'> Immerse yourself in the timeless romance and heartfelt moments of weddings, beautifully preserved in each captivating photograph.</p>
            </div>
        </div>
        
    </div>
</div>
     );
}
 
export default Services;