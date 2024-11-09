import ShuffleHero from './ShuffleHeroImgs';
import Footer from '../../component/Footer';
import NavBar from '@/component/NavBar';
const Book = () => {
    return ( 
        <>
        <div className="">
            <NavBar/>
                <div className="md:mx-24 py-20">
                <ShuffleHero/>
                </div>
            <Footer/>
        </div>
        
    
   
        </>
     );
}
 
export default Book;