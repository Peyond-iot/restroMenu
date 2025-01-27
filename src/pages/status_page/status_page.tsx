    import { useCallback, useEffect, useState } from "react";
    import io from "socket.io-client";

    interface StatusProps{
        menuList: any
    }

    const Status: React.FC<StatusProps> = ({ menuList }) =>{

        const [orderedData, setData] = useState<any>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        const socket = io('https://backend-nwcq.onrender.com', {
            transports: ['websocket', 'polling'],
            reconnection: true,
          });

        const fetchOrderedData = useCallback(async () => {
            try {
                const response = await fetch('https://backend-nwcq.onrender.com/api/orders');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result); // Update the state after filtering
            } catch (error: any) {
                setError(error?.message);
            } finally {
                setLoading(false);
            }
        }, [])
        
        

        useEffect(() => {
            fetchOrderedData()

             
        }, []);

        useEffect(()=>{
            socket.on('connect', () => {
                console.log('Connected to the server:', socket.id);
              });
              
            // Listen for data changes
            socket.on('update', (orderedData: any) => {
                console.log("New order created:", orderedData);
                setData(orderedData);
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from the server');
            });

            // Clean up the event listener when the component unmounts
            return () => {
                socket.off('update')
            };
        }, [])

        let geSortedData = (data: any) =>{
            // Filter the data using the API response directly
            const filteredData = data.filter((item: any) => item.tableNumber === menuList[0]?.tableNo);
            return (filteredData[0]?.orderItems || []); // Access orderItems if filteredData exists
        }

        if (loading) return <div className='flex justify-center items-center h-[80vh]'><img src='assets/loading.gif' className='w-24 h-24' alt='Loading...'/></div>
        if (error) return <p>Error: {error}</p>;

        return(
            <div className="lg:container px-2 mt-6">
                {orderedData && <div className="flex flex-col">
                    {/* <h1 className="text-2xl font-bold text-red-500 mb-4">Status Page</h1> */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-4 md:grid-cols-2 md:container md:gap-4">
                    {orderedData && geSortedData(orderedData)?.map((item:any)=>
                        <div className="flex flex-row w-full bg-white rounded-lg shadow-red border-red-500 border-1 cursor-pointer">
                            <div className="w-full flex">
                                {/* <div className="w-[176px] h-auto">
                                    <img
                                    className="fit-image border-solid border-r-1 border-red-500"
                                    src="https://files.oaiusercontent.com/file-GcpxOMi27BlY2UfZzN6j9V2Q?se=2024-10-10T15%3A00%3A33Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc57acda6-3a6c-4106-b2fb-f0af9e6e29a2.webp&sig=NqY4G5Lry5dljKTFl5bF6SjHpw1FXkxL2vwtFPrWcVs%3D" 
                                    alt="chowmein"
                                    />
                                </div> */}
                                <div className="w-full pl-4 flex flex-row justify-between">
                                    <div className="w-[50%] mr-2 overflow-hidden items-center py-2">
                                        <h2 className="text-lg sm:max-w-[150px] sm:truncate leading-[26px] lg:leading-normal font-mono text-red-500">
                                            {item?.name}
                                        </h2>
                                        <div className="w-full text-gray-400 text-base leading-relaxed">
                                            Quantity: {item?.quantity}
                                        </div>
                                    </div>
                                    <div className="w-[50%] text-center items-center justify-center">
                                        <div className={`rounded-bl-md w-full text-white px-2 pb-1
                                            ${item?.status === "pending" ? "bg-blue-500" : item?.status === "in-preparation"? "bg-yellow-500": item?.status === "completed"? "bg-red-500": item?.status === "served"? "bg-green-500": "bg-grey-500"}`}>
                                                {item?.status === "pending" ? "Confirmed" : item?.status === "in-preparation"? "Cooking": item?.status === "completed"? "Order Ready": item?.status === "served"? "Served": "Unknown"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>

                    <div className="flex flex-row gap-2 mt-12 mb-12 item-center justify-center">
                        <button 
                            onClick={() => window.location.href = '/bill'}
                            className="bg-white text-red-500 py-2 px-4 rounded-md hover:border-red-700 hover:text-red-700 transition duration-300 border border-red-500">
                            <div className="flex items-center justify-center mx-1">
                                <img src="assets/bill.svg" className="w-5 h-5" alt="Bill"/>
                                <span className="ml-2">Generate Bill</span>
                            </div>
                        </button>
                        <button 
                            onClick={() => window.location.href = '/'}
                            className="bg-white text-red-500 py-2 px-4 rounded-md hover:border-red-700 hover:text-red-700 transition duration-300 border border-red-500">
                            <div className="flex items-center justify-center">
                                <img src="assets/menu.svg" className="w-5 h-5" alt="Status"/>
                                <span className="ml-2">Browse Menu</span>
                            </div>
                        </button>
                    </div>
                </div>}
            </div>
        )
    }

    export default Status;