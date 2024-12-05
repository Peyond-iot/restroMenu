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
  
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const MySwal = withReactContent(Swal);

    const sessionData = sessionStorage.getItem('cartData');
    const parsedData = sessionData ? JSON.parse(sessionData) : []; // Fallback to empty array

  
    useEffect(() => {      
      // Add the event listener when the component mounts
      window.addEventListener('resize', handleResize);

      if(parsedData.length>0){
        MySwal.fire({
            title: "",
            html: <FooterPopup/>, // Render your component here
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
        })
      }
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
  });

    let openModal = (data: any) =>{

        const isDataMatched = parsedData.some((item: any) => item.title === data.title) || null;
        const dataToShow = parsedData?.filter((item: any)=>item.title === data.title);
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
            },
        })
    }

    let menuData = [
        {
            image: 'https://imgs.search.brave.com/06E3Mh_Rnk1m-RAWEG9fNPskFQqi040NLLBwWi23JRk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3Lzg3LzI1LzY5/LzM2MF9GXzc4NzI1/Njk3OV95SGNuS252/b3dYTXZxVmRsbzlI/NHZ4Skh1Z0tEUW9i/Yi5qcGc',
            altImage: 'title-of-image',
            title: 'MeatBalls',
            desc:'Some long 3-4 line paragraph',
            category: 'starters',
            type: 'veg',
            disclaimer: 'some disclaimer like quantity, serves to nuber of people',
            rating: 3.5,
            price: 250,
            currency: 'रु.',
            imageSlider:[
                {src: '', id: '', alt:''},
                {src: '', id: '', alt:''},
                {src: '', id: '', alt:''},
            ],
            spicy_prefer: true
        },
        {
            image: 'https://imgs.search.brave.com/Y5no7pFf-N_okNdQVQFhNrWrJRtons1etEeTqEjMT5Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9pbmRpYW4taGlu/ZHUtdmVnLXRoYWxp/LW5vcnRoLWluZGlh/bi10cmFkaXRpb24t/Zm9vZHMtY29weS1z/cGFjZS00ay1pbWFn/ZS1mb290YWdlLWlz/b2xhdGVkLXdpdGhf/NjYwMjMwLTI3NTAw/LmpwZw',
            altImage: 'title-of-image',
            title: 'Non-veg Thali',
            desc:'Some long 3-4 line paragraph',
            category: 'main',
            type: 'non-veg',
            disclaimer: 'some disclaimer like quantity, serves to nuber of people',
            rating: 4.5,
            price: 350,
            currency: 'रु.',
            imageSlider:[
                {src: '', id: '', alt:''},
                {src: '', id: '', alt:''},
                {src: '', id: '', alt:''},
            ],
            spicy_prefer: false
        },
        {
            image: 'https://files.oaiusercontent.com/file-GcpxOMi27BlY2UfZzN6j9V2Q?se=2024-10-10T15%3A00%3A33Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc57acda6-3a6c-4106-b2fb-f0af9e6e29a2.webp&sig=NqY4G5Lry5dljKTFl5bF6SjHpw1FXkxL2vwtFPrWcVs%3D',
            altImage: 'title-of-image',
            title: 'Chowmein',
            desc:'The savory stir-fried chowmein, tossed with colorful vegetables and tender noodles, is a delightful treat that warms the heart.',
            category: 'chinese',
            type: 'non-veg',
            disclaimer: 'Serves-1/2',
            rating: 4,
            price: 150,
            currency: 'रु.',
            imageSlider:[
                {src: 'https://api.deepai.org/job-view-file/d7c6f3c7-da2d-47aa-9d24-b6d2e6d62c19/outputs/output.jpg?art-image=true', id: '1', alt:'chowmein1'},
                {src: 'https://images.deepai.org/art-image/77e21ba9d64b4522a294e7641ae03ae4/3-image-of-chowmein-with-white-background-7f0_HJ4cNGM.jpg', id: '2', alt:'chowmein2'},
                {src: 'https://images.deepai.org/art-image/2585c04d45a341c2859353c62379af4a/3-image-of-chowmein-with-white-background-a7c_r7DC4eO.jpg', id: '3', alt:'chowmein3'},
            ],
            spicy_prefer: true
        },
        {
            image: 'https://files.oaiusercontent.com/file-Le44TZliRHnO5xsJxiVZzDgA?se=2024-10-10T14%3A55%3A53Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Df25fb74b-e0bb-49f3-b09c-723599b4355d.webp&sig=A%2BwjmaNeSoaK9mradR9rKQ2AMG7X5lYANa4R4VizIIw%3D',
            altImage: 'title-of-image',
            title: 'Momos',
            desc:'Some long 3-4 line paragraph',
            category: 'chinese',
            type: 'non-veg',
            disclaimer: 'some disclaimer like quantity, serves to nuber of people',
            rating: 2.5,
            price: 150,
            currency: 'रु.',
            imageSlider:[
                {src: '', id: '', alt:''},
                {src: '', id: '', alt:''},
                {src: '', id: '', alt:''},
            ],
            spicy_prefer: true
        }
    ]

    let isListed = (id:any): boolean =>{
        const listed = menuData.some(item => id === item.category);
        if(listed){
            return true
        }else{
            return false
        }
    }
   
    return (
        <div className='pb-6 lg:pb-0'>
            <div className='lg:container md:container px-2'>
                {menuList.map((list: any)=>(
                <div className='mb-12 mt-6'>
                    {isListed(list.id)&&<h2 id={list.id} className='text-red-500 mb-6 font-bold text-2xl font-mono'>{list.title}</h2>}
                        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:container md:gap-4">
                        {menuData.map(item=>((item.category===list.id) && (<div className="" onClick={() => openModal(item)}>
                            <div className="w-full bg-white rounded-lg shadow-red border-red-500 border-1 cursor-pointer">
                                <img className="rounded-t-lg mb-4 lg:aspect-[5/4] aspect-[4/5]" src={item.image} alt={item.altImage} />
                                <div className="px-5 pb-5">
                                        <h5 className="text-xl font-semibold tracking-tight">{item.title}</h5>
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