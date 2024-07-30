import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardTitle 
  } from '@/components/ui/card'
const ChooseBook = () => {
    return ( 
        <div className=' bg-[#f9f6ee] px-10 pt-10 pb-10'>
            <div className='flex flex-col items-center justify-center mb-16'>
                <h1 className=' text-center '>WHY CHOOSE US?</h1>
                <p className='text-center'>We have simplified the process of getting great photography. Booking a photographer through ShutterSpot is simple as 1, 2, 3.</p>
            </div>
            <div className="overal grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4">
                <Card  className="flex flex-col justify-start shadow-lg">
                       
                        <CardContent>
                            <div className='flex items-center gap-5 mt-6'>
                            <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>1</h1></CardTitle>
                            <CardDescription className="text-2xl">Premium Service:</CardDescription>
                        </div>
                        <p className='mt-4 text-wrap'>Access to top-tier photographers renowned for their quality and professionalism.</p>
                        </CardContent>
                </Card>
                <Card  className="flex flex-col justify-between shadow-lg">
                       
                       <CardContent>
                           
                           <div className='flex items-center gap-5 mt-6'>
                           <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>2</h1></CardTitle>
                           <CardDescription className="text-2xl">Stress-Free Experience:</CardDescription>
                       </div>
                       <p className='mt-4'>Comprehensive assistance streamlines the process from start to finish, minimizing hassle and uncertainty.</p>
                       </CardContent>
                      
               </Card>
               <Card  className="flex flex-col justify-between shadow-lg">
                       
                       <CardContent>
                          
                           <div className='flex items-center gap-5 mt-6'>
                           <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>3</h1></CardTitle>
                           <CardDescription className="text-2xl">Reliability and Support:</CardDescription>
                       </div>
                       <p className='mt-4 text-wrap'>Backup support provides reassurance and assistance in unforeseen circumstances</p>
                       </CardContent>
                      
               </Card>
               <Card  className="flex flex-col justify-between shadow-lg">
                       
                       <CardContent>
                           <div className='flex items-center gap-5 mt-6'>
                           <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>4</h1></CardTitle>
                           <CardDescription className="text-2xl">Assurance of Quality:</CardDescription>
                       </div>
                       <p className='mt-4 text-wrap'>Handpicked photographers guarantee exceptional service and results, backed by rigorous selection criteria.</p>
                       </CardContent>
                     
               </Card>
               <Card  className="flex flex-col justify-between shadow-lg">
                       
                       <CardContent>
                           <div className='flex items-center gap-5 mt-6'>
                           <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>5</h1></CardTitle>
                           <CardDescription className="text-2xl">Personalized Touch:</CardDescription>
                       </div>
                       <p className='mt-4 text-wrap'>Direct communication with photographers fosters collaboration and ensures your vision is realized.</p>
                       </CardContent>
                     
               </Card>
               <Card  className="flex flex-col justify-between shadow-lg">
                       
                       <CardContent>
                           <div className='flex items-center gap-5 mt-6'>
                           <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>6</h1></CardTitle>
                           <CardDescription className="text-2xl">Convenient Selection:</CardDescription>
                       </div>
                       <p className='mt-4 text-wrap'>Preview options allow you to choose images that best capture your desired aesthetic and vision.</p>
                       </CardContent>
                     
               </Card>
               <Card  className="flex flex-col justify-between shadow-lg">
                       
                       <CardContent>
                           <div className='flex items-center gap-5 mt-6'>
                           <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>7</h1></CardTitle>
                           <CardDescription className="text-2xl">Unique Results:</CardDescription>
                       </div>
                       <p className='mt-4 text-wrap'>Each photographers signature editing style adds a distinct and artistic flair to your images.</p>
                       </CardContent>
                     
               </Card>
               <Card  className="flex flex-col justify-between shadow-lg">
                       
                       <CardContent>
                           <div className='flex items-center gap-5 mt-6'>
                           <CardTitle className="rounded-full h-14 w-14 bg-slate-100 flex items-center justify-center"><h1>8</h1></CardTitle>
                           <CardDescription className="text-2xl">Professional Output:</CardDescription>
                       </div>
                       <p className='mt-4 text-wrap'>Delivery of high-quality, edited images ensures satisfaction and meets your expectations for final products</p>
                       </CardContent>
                     
               </Card>
            </div>
        </div>
     );
}
 
export default ChooseBook;