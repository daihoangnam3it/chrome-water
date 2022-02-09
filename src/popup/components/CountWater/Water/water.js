import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
const Water = ({ children, onAddWater, waterInDate, percent }) => {
  const [currentPercent, setCurrentPercent] = useState(percent);
  useEffect(() => {
    setCurrentPercent(percent);
  }, [percent]);
  return (
    <div className='w-full h-[50%] flex'>
      {' '}
      <div className='w-[60%] h-full flex items-center justify-center gap-[5px]'>
        <div className='w-[50%] h-full flex justify-end items-center'>
          <div className='w-[100px] h-[90%] flex items-end bg-white border-2 border-current rounded-b-3xl relative overflow-hidden'>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${currentPercent}%` }}
              transition={{ duration: 1 }}
              className={`w-full bg-blue-100 text-[black] flex items-center justify-center`}
              // style={{ height: `${currentPercent}%` }}
            >
              <span className='absolute top-[50%] left-[50%] translate-x-[-50%]'>
                {currentPercent} % | {waterInDate}
              </span>
            </motion.div>
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
