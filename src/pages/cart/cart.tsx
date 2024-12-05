import React, { useState } from 'react';

interface CartListProps{
  menuList: any
}

const Cart: React.FC<CartListProps> = ({ menuList }) =>{

  let totalItem: any;
  let totalAmount: any;

  const sessionData = sessionStorage.getItem('cartData');
  const parsedData = sessionData ? JSON.parse(sessionData) : []; // Fallback to empty array

  const cartData = parsedData;

    
  const [counters, setCounters] = useState<Record<string, number>>(() =>
    cartData.reduce((acc: any, item: any) => ({ ...acc, [item.category]: 1 }), {})
  );

  const handleIncrease = (id: any) => {
    setCounters((prev: any) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrease = (id: any) => {
    setCounters((prev: any) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };
  

    let isListed = (id:any): boolean =>{
      const listed = cartData.some((item: any) => id === item.category);
      totalItem = cartData.length;
      totalAmount = cartData.reduce((sum: any, item: any) => sum + item.price, 0);
      if(listed){
          return true
      }else{
          return false
      }
  }

    return (
      <div>
        {cartData.length > 0 && <div>
          <div className="lg:container md:container px-2 pb-20">
            {menuList && cartData && menuList.map((list: any)=><div className="mb-12 mt-6">
              {isListed(list.id)&&<h2 id={list.id} className='text-red-500 mb-6 font-bold text-2xl font-mono'>{list.title}</h2>}
              <div className="flex flex-col">
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4 md:grid-cols-2 md:container md:gap-4">
                  {cartData.map((item: any)=>(item.category===list.id) && <div className="flex flex-row w-full bg-white rounded-lg shadow-red border-red-500 border-1 cursor-pointer">
                    <div className="flex">
                      <div className="w-[176px] h-auto">
                        <img
                          className="fit-image border-solid border-r-1 border-red-500"
                          src={item.image} alt={item.altImage}
                        />
                      </div>
                      <div className="w-full py-4 px-6 lg:px-8 flex flex-row justify-between">
                        <div className="w-[60%]">
                          <h2 className="text-[23px] lg:text-[25px] leading-[26px] lg:leading-normal font-mono text text-red-500">
                            {item.title}
                          </h2>
                          <span className="text-2xl font-bold">Rs. 250</span>
                          <div className="w-full text-gray-400 text-base leading-relaxed lg:mb-4">
                            {item.disclaimer}
                          </div>
                        </div>
                        <div className="w-[40%] flex items-center justify-center">
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-2xl font-bold text-gray-700 px-2"
                            onClick={() => handleDecrease(item.category)}
                          >
                            <img
                              className="w-20 h-20"
                              src="/assets/minus.svg"
                              alt="decrease"
                            />
                          </button>
                          <span className="text-xl font-semibold">
                            {counters[item.category]}
                          </span>
                          <button
                            className="text-2xl font-bold text-gray-700 px-2"
                            onClick={() => handleIncrease(item.category)}
                          >
                            <img
                              className="w-20 h-20"
                              src="/assets/plus.svg"
                              alt="increase"
                            />
                          </button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>)}
                </div>
              </div>
            </div>)}

            {(!cartData || !menuList) && 
            <div>
              <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-xl font-bold mb-4">Empty Cart</h1>
                <button 
                    onClick={() => window.location.href = '/'}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
                    Browse Menu
                </button>
              </div>
            </div>}
          </div>

          {(cartData || menuList) && <div className="lg:container fixed bottom-0 w-full bg-white px-2 rounded-lg shadow-red border-red-300 border-t-2">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Left Section  */}
              <div className="w-[40%] flex flex-col justify-center">
                <span className="text-lg font-semibold">Items: {totalItem}</span>
                <span className="text-lg font-semibold">Total: Rs.{totalAmount}</span>
              </div>

              {/* <!-- Right Section --> */}
              <div className="w-[60%] flex justify-end">
                <button className="bg-red-500 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow hover:bg-red-600" onClick={()=>window.location.href = '/cart'}>
                  Place Order
                </button>
              </div>
            </div>
          </div>}
        </div>}

        {!(cartData.length > 0) &&<div>
          <div className="flex flex-col items-center justify-center h-screen">
            <img src='assets/cart_page.svg' className='w-12 h-12' alt='Empty Cart'/>
            <h1 className="text-2xl font-bold mb-4 font-serif">Empty Cart!</h1>
            <div className="w-full text-base leading-relaxed text-center mb-4 text-red-500">
                Looks like you haven't <br/> made your choice yet.
            </div>
            <button 
                onClick={() => window.location.href = '/'}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
                Browse Menu
            </button>
          </div>
        </div>}
      </div>
    );
}

export default Cart;