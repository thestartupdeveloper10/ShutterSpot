const NavBar = () => {
    return ( 
        <>
          
<nav className="md:bg-transparent bg-slate-400 fixed w-full z-50 top-0 start-0 mb-5">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      
        <span className=" md:ml-5 hidden md:block self-center text-2xl font-semibold whitespace-nowrap  text-white dark:text-white">ShutterSpot</span>
    </a>
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
       <a href="/admin"> <button type="button" className="text-white md:mr-5 bg-[#2D82B7] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button></a>
        <button className="pl-8 openBtn md:hidden">
          cliffe
        </button>
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
      <ul className=" horizontalNav flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-3xl md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 glass backdrop-blur-sm">
        <li className="py-4 pl-12">
          <a href="/" className="px-8 py-4 font-medium text-[20px] leading-7 tracking-normal text-white  block bg-blue-700 md:bg-transparent md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li className="py-4">
          <a href="/book" className="px-8  font-medium text-[20px] leading-7 tracking-normal  block text-white  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Book</a>
        </li>
        <li className="py-4">
          <a href="/gallery" className="px-8  font-medium text-[20px] leading-7 tracking-normal  block text-white  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Gallery</a>
        </li>
        <li className="py-4">
          <a href="/about" className="px-8  font-medium text-[20px] leading-7 tracking-normal  block text-white  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
        </li>
        <li className="py-4 pr-12">
            <a href="/contact" className="px-8  font-medium text-[20px] leading-7 tracking-normal  block text-white  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
          </li>
      </ul>
    </div>
    </div>
   
   
  </nav>

        </>
     );
}
 
export default NavBar;