import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import HeaderPopup from './headerPopup/headerPopup';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Global cart data and notification callback
let cart_data: any[] = [];
let notifyCartUpdate: (() => void) | null = null;

export const cart_Data = (data: any) => {
  cart_data = data;
  if (notifyCartUpdate) {
    notifyCartUpdate(); // Notify the Header component about the update
  }
};

const Header = () => {
  const [cartData, setCartData] = useState<any[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Sync cart_data with local state
    const updateCart = () => setCartData([...cart_data]);
    notifyCartUpdate = updateCart; // Register the notification callback

    // Initial sync
    updateCart();

    // Cleanup the notification callback on component unmount
    return () => {
      notifyCartUpdate = null;
    };
  }, []); // Run only once when the component mounts

  useEffect(() => {
    // Add the event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Run only once when the component mounts

  const breadcrumbItems = [
    { text: 'Home', link: '/', svgImage: '/assets/home.svg' },
    { text: 'Cart', link: '/cart', svgImage: '/assets/cart.svg' },
    { text: 'Status', link: '/status', svgImage: '/assets/status.svg' },
    { text: 'Bill', link: '/bill', svgImage: '/assets/bill.svg' },
  ];

  const openModal = () => {
    MySwal.fire({
      title: '',
      html: <HeaderPopup data={breadcrumbItems} />, // Render your component here
      position: 'top-start',
      showCancelButton: true,
      showConfirmButton: false,
      backdrop: true,
      allowOutsideClick: false,
      width: window.innerWidth < 768 ? '75%' : '15%',
    });
  };

  return (
    <div>
      <header className="p-4 2xl:container">
        <div className="w-full mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/assets/breadcrumb.svg"
              alt="Logo"
              className="h-6 w-6 cursor-pointer"
              onClick={() => openModal()}
            />
            <span className="text-red-500 ml-4 font-bold text-2xl font-mono">
              Restaurant Menu
            </span>
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
            {cartData.length > 0 && (
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartData.length}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
