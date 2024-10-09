import React from 'react';

interface PopUpProps {
  data: any;
}

const PopUp: React.FC<PopUpProps> = ({ data }) => {
  return (
    <div>
      <h2 className='text-red-500 ml-4 font-bold text-2xl font-mono'>{data.title}</h2>
    </div>
  );
};

export default PopUp;