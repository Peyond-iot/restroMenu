import { useEffect, useState } from 'react';

function Header() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    useEffect(() => {
      // Add the event listener when the component mounts
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
  });
  
  return (
    <header className="p-4 2xl:container">
        <div className="w-full mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img src="/assets/breadcrumb.svg" alt="Logo" className="h-6 w-6"/>
              <span className="text-red-500 ml-4 font-bold text-2xl font-mono">Restaurant Menu</span>
              </div>

              <div className="flex items-center">
              <button className={`${windowWidth<380 ? 'mr-0' : 'mr-3'}`}>
                  <img className="w-6 h-6" src="/assets/cart.svg"/>
              </button>
            </div>
        </div>
    </header>
  );
}

export default Header;
    