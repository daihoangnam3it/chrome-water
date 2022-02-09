import React, { useEffect, useState } from 'react';
import theDate from './handleDate';
const ItemHeatmap = ({ habit, value, count }) => {
  const [year, setYear] = useState();
  const [check, setCheck] = useState({ process: false, date: '0Jan2022', water: 0 });
  useEffect(() => {
    const current = new Date();
    const key = value.split(' ').join('') + current.getFullYear();
    setYear(current.getFullYear());
    const result = habit.find((el) => el.date === key);
    if (result) {
      setCheck({ ...result });
    }
  }, [habit]);

  return (
    <div
      onClick={() => console.log(check)}
      className={`item-heat w-[12px] h-[12px] hover:bg-red-200 ${check.process ? 'bg-red-700' : 'bg-non-heat'} relative`}
    >
      <div className='detail-heat invisible w-[100px] h-fit py-[5px] bg-black rounded-[2px] absolute bottom-[200%] left-[-30px] z-50 text-white text-center '>
        <h4>
          {value.split(' ').reverse().join(' ')} {year}
        </h4>
        <h4>{check.water}</h4>
      </div>
    </div>
  );
};

export default ItemHeatmap;
