interface FooterProps{
    parsedData: any;
    cartData: boolean
}

const FooterPopup: React.FC<FooterProps> = ({ parsedData, cartData }) =>{

    const numberofItems:number = cartData? parsedData?.length : parsedData[0]?.orderItems?.length;  
    
    let notCompletedCount = (parsedData: any): number => {
        const notCompletedCount: number = parsedData[0]?.orderItems?.filter((item: any) => item.status !== "served").length;

        return notCompletedCount
    }

    return(
        <div>
            {(numberofItems>0) && <div>
                <div className='inline-flex flex-row align-center justify-center cursor-pointer' onClick={() => {
                    if(cartData){
                        window.location.href = '/cart'
                        }else{
                        window.location.href = '/status'
                        }
                    }
                }>
                    <h2 className='text-white font-bold text-xl font-mono'>
                        {cartData && <span>{numberofItems} {numberofItems===1&&<span>item added</span>}{numberofItems>1&&<span>items added</span>}</span>} 
                        {!cartData && <span>View Status</span>} 
                    </h2>
                    <img src='/assets/right-arrow-circular.svg' className='ml-2 mt-[2px] w-6 h-6' alt=""/>
                </div>
                {cartData && <div className="w-full text-white text-xs leading-relaxed">
                    Recently added {parsedData[parsedData.length-1]?.title} with a quantity of {parsedData[parsedData.length-1]?.count}
                </div>}
                {!cartData && notCompletedCount(parsedData) && <div className="w-full text-white text-sm leading-relaxed tracking-[2px]">
                    {notCompletedCount(parsedData)} items left to be served
                </div>}
            </div>}
        </div>
    )
  }

  export default FooterPopup;
  