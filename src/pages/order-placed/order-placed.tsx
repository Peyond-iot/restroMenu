function OrderPlaced(){
    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <img src='assets/cart_page.svg' className='w-12 h-12' alt='Empty Cart'/>
            <h1 className="text-2xl font-bold mb-4 font-serif">Thank you for your order!</h1>
            <div className="w-full text-base leading-relaxed text-center mb-4 text-red-500">
            Your meal will be <br/> served at your table shortly.
            </div>
            <button 
                onClick={() => window.location.href = '/'}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
                Browse Menu
            </button>
        </div>
    )
}

export default OrderPlaced;