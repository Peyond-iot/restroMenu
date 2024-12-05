import React, { useEffect, useState } from 'react';
import ImageSlider from '../image-slider/slider';
import SpicyPreference from './Spicy_preference/spicy';
import Swal from 'sweetalert2';
import { cart_Data } from '../header/header';
import withReactContent from 'sweetalert2-react-content';
import FooterPopup from '../footerPopup/footerPopup';
import './details_popup.css';


interface PopUpProps {
  data: any;
}

const PopUp: React.FC<PopUpProps> = ({ data }) => {

  const MySwal = withReactContent(Swal);

  // Spicy Preference
  const [selectedLevel, setSelectedLevel] = useState<'low' | 'medium' | 'high'>(data?.spicy_level || 'low');

  // Number of count
  const [count, setCount] = useState<number>(data?.count || 1); // Initialize with `data?.count` if available
  const [price, setPrice] = useState(data?.priceUpdated || data?.price);

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1);
    if(data?.count){
      data.count = count + 1;
    }
    setPrice((priceIncrease: number)=>priceIncrease+data?.price);
  };
  const handleDecrease = () => {
    setCount((prevCount) => Math.max(1, prevCount - 1));
    if(data?.count || data?.priceUpdated){
      data.count = count + 1;
    }
    setPrice((pricedecrease: number)=>Math.max(data?.price, pricedecrease-data?.price));
  };

  // Add Cooking Request
  const [cookingDetails, setCookingDetails] = useState(data?.cooking_request || ''); // Initialize state

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCookingDetails(event.target.value); // Update state on input change
  };

  const sessionData = sessionStorage.getItem('cartData');
  const parsedData = sessionData ? JSON.parse(sessionData) : []; // Fallback to empty array


  const [cartData, setCartData] = useState<any[]>(parsedData);

  const addCart = (cart_data: any) => {
    const newItem = {
      ...cart_data,
      count: count, // Default count
      spicy_level: selectedLevel,
      cooking_request: cookingDetails,
      priceUpdated: price
    };

    const isItem = cartData?.some((item: any) => item?.title === cart_data?.title)

    // Check if item already exists in cart
    if (!isItem) {
      // Add the new item if it doesn't exist
      setCartData((prevCartData) => {
        const updatedData = [...prevCartData, newItem];
        sessionStorage.setItem('cartData', JSON.stringify(updatedData)); // Persist updated cart in sessionStorage
        cart_Data(updatedData);
        return updatedData;
      });
    } else {
      setCartData((prevCartData) => {
        const updatedData = prevCartData.map((item) =>
          item.title === cart_data.title
            ? {
                ...item,
                count: count,
                spicy_level: selectedLevel,
                cooking_request: cookingDetails,
                priceUpdated: price,
              }
            : item
        );
        sessionStorage.setItem('cartData', JSON.stringify(updatedData));
        cart_Data(updatedData);
        return updatedData;
      });
    }

    Swal.close(); // This will use the updated cartData

    const sessionData = sessionStorage.getItem('cartData');
    const parsedData = sessionData ? JSON.parse(sessionData) : [];

    const numberInCart:number = parsedData?.length;
    if(numberInCart>0){
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
  };

  
  return (
    <div className="text-left flex flex-col">
      <h2 className="text-red-500 font-bold text-2xl font-mono mb-3 uppercase tracking-wide">
        {data?.title}
      </h2>
      <div className="flex lg:flex-row flex-col gap-3">
        <div className="lg:w-[40%] w-full lg:h-[30%]">
          <ImageSlider data={data?.imageSlider} />
        </div>
        <div className="lg:w-[60%] w-full flex flex-col">
          <div className="w-full text-gray-700 text-base leading-relaxed lg:mb-4">
            {data?.desc}
          </div>
          <div className="w-full text-gray-400 text-base leading-relaxed lg:mb-2">
            {data?.disclaimer}
          </div>
          {data?.spicy_prefer && (
        <div className="mt-1">
          <SpicyPreference
            selectedLevel={selectedLevel}
            onChange={(level) => setSelectedLevel(level)}
          />
          {/* <p className="mt-4">Selected Spicy Level: {selectedLevel}</p> */}
        </div>
      )}
        </div>
      </div>
      
      <div className='mt-2 mb-2 w-full'>
      <textarea
        className="w-full p-2 border-2 rounded-lg"
        name="cooking_details"
        id="cooking_details"
        placeholder="Add a Cooking Request (optional)"
        value={cookingDetails} // Bind the state to the textarea
        onChange={handleChange} // Update state on change
      />
      </div>
      <div className="py-2 flex flex-row justify-between">
        <div className="flex items-center w-[40%]">
          <button
            className="text-2xl font-bold text-gray-700 px-2"
            onClick={handleDecrease}
          >
            <img className="w-6 h-6" src="/assets/minus.svg" alt="decrease" />
          </button>
          <span className="text-xl font-semibold">{count}</span>
          <button
            className="text-2xl font-bold text-gray-700 px-2"
            onClick={handleIncrease}
          >
            <img className="w-6 h-6" src="/assets/plus.svg" alt="increase" />
          </button>
        </div>
        <button className="bg-red-500 text-[#ffffff] border-0 px-2 py-2 rounded font-mono w-[60%]" onClick={()=>addCart(data)}>
          Add item <span className='m-1'>{data?.currency}{price}</span>
        </button>
      </div>
    </div>
  );
};

export default PopUp;