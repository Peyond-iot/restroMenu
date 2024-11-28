import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import HeaderPopup from './headerPopup/headerPopup';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface HeadertProps{
  cart_length: any
}

const Header: React.FC<HeadertProps> = ({ cart_length }) => {

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

  const breadcrumbItems = [
    {text:'Home', link: '/'}, 
    {text:'Cart', link: '/cart'}, 
  ];

  let openModal = () => {
    MySwal.fire({
      title: "",
      html: <HeaderPopup data={breadcrumbItems}/>, // Render your component here
      position: 'top-start',
        showCancelButton: true,
        showConfirmButton: false,
        backdrop: true,
        allowOutsideClick: false,
        width: window.innerWidth<768? '50%' : '20%',
    })
  }
  
  return (
    <div>
      <header className="p-4 2xl:container">
        <div className="w-full mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/assets/breadcrumb.svg" alt="Logo" className="h-6 w-6 cursor-pointer" onClick={() => openModal()}/>
            <span className="text-red-500 ml-4 font-bold text-2xl font-mono">Restaurant Menu</span>
          </div>
          <div className="flex items-center cursor-pointer relative">
            {/* Cart Button */}
            <button 
              className={`${windowWidth < 380 ? 'mr-0' : 'mr-3'}`} 
              onClick={() => window.location.href = '/cart'}
            >
              <img className="w-6 h-6" src="/assets/cart.svg" alt="cart" />
            </button>
            {/* Notification Badge */}
            {cart_length && <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart_length}
            </div>}
          </div>
        </div>
      </header>
    </div>
    
  );
}

export default Header;
    