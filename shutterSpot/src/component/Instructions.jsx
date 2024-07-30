import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardTitle 
  } from '@/components/ui/card'
  import imgBG2 from '../assets/imgs/others/new.jpg'
  import iphoneImg from '../assets/imgs/others/iphone.jpg'
  import shootImg from '../assets/imgs/streets/shoot.jpg'
  import photoeditImg from '../assets/imgs/others/photo-editing.jpg'
  import frameImg from '../assets/imgs/others/frame.jpg'
  import { Button } from "@/components/ui/button";
const Instructions = () => {
    return ( 
        <div className=' mt-28 bg-[#f9f6ee] px-10 py-10'>
            <div className='flex flex-col items-center justify-center mb-16'>
                <h1 className=' text-center '>How ShutterSpot works</h1>
                <p className='text-center'>We have simplified the process of getting great photography. Booking a photographer through ShutterSpot is simple as 1, 2, 3.</p>
            </div>
            <div className="overal grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4">
                <Card  className="flex flex-col justify-start shadow-lg">
                       
                        <CardContent>
                            <img src={iphoneImg} className='rounded-md my-4' alt="" />
                            <div className='flex items-center gap-5 mt-6'>
                            <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>1</h1></CardTitle>
                            <CardDescription className="text-2xl">Book online</CardDescription>
                        </div>
                        <p className='mt-4 text-wrap'>Tell us your needs, and we’ll put you in touch with the highest rated photographer near you. They’ll be available and experienced in your shoot type. You can also book multiple shoot types.</p>
                        </CardContent>
                </Card>
                <Card  className="flex flex-col justify-between shadow-lg">
                       
                       <CardContent>
                           <img src={shootImg} className='rounded-md my-4' alt="" />
                           <div className='flex items-center gap-5 mt-6'>
                           <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>2</h1></CardTitle>
                           <CardDescription className="text-2xl">Do the shoot</CardDescription>
                       </div>
                       <p className='mt-4'>Your Perfocal photographer will be there at the arranged time with everything they need. Enjoy your shoot knowing you’re in the hands of a professional.</p>
                       </CardContent>
                      
               </Card>
               <Card  className="flex flex-col justify-between shadow-lg">
                       
                       <CardContent>
                           <img src={photoeditImg} className='rounded-md my-4' alt="" />
                           <div className='flex items-center gap-5 mt-6'>
                           <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>3</h1></CardTitle>
                           <CardDescription className="text-2xl">Get photos</CardDescription>
                       </div>
                       <p className='mt-4 text-wrap'>Our editors will enhance your photos before delivering them to your online gallery, all within 48 hours. View, download or share any way you like!</p>
                       </CardContent>
                      
               </Card>
               <Card  className="flex flex-col justify-between shadow-lg">
                       
                       <CardContent>
                           <img src={frameImg} className='rounded-md my-4' alt="" />
                           <div className='flex items-center gap-5 mt-6'>
                           <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>4</h1></CardTitle>
                           <CardDescription className="text-2xl">Make it real</CardDescription>
                       </div>
                       <p className='mt-4 text-wrap'>If you want, take the best of your gallery and turn it into a photobook, frame or print. It is a great gift idea. Read a media review about our service here.</p>
                       </CardContent>
                     
               </Card>
            </div>
        </div>
     );
}
 
export default Instructions;