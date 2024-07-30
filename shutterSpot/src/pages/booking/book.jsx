import ShuffleHero from './ShuffleHeroImgs';
import Footer from '../../component/Footer';
import NavBar from '@/component/NavBar';
const Book = () => {
    return ( 
        <>
        <div className="mt-32">
            <NavBar/>
                <div className="md:mx-24 mx-5 mt-32 bg-[#fffff0]">
                <ShuffleHero/>
                </div>
            <Footer/>
        </div>
        
    
   
        </>
     );
}
 
export default Book;