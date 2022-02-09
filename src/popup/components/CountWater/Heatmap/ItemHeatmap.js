import React, { useEffect, useState } from 'react';
const ItemHeatmap = ({ habit, value, count }) => {
  const [date, setDate] = useState();
  const [check, setCheck] = useState({ process: false, date: '0Jan2022', water: 0 });
  const [dataHabit, setDataHabit] = useState(habit);
  useEffect(() => {
    const current = new Date();
    const key = value + current.getFullYear();
    setDate(key);
    const result = habit.find((el) => el.date === key);
    if (result) {
      setCheck({ ...result });
    }
  }, [habit]);

  return (
    <div
      onClick={() => console.log(check)}
      className={`w-[10px] h-[10px] hover:bg-red-200 ${check.process ? 'bg-red-700' : 'bg-gray-300'}`}
    >
      {check.water}
    </div>
  );
};

export default ItemHeatmap;
