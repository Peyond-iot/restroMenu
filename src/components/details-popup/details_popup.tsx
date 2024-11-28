import React, { useState } from 'react';
import ImageSlider from '../image-slider/slider';
import SpicyPreference from './Spicy_preference/spicy';
import Cart from './../../pages/cart/cart';
import Swal from 'sweetalert2';
import Header from '../header/header';


interface PopUpProps {
  data: any;
}

const PopUp: React.FC<PopUpProps> = ({ data }) => {

  const [cartData, setCartData] = useState<any[]>([]);

  // Spicy Preference
  const [selectedLevel, setSelectedLevel] = useState<'low' | 'medium' | 'high'>('low');

  // Number of count
  const [count, setCount] = useState(1); // Initialize counter with 1

  const handleIncrease = () => setCount((prevCount) => prevCount + 1);
  const handleDecrease = () => setCount((prevCount) => Math.max(1, prevCount - 1));

  // Add Cooking Request
  const [cookingDetails, setCookingDetails] = useState(''); // Initialize state

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCookingDetails(event.target.value); // Update state on input change
  };

  const addCart = () => {
    data.count = count;
    data.spicy_level = selectedLevel;
    data.cooking_request = cookingDetails;

    setCartData([...cartData, data]);
    <Header cart_length={cartData.length}/>
    Swal.close();
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
          {data.spicy_prefer && (
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
      <div className="px-4 py-2 flex flex-row justify-between">
        <div className="flex items-center space-x-2">
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
        <button className="bg-red-500 text-[#ffffff] border-0 px-6 py-2 rounded" onClick={addCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PopUp;