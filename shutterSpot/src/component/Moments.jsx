import dog from '../assets/imgs/dog.jpg'
import kid from '../assets/imgs/kid.jpg'
import couple from '../assets/imgs/couple-wedding.jpg'
import family from '../assets/imgs/family.jpg'
import man from '../assets/imgs/man-potraite.jpg'
import bike from '../assets/imgs/bike.jpg'


const Capture = () => {
    return ( 
        <div className=''>
            <div className='grid gap-8 grid-cols-1 lg:grid-cols-3 mt-28'>
                <div className=' rounded-xl flex flex-col col-span-2 gap-3'>
                    <div className='grid grid-cols-3 gap-3'>
                        <div>
                        <img src={family} className=' object-cover h-full' alt="slide_image" />
                        </div>
                        <div className=''>
                        <img src={man} className=' object-cover' alt="slide_image" /> 
                        </div>
                        <div>
                        <img src={bike} className=' object-cover' alt="slide_image" /> 
                        </div>
                    </div>
                    <div className='grid grid-cols-7 gap-3'>
                         <div className='col-span-3'>
                         <img src={dog} className=' object-cover' alt="slide_image" />
                         </div>
                        <div className='col-span-2'>
                        <img src={kid} className=' object-cover h-full' alt="slide_image" />
                        </div>
                        <div className='col-span-2'>
                        <img src={couple} className=' object-cover h-full' alt="slide_image" />
                        </div>
                    </div>
                </div>
                <div className='flex items-start flex-col gap-12'>
                    <div className="header">
                        <p>Hello bitches</p>
                        <h1 className='text-[40px] font-bold'>One click for you</h1>
                    </div>
                    <div className="small-cards flex flex-col justify-between gap-6">
                    <div className='grid grid-cols-6 rounded-md shadow-md bg-white'>
                            <div className='col-span-1 flex justify-center items-center'>
                                <h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><circle cx="8.5" cy="10.5" r="1.5"></circle><circle cx="15.493" cy="10.493" r="1.493"></circle><path d="M12 18c4 0 5-4 5-4H7s1 4 5 4z"></path></svg>
                                </h1>
                            </div>
                            <div className='flex flex-col justify-center items-start gap-3 col-span-5 '>
                                <h1>Hand pick your top notch photographer</h1>
                                <p>Find the best photographers in your area, who fit in your price, time and location.
                                </p>
                            </div>
                            
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-1'>
                                <h1>CL</h1>
                            </div>
                            <div className='flex flex-col justify-center items-start gap-3 col-span-5'>
                                <h1>Instant booking & rapid delivery</h1>
                                <p>Book a photoshoot in a couple of clicks and get your photos in a few days.
                                </p>
                            </div>
                            
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-1'>
                                <h1>CL</h1>
                            </div>
                            <div className='flex flex-col justify-center items-start gap-3 col-span-5'>
                                <h1>Vetted photographers</h1>
                                <p>All photographers are carefully reviewed and approved by experts to ensure a great experience.
                                </p>
                            </div>
                            
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-1'>
                                <h1>CL</h1>
                            </div>
                            <div className='flex flex-col justify-center items-start gap-3 col-span-5'>
                                <h1>Satisfaction guaranteed</h1>
                                <p>Or we will make it right and refund your money.
                                </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
               
            </div>
            
        </div>
     );
}
 
export default Capture;