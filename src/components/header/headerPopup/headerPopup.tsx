import React from 'react';

interface headerPopupProps{
    data: any;
}

const HeaderPopup: React.FC<headerPopupProps> = ({data}) => {

    return(
        <div className='flex flex-col'>
            <h6 className="font-bold font-mono text-red-500 drop-shadow">Restaurant Menu</h6>

            <ul className='text-left flex flex-col my-6'>
                {data?.map((item: any)=>(<li className='my-1 tracking-2 text-bold cursor-pointer drop-shadow'>
                    <div onClick={() => window.location.href = item.link} className='underline font-bold'>{item.text}</div>
                </li>))}
            </ul>
        </div>
    );
}

export default HeaderPopup;