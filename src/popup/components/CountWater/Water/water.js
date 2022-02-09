import React from 'react';

const Water = ({ children, onAddWater, waterInDate }) => {
  console.log(onAddWater);
  return (
    <div className='w-full h-[50%] flex'>
      {' '}
      <div className='w-[60%] h-full flex items-center justify-center gap-[5px]'>
        <div className='w-[50%] h-full flex justify-end items-center'>
          <div className='w-[100px] h-[90%] flex justify-center items-center bg-white border-2 border-current rounded-b-3xl'>
            <h4>{waterInDate}ml</h4>
          </div>
        </div>
        <div className='w-[50%] h-full flex flex-col items-start justify-center gap-y-[5px] text-[10px]'>
          <div className='h-[15%] flex items-center gap-x-[5px] '>
            <div
              onClick={() => onAddWater(100)}
              className='cup w-[25px] h-full rounded-b-[.4rem] rounded-t-sm border-2 border-current cursor-pointer'
            ></div>
            <span>100ml</span>
          </div>
          <div className='h-[15%] flex items-center gap-x-[5px] '>
            <div
              onClick={() => onAddWater(200)}
              className='cup w-[25px] h-full rounded-b-[.4rem] rounded-t-sm border-2 border-current cursor-pointer'
            ></div>
            <span>200ml</span>
          </div>
          <div className='h-[15%] flex items-center gap-x-[5px] '>
            <div
              onClick={() => onAddWater(300)}
              className='cup w-[25px] h-full rounded-b-[.4rem] rounded-t-sm border-2 border-current cursor-pointer'
            ></div>
            <span>300ml</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Water;
