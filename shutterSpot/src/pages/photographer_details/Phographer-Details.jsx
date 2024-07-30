import imgBG1 from '../../assets/imgs/couples/couple-landscape.jpg'
import strawbberry from '../../assets/imgs/food/pancakes-2291908_1280.jpg'
import wedding from '../../assets/imgs/wedding/wedding.jpg'
import female from '../../assets/imgs/Fmodels/beautiful-2910261_1280.jpg'
// import workout from '../assets/imgs/Mmodels/man-gym.jpg'
import studio from '../../assets/imgs/Fmodels/fashion-6066661_1280.jpg'
import Footer from '@/component/Footer'
import NavBar from '@/component/NavBar'

const Photographer_Details = () => {
    return ( 
        <>
        <div className="mt-[165px] md:mt-32">
            <NavBar/>
        <div className="overal mx-8 mt-[165px] md:mt-24">
            <div className="photos grid grid-cols-7 gap-2">
                <div className="each col-span-2 flex flex-col gap-2">
                    <div className="h-full w-full">
                    <img className=" max-w-full " src={wedding} alt=""/>
                    </div>
                    <div className="h-full w-full">
                    <img className=" max-w-full " src={strawbberry} alt=""/> 
                    </div>
                </div>
                <div className="each col-span-3 h-full">
                <img className=" max-w-full h-full object-cover " src={studio} alt=""/> 
                </div>
                <div className="each col-span-2 flex flex-col gap-2">
                    <div className="h-full w-full">
                        <img className=" max-w-full " src={imgBG1} alt=""/>
                    </div>
                    <div className="h-full w-full">
                    <img className=" max-w-full h-full object-cover " src={female} alt=""/> 
                    </div>
                </div>
            </div>
            {/* details */}
          <div className="top">
          <div className="overal flex gap-5 mt-16 bg-gray-100">
                <div className="pic flex items-center justify-center">
                    <div className="rounded-full h-[100px] w-[100px] overflow-hidden">
                    <img className=" max-w-full h-full object-cover " src={studio} alt=""/>  
                    </div>
                </div>
                <div className="details flex flex-col items-start gap-2 pb-5">
                   <h1>Cliffe</h1>
                   <h3>Pleasanton</h3>
                   <p>15 years of experience</p>  
                </div>
            </div>
            <div className="details grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 md:mt-4">
              <div className="about">
                <h1>About Me</h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti illum perspiciatis modi quidem nulla, nihil, magnam molestiae at reiciendis pariatur omnis mollitia voluptate sit dolore, nesciunt sunt fuga impedit expedita.
                </p>
                </div>
                <div className="portfolio">
                <h1>Porfolio</h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti illum perspiciatis modi quidem nulla, nihil, magnam molestiae at reiciendis pariatur omnis mollitia voluptate sit dolore, nesciunt sunt fuga impedit expedita.
                </p>
                </div> 
                <div className="portfolio">
                <h1>Book</h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti illum perspiciatis modi quidem nulla, nihil, magnam molestiae at reiciendis pariatur omnis mollitia voluptate sit dolore, nesciunt sunt fuga impedit expedita.
                </p>
                </div>   
            </div>
            <div className="language grid md:grid-cols-3 mt-16">
                
                <div className="equipment  col-span-1">
                    <h1>Equipment</h1>
                    <div className="camera flex gap-2 mt-6">
                        <div className="svg flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" ><path d="M12 9c-1.626 0-3 1.374-3 3s1.374 3 3 3 3-1.374 3-3-1.374-3-3-3z"></path><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5s2.29-5 5-5 5 2.29 5 5-2.29 5-5 5z"></path></svg>
                        </div>
                        <div className="details">
                            <h3>Camera:</h3>
                            <p>Canon 5d MKIV</p>
                        </div>
                    </div>
                    <div className="lenses mt-5 flex gap-2">
                         <div className="svg flex justify-center items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" ><path d="M18.125 2H5.875A1.877 1.877 0 0 0 4 3.875v12.25C4 17.159 4.841 18 5.875 18H11v2H7v2h10v-2h-4v-2h5.125A1.877 1.877 0 0 0 20 16.125V3.875A1.877 1.877 0 0 0 18.125 2zM18 16H6V4h12v12z"></path><path d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path></svg>
                        </div>
                        <div className="details">
                            <h3>Lenses:</h3>
                            <p>35mm, 85mm, 70-200mm, 14-24mm</p>
                        </div>
                    </div>
                </div>
                <div className="language col-span-2">
                <h1>Language</h1>
                    <div className="over grid grid-cols-2">
                   <div>
                    <div className="lenses flex gap-2">
                         <div className="svg flex justify-center items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" ><path d="M18.125 2H5.875A1.877 1.877 0 0 0 4 3.875v12.25C4 17.159 4.841 18 5.875 18H11v2H7v2h10v-2h-4v-2h5.125A1.877 1.877 0 0 0 20 16.125V3.875A1.877 1.877 0 0 0 18.125 2zM18 16H6V4h12v12z"></path><path d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path></svg>
                        </div>
                        <div className="details">
                            <h3>Languages spoken:</h3>
                            <p>English</p>
                        </div>
                    </div>
                   </div>

              <div>
                <p>Am good with...</p>
                <div className="overal flex gap-8 flex-wrap py-5">
                 <div>
                    <div className="lenses flex gap-2">
                         <div className="svg flex justify-center items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" ><path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"></path><path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h3c0-1.789-.956-5.285-4.396-6.952z"></path></svg>
                        </div>
                        <div className="details flex justify-center items-center">
                            <h3>Large Groups</h3>
                        </div>
                    </div>
                   </div>
                   <div>
                    <div className="lenses flex gap-2">
                         <div className="svg flex justify-center items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm3.493-13a1.494 1.494 0 1 1-.001 2.987A1.494 1.494 0 0 1 15.493 9zm-4.301 6.919a4.108 4.108 0 0 0 1.616 0c.253-.052.505-.131.75-.233.234-.1.464-.224.679-.368.208-.142.407-.306.591-.489.183-.182.347-.381.489-.592l1.658 1.117a6.027 6.027 0 0 1-1.619 1.621 6.003 6.003 0 0 1-2.149.904 6.116 6.116 0 0 1-2.414-.001 5.919 5.919 0 0 1-2.148-.903 6.078 6.078 0 0 1-1.621-1.622l1.658-1.117c.143.211.307.41.488.59a3.988 3.988 0 0 0 2.022 1.093zM8.5 9a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 9z"></path></svg>
                        </div>
                        <div className="details flex justify-center items-center">
                            <h3>Capturing Emotions</h3>
                        </div>
                    </div>
                   </div>
                   <div className="lenses flex gap-2">
                         <div className="svg flex justify-center items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h3v2h3v-2h3v-2h-2z"></path></svg>
                        </div>
                        <div className="details flex justify-center items-center">
                            <h3>Candid Moments</h3>
                        </div>
                    </div>
                    <div className="lenses flex gap-2">
                         <div className="svg flex justify-center items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" ><path d="M2 8v11.529S6.621 19.357 12 22c5.379-2.643 10-2.471 10-2.471V8s-5.454 0-10 2.471C7.454 8 2 8 2 8z"></path><circle cx="12" cy="5" r="3"></circle></svg>
                        </div>
                        <div className="details flex justify-center items-center">
                            <h3>Story Telling</h3>
                        </div>
                    </div>
                   <div>
                    <div className="lenses flex gap-2">
                         <div className="svg flex justify-center items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" ><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-15 5 5h-4v5h-2v-5H7l5-5z"></path></svg>
                        </div>
                        <div className="details flex justify-center items-center">
                            <h3>Going the Extra Mile</h3>
                        </div>
                    </div>
                   </div>
                 </div>
              </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <Footer/>
        </div>
        </>
     );
}
 
export default Photographer_Details;