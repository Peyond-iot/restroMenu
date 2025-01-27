import React, { useEffect, useState } from 'react';
import { cart_Data } from '../../components/header/header';

interface CartListProps{
  menuList: any
}

const Cart: React.FC<CartListProps> = ({ menuList }) =>{
  
  const [cartData, setCartData] = useState<any[]>([]);
    // const [orderedData, setOrderedData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>();
  const [show, setShow] = useState<boolean>(false);
  let totalItem: any;
  let totalAmount: any;

   // Fetch data from sessionStorage initially
   useEffect(() => {
    const sessionData = sessionStorage.getItem('cartData');
    setLoading(true)
    setTimeout(()=>{
      setShow(true)
      setLoading(false)
      if (sessionData) {
        setCartData(JSON.parse(sessionData));
      }
    }, 2000)
  }, []);

  // Update sessionStorage when cartData changes (only if cartData is not empty)
  useEffect(() => {
    if (cartData.length > 0) {
      sessionStorage.setItem('cartData', JSON.stringify(cartData));
    }
  }, [cartData]);


  const handleIncrease = (title: string) => {
    const updatedCart = cartData.map((item: any) =>
      item.title === title ? { ...item, count: item.count + 1, priceUpdated: item.priceUpdated+item?.price } : item
    );
    setCartData(updatedCart);
    cart_Data(updatedCart);
  };

  // Decrement item count and remove item if count < 1
  const handleDecrease = (title: string) => {
    const updatedCart = cartData
      .map((item: any) =>
        item.title === title
          ? { ...item, count: item.count - 1, priceUpdated: item.priceUpdated - item?.price }
          : item
      )
      .filter((item: any) => item.count > 0); // Remove items with count <= 0
    
       // Clear session storage if cart is empty
    if (updatedCart.length === 0) {
      sessionStorage.removeItem('cartData');
    }
    setCartData(updatedCart);
    cart_Data(updatedCart);
  };  

    let isListed = (id:any): boolean =>{
      const listed = cartData.some((item: any) => id === item.category);
      totalItem = cartData.length;
      totalAmount = cartData.reduce((sum: any, item: any) => sum + item.priceUpdated, 0);
      if(listed){
          return true
      }else{
          return false
      }
  }

  let postOrder = async (item: any, method: string) =>{

    if(method === "post"){
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(item);

      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://backend-nwcq.onrender.com/api/orders", requestOptions)
        .then(response => {
          if(response){
            setTimeout(()=>{
              setLoading(false);
              window.location.href = '/ordered'
            },1500)
          }
        })
        .then(result => {
          sessionStorage.removeItem('cartData');
          sessionStorage.removeItem('placedOrder');
        })
        .catch(error => {
          console.log('error', error)
          return <div className='flex justify-center items-center h-[80vh] text-red-500'>Something went wrong !!!</div>
        });
    }

    if(method === "get"){
      try {
        const response = await fetch('https://backend-nwcq.onrender.com/api/orders');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // setOrderedData(result); // Update the state after filtering
        // orderedData = result
      } catch (error: any) {
          console.log(error?.message);
      } finally {
        // return orderedData
      }
    }
  }

  let OrderPlaced = () => {
    let orderPlaced: any;
    let orderedItem = cartData.map((item: any)=>{
      return {
        itemId: null,
        name: item.title,
        quantity: item.count,
        spiceLevel: item.spicy_level,
        notes: item.cooking_request,
        status: 'pending',
        catergory: item.category,
        price: item.price,
        food_type: item.type,
      }
    });

    const orderedData = sessionStorage.getItem('placedOrder');
    // postOrder('','get');
    // orderPlaced = orderedData?.filter((item: any) => item.tableNumber === menuList[0]?.tableNo) || [];
  
    if (orderedData) {
      orderPlaced = JSON.parse(orderedData);
      let allOrderDetails = {
        ...orderPlaced,
        orderItems: [...orderPlaced.orderItems, ...orderedItem]
      }

      sessionStorage.setItem('placedOrder', JSON.stringify(allOrderDetails));
      postOrder(allOrderDetails, "post");
    } else {
        let allOrderDetails = {
          tableId: null,
          customerId: null,
          tableNumber: menuList[0]?.tableNo,
          totalPrice: totalAmount,
          placedAt: new Date(),
          completedAt: null,
          restaurantName: "The Flavor Heaven",
          updatedAt: null,
          currency: cartData[0].currency,
          orderNO: 1000,
          ticketStatus: "pending",
          orderItems: orderedItem,
        };

      sessionStorage.setItem('placedOrder', JSON.stringify(allOrderDetails));
      postOrder(allOrderDetails, "post");
    }

  };  

  if (loading) {return <div className='flex justify-center items-center h-[80vh]'><img src='assets/loading.gif' className='w-24 h-24' alt='Loading...'/></div>}

  return (
      <div>
        {cartData.length > 0 && show && 
        <div>
          <div className="lg:container md:container px-2 pb-20">
            {menuList && cartData && menuList[0]?.menulist?.map((list: any)=><div className="mb-6 mt-6">
              {isListed(list.id)&&<h2 id={list.id} className='text-red-500 mb-6 font-bold text-2xl font-mono'>{list.title}</h2>}
              <div className="flex flex-col">
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-3 lg:gap-4 md:grid-cols-2 lg:container">
                  {cartData.map((item: any)=>(item.category===list.id) && <div className="flex flex-row w-full bg-white rounded-lg shadow-red border-red-500 border-1 cursor-pointer">
                    <div className="flex w-full">
                      <div className="w-[176px] h-full">
                        <img
                          className="fit-image h-full rounded-l"
                          src={item.image} alt={item.altImage}
                        />
                      </div>
                      <div className="w-full py-auto lg:px-4 flex flex-row items-center justify-center">
                        <div className="w-[60%] px-4 pr-0">
                          <div className="w-full">
                            <h2 className="max-w-[110px] lg:max-w-full truncate text-lg whitespace-nowrap lg:text-[25px] leading-[26px] lg:leading-normal font-mono text-red-500">
                              {item.title}
                            </h2>
                          </div>
                          <span className="text-lg font-bold">{item.currency}{item.priceUpdated}</span>
                          <div className="w-full text-gray-400 text-base leading-relaxed lg:mb-4">
                            {item.disclaimer}
                          </div>
                        </div>
                        <div className="w-[40%] flex lg:justify-end">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-2xl font-bold text-gray-700 px-2"
                              onClick={()=>handleDecrease(item?.title)}
                            >
                              <img
                                className="w-6 h-6"
                                src="/assets/minus.svg"
                                alt="decrease"
                              />
                            </button>
                            <span className="text-xl font-semibold">
                              {item.count}
                            </span>
                            <button
                              className="text-2xl font-bold text-gray-700 px-2"
                              onClick={()=>handleIncrease(item?.title)}
                            >
                              <img
                                className="w-6 h-6"
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
          </div>

          {(cartData || menuList[0]?.menulist) && show && <div className="fixed bottom-0 w-full bg-white px-2 rounded-lg shadow-red border-red-300 border-t-2">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Left Section  */}
              <div className="w-[40%] flex flex-col justify-center">
                <span className="text-lg font-semibold">Items: {totalItem}</span>
                <span className="text-lg font-semibold">Total: Rs.{totalAmount}</span>
              </div>

              {/* <!-- Right Section --> */}
              <div className="w-[60%] flex justify-end">
                <button 
                  onClick={() => {
                    OrderPlaced();
                  }}
                  className="lg:w-[30%] w-[90%] mb-2 bg-red-500 text-white py-2 px-4 rounded-md hover:border-red-700 hover:text-red-700 transition duration-300 border border-red-500">
                  <div className="flex items-center justify-center">
                      <span className="ml-2">Place Order</span>
                  </div>
                </button>
              </div>
            </div>
          </div>}
        </div>
        }

        {!(cartData.length > 0) && show && <div>
          <div className="flex flex-col items-center justify-center h-screen">
            <img src='assets/cart_page.svg' className='w-12 h-12' alt='Empty Cart'/>
            <h1 className="text-2xl font-bold mb-4 font-serif">Empty Cart!</h1>
            <div className="w-full text-base leading-relaxed text-center mb-4 text-red-500">
                Looks like you haven't <br/> made your choice yet.
            </div>
            <button 
                onClick={() => window.location.href = '/'}
                className=" mb-2 bg-white text-red-500 py-2 px-4 rounded-md hover:border-red-700 hover:text-red-700 transition duration-300 border border-red-500">
                <div className="flex items-center justify-center">
                    <img src="assets/menu.svg" className="w-6 h-6" alt="Empty Cart"/>
                    <span className="ml-2">Browse Menu</span>
                </div>
            </button>
          </div>
        </div>}
      </div>
    );
}

export default Cart;