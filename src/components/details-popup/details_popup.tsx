import React from 'react';
import ImageSlider from '../image-slider/slider';


interface PopUpProps {
  data: any;
}

const PopUp: React.FC<PopUpProps> = ({ data }) => {
  return (
    <div className='text-left flex flex-col'>
      <h2 className='text-red-500 font-bold text-2xl font-mono mb-3 uppercase tracking-wide'>{data?.title}</h2>
      <div className='flex flex-col lg:flex-row gap-3'>
        <div className='lg:w-[25vh] lg:h-[18vh] w-full'>
          <ImageSlider data={data?.imageSlider}/>
        </div>
        <div className='flex flex-col'>
          <div className='w-full text-gray-700 text-base leading-relaxed lg:mb-4'>{data?.desc}</div>
          <div className='w-full text-gray-400 text-base leading-relaxed lg:mb-4'>{data?.disclaimer}</div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;