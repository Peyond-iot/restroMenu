import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PopUp from '../details-popup/details_popup';
import './cards.css';
import Rating from '../rating/rating';
import FooterPopup from '../footerPopup/footerPopup';

interface CardListProps{
    menuList: any
}

export const scrollTo = (list: any) => {
    let tag = (document.getElementById(list?.id) as HTMLElement)?.getBoundingClientRect()?.top + window?.scrollY + -150;
    window.scrollTo({
        top: tag,
        behavior: 'smooth',
    });
};

const CardList: React.FC<CardListProps> = ({ menuList }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [menuData, setData] = useState<any>([]);
    let orderedData: any;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const MySwal = withReactContent(Swal);


    const fetchData = async () => {
        try {
          const response = await fetch('https://backend-nwcq.onrender.com/api/menuItems');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result); // Assuming the API returns an array or object
        } catch (error: any) {
          setError(error?.message);
          
        } finally {
          setTimeout(()=>{
            setLoading(false);
            fetchOrderedData()
          },1500)
        }
    };

    const fetchOrderedData = async () => {
      try {
          const response = await fetch('https://backend-nwcq.onrender.com/api/orders');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const result = await response.json();
          orderedData = result
      } catch (error: any) {
          console.log(error?.message);
      } finally {
        getCartData()
      }
  };
    
  
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };


    let getCartData = () =>{

      const sessionData = sessionStorage.getItem('cartData');
      const parsedData = sessionData ? JSON.parse(sessionData) : []; // Fallback to empty array

      if (parsedData.length > 0) {        
        footerPopup(parsedData, true)
      }else {
        const filteredData = orderedData?.filter((item: any) => item.tableNumber === menuList[0]?.tableNo) || [];
        const isAllCompleted: boolean = filteredData[0]?.orderItems?.some((item:any) => item.status !== "completed");
        if(filteredData?.length>0 && isAllCompleted){
          footerPopup(filteredData, false)
        }
      }
      return parsedData;
    }


    let footerPopup = (data: any, bool: boolean) =>{
      // Pass the container's innerHTML as the content to SweetAlert2

      MySwal.fire({
        title: "",
        html: <FooterPopup parsedData={data} cartData={bool}/>, // Use the rendered HTML
        position: 'bottom',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        showCloseButton: false,
        backdrop: false,
        didOpen: () => {
          const popup = document.querySelector('.swal2-container');
          if (popup) {
            popup.setAttribute('id', 'added-popup'); // Assign your custom ID
          }
        },
      });
    }

  
    useEffect(() => {
        // Fetch Menu Data from API
        fetchData();
        // Add the event listener when the component mounts
        window.addEventListener('resize', handleResize);
      
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    let openModal = (data: any) =>{

        const isDataMatched = getCartData().some((item: any) => item.title === data.title) || null;
        const dataToShow = getCartData()?.filter((item: any)=>item.title === data.title);
        const numberInCart:number = getCartData()?.length;
        MySwal.fire({
            title: "",
            html: <PopUp data={isDataMatched? dataToShow[0] : data}/>, // Render your component here
            position: windowWidth<768? 'bottom': 'center',
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            showCloseButton: true,
            backdrop: true,
            customClass:{
                confirmButton: 'custom-confirm-button'
            },
            willOpen: () => {
                windowWidth<768? document?.querySelector('.swal2-popup')?.classList?.add('slide-in-bottom'): 
                document?.querySelector('.swal2-popup')?.classList?.add('fade-in-zoom-animation');
            },
            willClose: () => {
                windowWidth<768? document?.querySelector('.swal2-popup')?.classList?.remove('slide-in-bottom'):
                document?.querySelector('.swal2-popup')?.classList?.add('fade-in-zoom-animation');
                
                windowWidth<768? document?.querySelector('.swal2-popup')?.classList?.add('slide-out-bottom'):
                document?.querySelector('.swal2-popup')?.classList?.add('fade-out-animation');

                if(numberInCart>0){
                  getCartData()
                }
            },
        })
    }

    let isListed = (id:any): boolean =>{
        const listed = menuData.some((item:any) => id === item?.category);
        if(listed){
            return true
        }else{
            return false
        }
    }
   
    if (loading) return <div className='flex justify-center items-center h-[80vh]'><img src='assets/loading.gif' className='w-24 h-24' alt='Loading...'/></div>
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='pb-6 lg:pb-0'>
            <div className='lg:container md:container px-2'>
                {menuList[0]?.menulist.map((list: any)=>(
                <div className='mb-12'>
                    {isListed(list.id)&&<h2 id={list.id} className='text-red-500 mb-6 font-bold text-2xl font-mono'>{list.title}</h2>}
                        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4 md:grid-cols- md:container md:gap-4">
                        {menuData.map((item: any)=>((item.category===list.id) && (<div onClick={() => openModal(item)}>
                            <div className="w-full bg-white rounded-lg shadow-red border-red-500 border-1 cursor-pointer">
                            <img 
                                className="rounded-t-lg mb-4 w-full h-auto aspect-square object-cover" 
                                src={item.image} 
                                alt={item.altImage} 
                                />
                                <div className="px-5 pb-5">
                                    <h5 className="text-lg truncate font-semibold tracking-tight">{item.title}</h5>
                                    <div className="flex items-center mt-2.5 mb-2">
                                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                            <Rating rating={item.rating}/>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold">{item.currency}{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>)))}
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
  }
  
  export default CardList;