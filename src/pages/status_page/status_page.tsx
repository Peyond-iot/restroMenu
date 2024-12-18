function Status(){
    return(
        <div className="lg:container px-2 mt-6">
            <div className="flex flex-col">
                {/* <h1 className="text-2xl font-bold text-red-500 mb-4">Status Page</h1> */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-4 md:grid-cols-2 md:container md:gap-4">
                    <div className="flex flex-row w-full bg-white rounded-lg shadow-red border-red-500 border-1 cursor-pointer">
                        <div className="w-full flex">
                            <div className="w-[176px] h-auto">
                                <img
                                className="fit-image border-solid border-r-1 border-red-500"
                                src="https://files.oaiusercontent.com/file-GcpxOMi27BlY2UfZzN6j9V2Q?se=2024-10-10T15%3A00%3A33Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc57acda6-3a6c-4106-b2fb-f0af9e6e29a2.webp&sig=NqY4G5Lry5dljKTFl5bF6SjHpw1FXkxL2vwtFPrWcVs%3D" 
                                alt="chowmein"
                                />
                            </div>
                            <div className="w-full pl-2 flex flex-row justify-between">
                                <div className="w-[50%] mr-2 overflow-hidden items-center py-2">
                                    <h2 className="text-[23px] lg:text-[25px] leading-[26px] lg:leading-normal font-mono text-red-500">
                                        Chowmein
                                    </h2>
                                    <div className="w-full text-gray-400 text-base leading-relaxed">
                                        Quantity: 3
                                    </div>
                                </div>
                                <div className="w-[50%] text-center items-center justify-center">
                                    <div className="rounded-bl-md w-full bg-blue-500 text-white px-2 pb-1">Confirmed</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-full bg-white rounded-lg shadow-red border-red-500 border-1 cursor-pointer">
                        <div className="w-full flex">
                            <div className="w-[176px] h-auto">
                                <img
                                className="fit-image border-solid border-r-1 border-red-500"
                                src="https://files.oaiusercontent.com/file-GcpxOMi27BlY2UfZzN6j9V2Q?se=2024-10-10T15%3A00%3A33Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc57acda6-3a6c-4106-b2fb-f0af9e6e29a2.webp&sig=NqY4G5Lry5dljKTFl5bF6SjHpw1FXkxL2vwtFPrWcVs%3D" 
                                alt="chowmein"
                                />
                            </div>
                            <div className="w-full pl-2 flex flex-row justify-between">
                                <div className="w-[50%] py-2 mr-2 overflow-hidden items-center">
                                    <h2 className="text-[23px] lg:text-[25px] leading-[26px] lg:leading-normal font-mono text-red-500">
                                        Momo
                                    </h2>
                                    <div className="w-full text-gray-400 text-base leading-relaxed">
                                        Quantity: 4
                                    </div>
                                </div>
                                <div className="w-[50%] text-center items-center justify-center">
                                    <div className="rounded-bl-md w-full bg-yellow-500 text-white px-2 pb-1">Preparing</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-full bg-white rounded-lg shadow-red border-red-500 border-1 cursor-pointer">
                        <div className="w-full flex">
                            <div className="w-[176px] h-auto">
                                <img
                                className="fit-image border-solid border-r-1 border-red-500"
                                src="https://files.oaiusercontent.com/file-GcpxOMi27BlY2UfZzN6j9V2Q?se=2024-10-10T15%3A00%3A33Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc57acda6-3a6c-4106-b2fb-f0af9e6e29a2.webp&sig=NqY4G5Lry5dljKTFl5bF6SjHpw1FXkxL2vwtFPrWcVs%3D" 
                                alt="meat ball"
                                />
                            </div>
                            <div className="w-full pl-2 flex flex-row justify-between">
                                <div className="w-[50%] py-2 overflow-hidden mr-1 items-center">
                                    <h2 className="text-[23px] lg:text-[25px] leading-[26px] lg:leading-normal font-mono text-red-500">
                                        MeatBalls
                                    </h2>
                                    <div className="w-full text-gray-400 text-base leading-relaxed">
                                        Quantity: 1
                                    </div>
                                </div>
                                <div className="w-[50%] text-center items-center justify-center">
                                    <div className="rounded-bl-md w-full bg-red-500 text-white px-2 pb-1">Order Ready</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-full bg-white rounded-lg shadow-red border-red-500 border-1 cursor-pointer">
                        <div className="w-full flex">
                            <div className="w-[176px] h-auto">
                                <img
                                className="fit-image border-solid border-r-1 border-red-500"
                                src="https://files.oaiusercontent.com/file-GcpxOMi27BlY2UfZzN6j9V2Q?se=2024-10-10T15%3A00%3A33Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc57acda6-3a6c-4106-b2fb-f0af9e6e29a2.webp&sig=NqY4G5Lry5dljKTFl5bF6SjHpw1FXkxL2vwtFPrWcVs%3D" 
                                alt="meat ball"
                                />
                            </div>
                            <div className="w-full pl-2 flex flex-row justify-between">
                                <div className="py-2 w-[50%] mr-2 overflow-hidden items-center">
                                    <h2 className="text-[23px] lg:text-[25px] leading-[26px] lg:leading-normal font-mono text-red-500">
                                        Ramen
                                    </h2>
                                    <div className="w-full text-gray-400 text-base leading-relaxed">
                                        Quantity: 2
                                    </div>
                                </div>
                                <div className="w-[50%] text-center items-center justify-center">
                                    <div className="rounded-bl-md w-full bg-green-500 text-white px-2 pb-1">Served</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-2 mt-12 item-center justify-center">
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
            </div>
        </div>
    )
}

export default Status;