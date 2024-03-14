import videoBG from '../assets/videos/video (1080p) (1).mp4'
import imgBG1 from '../assets/imgs/man-3672010_1280.jpg'
import imgBG2 from '../assets/imgs/new.jpg'
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'

const Home = () => {
    return ( 
        <>
        <div className=" h-full w-full">

            {/* Hero */}
            
        <div className=" h-[100vh] items-center flex justify-center rounded-md mx-2 my-2">
        <video src={videoBG} autoPlay loop muted className='w-full h-full object-cover rounded-md'></video>
            {/* <div className='overlay'></div> */}
            <div className="absolute overal flex gap-3  rounded-md items-center justify-center flex-col text-white">
                <div className="text flex flex-col gap-2 items-center">
                    <h1 className="md:text-[60px] text-[30px] font-extrabold text-center max-w-[800px]">Extraordinarily natural and cultural charm</h1>
                    <p>Exploring Kenya is unforgettable adventure</p>
                </div>
                <div className="flex gap-3 justify-center items-center rounded-3xl py-2 px-4 glass">
                <h2>Date</h2>
                <h2>Budget</h2>
                <h2>Guest</h2>
            <Button>Search</Button>
                </div>
            </div>         
        </div>
        <div className="small-cards grid md:grid md:grid-cols-2 md:mx-10 lg:flex items-center justify-center gap-5 z-20 -mt-[50px]">
        <div className="div rounded-md shadow-lg px-20 py-4 bg-white items-center justify-center flex flex-col">
                <h1 className="font-extrabold text-3xl">10M+</h1>
                <p className="text-gray-600">Total Customers</p>
            </div>
            <div className="div rounded-md shadow-lg px-20 py-4 bg-white items-center justify-center flex flex-col">
                <h1 className="font-extrabold text-3xl">10M+</h1>
                <p className="text-gray-600">Total Customers</p>
            </div>
            <div className="div rounded-md shadow-lg px-20 py-4 bg-white items-center justify-center flex flex-col">
                <h1 className="font-extrabold text-3xl">10M+</h1>
                <p className="text-gray-600">Total Customers</p>
            </div>
            <div className="div rounded-md shadow-lg px-20 py-4 bg-white items-center justify-center flex flex-col">
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
                        <h1 className="text-[40px] ">Indonesian tourism</h1>
                        <p className="flex-grow  md:pt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quod harum vite.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quod harum vite
                        </p>
                    </div>
                </div>
            </div>

{/* section 2 */}
<div className=" mt-20">
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className='col-span-2'>
            <img className="h-auto max-w-full rounded-lg" src={imgBG1} alt=""/>
        </div>
        <div className='col-span-1'>
            <img className="h-full max-w-full rounded-lg bg-cover bg-center" src={imgBG2} alt=""/>
        </div>
        
    </div>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-5">
        <div className='col-span-1'>
            <img className="h-full max-w-full rounded-lg bg-cover bg-center" src={imgBG2} alt=""/>
        </div>
        <div className='col-span-2'>
            <img className="h-auto max-w-full rounded-lg" src={imgBG1} alt=""/>
        </div>
        
    </div>
</div>

{/* section 3 */}
        <div className=''>
            <div className='grid gap-8 grid-cols-1 lg:grid-cols-2 mt-28'>
                <div className=' rounded-xl relative'>
                    <img className="h-full max-w-full rounded-lg bg-cover bg-center" src={imgBG2} alt="" />
                     <div className='absolute bottom-0 text-white'>
                     <h1>part1</h1>
                     <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In quo asperiores fugit nam laborum hic vitae non quasi eos.</p>
                     </div>
                </div>
                <div className='flex items-start flex-col gap-12'>
                    <div className="header">
                        <p>Hello bitches</p>
                        <h1 className='text-[40px] font-bold'>One click for you</h1>
                    </div>
                    <div className="small-cards flex flex-col gap-6">
                    <div className='grid grid-cols-6 rounded-md shadow-md bg-white'>
                            <div className='col-span-1'>
                                <h1>CL</h1>
                            </div>
                            <div className='flex flex-col justify-center items-start gap-3 col-span-5 '>
                                <h1>Find your destination</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                            
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-1'>
                                <h1>CL</h1>
                            </div>
                            <div className='flex flex-col justify-center items-start gap-3 col-span-5'>
                                <h1>Find your destination</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                            
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-1'>
                                <h1>CL</h1>
                            </div>
                            <div className='flex flex-col justify-center items-start gap-3 col-span-5'>
                                <h1>Find your destination</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                            
                        </div>
                        <div className='grid grid-cols-6'>
                            <div className='col-span-1'>
                                <h1>CL</h1>
                            </div>
                            <div className='flex flex-col justify-center items-start gap-3 col-span-5'>
                                <h1>Find your destination</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        {/* Part3 */}
        <div className=' mt-28'>
            <div className="overal grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
                <Card  className="flex flex-col justify-between shadow-lg">
                        <CardHeader className="flex-row gap-4 items-center">
                        <div>
                            <CardTitle>The War</CardTitle>
                            <CardDescription>10 mins to cook.</CardDescription>
                        </div>
                        </CardHeader>
                        <CardContent>
                            <img src={imgBG2} className='rounded-md' alt="" />
                        <p className='mt-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur asperiores maxime quas soluta quo sunt cupiditate debitis vel aspernatur quasi exercitationem, ipsa alias, veniam fugit fuga laboriosam a deserunt tempora?</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                        <Button>View</Button>
                        </CardFooter>
                </Card>
                 <Card  className="flex flex-col justify-between shadow-lg">
                        <CardHeader className="flex-row gap-4 items-center">
                        <div>
                            <CardTitle>The War</CardTitle>
                            <CardDescription>10 mins to cook.</CardDescription>
                        </div>
                        </CardHeader>
                        <CardContent>
                            <img src={imgBG2} className='rounded-md' alt="" />
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur asperiores maxime quas soluta quo sunt cupiditate debitis vel aspernatur quasi exercitationem, ipsa alias, veniam fugit fuga laboriosam a deserunt tempora?</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                        <Button>View</Button>
                        </CardFooter>
                </Card>
                 <Card  className="flex flex-col justify-between shadow-lg">
                        <CardHeader className="flex-row gap-4 items-center">
                        <div>
                            <CardTitle>The War</CardTitle>
                            <CardDescription>10 mins to cook.</CardDescription>
                        </div>
                        </CardHeader>
                        <CardContent>
                            <img src={imgBG2} className='rounded-md' alt="" />
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur asperiores maxime quas soluta quo sunt cupiditate debitis vel aspernatur quasi exercitationem, ipsa alias, veniam fugit fuga laboriosam a deserunt tempora?</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                        <Button>View</Button>
                        </CardFooter>
                </Card>
            </div>
        </div>
        </div>
        </div>
        
        </>
     );
}
 
export default Home;