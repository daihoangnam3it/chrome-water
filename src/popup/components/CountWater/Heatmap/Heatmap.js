import React, { memo } from 'react';
import DateTime from './handleDate';
import ItemHeatmap from './ItemHeatmap';
import { motion } from 'framer-motion';
const Heatmap = ({ habit }) => {
  console.log('heatmap', habit);
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: '0' }}
      transition={{ duration: 1 }}
      exit={{ x: '-100%' }}
      className='w-full h-full '
      className='w-full h-[50%]  text-[5px] bg-[#fff]'
    >
      <div className='w-[80%] h-full grid grid-cols-6 gap-x-[5px] p-[2px] m-auto font-bold '>
        {habit.length > 0 &&
          DateTime.Monts.map((month, index) => {
            return (
              <div key={month} className='w-full h-fit flex flex-col'>
                {month}
                <div className='m-auto w-full h-fit flex items-center justify-start gap-[1px] flex-wrap '>
                  {Array.from(Array(DateTime.datesInMonth[index]), (e, i) => {
                    return <ItemHeatmap habit={habit} key={i} value={(i + 1).toString() + ' ' + month.toString()} />;
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default memo(Heatmap);
