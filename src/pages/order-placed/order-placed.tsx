function OrderPlaced(){
    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <img src='assets/thankyou.svg' className='w-20 h-20' alt='Empty Cart'/>
            <h1 className="text-2xl font-bold mb-4 font-serif">Thank you for your order!</h1>
            <div className="w-full text-base leading-relaxed text-center mb-4 text-red-500">
            Your meal will be <br/> served at your table shortly.
            </div>
            <button 
                onClick={() => window.location.href = '/'}
                className=" mb-2 bg-white text-red-500 py-2 px-4 rounded-md hover:border-red-700 hover:text-red-700 transition duration-300 border border-red-500">
                <div className="flex items-center justify-center">
                    <img src="assets/menu.svg" className="w-6 h-6" alt="Empty Cart"/>
                    <span className="ml-2">Browse Menu</span>
                </div>
            </button>
            <div className="flex flex-row gap-2">
                <button 
                    onClick={() => window.location.href = '/bill'}
                    className="bg-white text-red-500 py-2 px-4 rounded-md hover:border-red-700 hover:text-red-700 transition duration-300 border border-red-500">
                    <div className="flex items-center justify-center mx-1">
                        <img src="assets/bill.svg" className="w-6 h-6" alt="Bill"/>
                        <span className="ml-2">Generate Bill</span>
                    </div>
                </button>
                <button 
                    onClick={() => window.location.href = '/status'}
                    className="bg-white text-red-500 py-2 px-4 rounded-md hover:border-red-700 hover:text-red-700 transition duration-300 border border-red-500">
                    <div className="flex items-center justify-center mx-2">
                        <img src="assets/status.svg" className="w-6 h-6" alt="Status"/>
                        <span className="ml-2">View Status</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default OrderPlaced;