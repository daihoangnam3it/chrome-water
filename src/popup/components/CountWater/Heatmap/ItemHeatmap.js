import React, { useContext, useEffect, useState, memo } from 'react';
import { WrapContext } from '../../../../context/WrapContext';
import theDate from './handleDate';
const ItemHeatmap = ({ habit, value }) => {
  const [year, setYear] = useState();
  const [check, setCheck] = useState({ process: false, date: '0Jan2022', water: 0, percent: 0 });
  const { infoUser } = useContext(WrapContext);
  useEffect(() => {
    const current = new Date();
    const key = value.split(' ').join('') + current.getFullYear();
    setYear(current.getFullYear());
    const result = habit.find((el) => el.date === key);
    if (result) {
      setCheck({ ...result, percent: !infoUser.waterToday ? 0 : Math.floor((result.water * 100) / infoUser.waterToday) });
    }
  }, [habit, infoUser.waterToday]);

  return (
    <div
      onClick={() => console.log(check)}
      className={`item-heat w-[12px] h-[12px] hover:bg-red-200 relative`}
      style={{
        backgroundColor: `${check.percent < 10 ? '#F0F0F0' : check.percent < 50 ? '#F8A978' : check.percent < 80 ? '#FFC5A1' : '#BADFDB'}`,
      }}
    >
      <div className='detail-heat invisible w-[100px] h-fit py-[5px] bg-black rounded-[2px] absolute bottom-[200%] left-[-30px] z-50 text-white text-center '>
        <h4>
          {value.split(' ').reverse().join(' ')} {year}
        </h4>
        <h4>
          {check.percent}
          {check.water}
          {infoUser.waterToday}
        </h4>
      </div>
    </div>
  );
};

export default memo(ItemHeatmap);
