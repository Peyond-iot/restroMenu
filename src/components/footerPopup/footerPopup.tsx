const FooterPopup = () => {

    const sessionData = sessionStorage.getItem('cartData');
    const parsedData = sessionData ? JSON.parse(sessionData) : [];

    const numberInCart:number = parsedData?.length

    return(
        <div>
            {(numberInCart>0) && <div>
                <div className='flex flex-row align-center justify-center' onClick={() => window.location.href = '/cart'}>
                    <h2 className='text-white font-bold text-xl font-mono'>
                        {numberInCart} {numberInCart===1&&<span>item added</span>}{numberInCart>1&&<span>items added</span>} 
                    </h2>
                    <img src='/assets/right-arrow-circular.svg' className='ml-2 mt-[2px] w-6 h-6' alt=""/>
                </div>
                <div className="w-full text-white text-xs leading-relaxed">
                    Recently added {parsedData[parsedData.length-1]?.title} with a quantity of {parsedData[parsedData.length-1]?.count}
                </div>
            </div>}
        </div>
    )
  }

  export default FooterPopup;
  