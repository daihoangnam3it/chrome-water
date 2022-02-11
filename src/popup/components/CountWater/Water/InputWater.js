import React from 'react';

const InputWater = ({ onSubmitWater, waterInDate }) => {
  const submitWater = (e) => {
    e.preventDefault();
    water = e.target.elements[0].value;
    onSubmitWater(water);
  };
  // const setDev = () => {
  //   chrome.storage.sync.set({ data: [{ process: true, water: 1800, date: '10Feb2022' }] }, function () {
  //     console.log('okok');
  //   });
  // };
  return (
    <form onSubmit={submitWater} className='w-[90%] h-[50%] flex flex-col gap-y-[5px] items-center justify-center '>
      <input
        type='number'
        placeholder={waterInDate ? 'Update your weight (kg)' : 'Input your weight (kg)'}
        className='w-full p-[5px] border-[2px] border-[black] outline-none'
      />
      <button className='w-[80px] h-[30px] border-2 border-[black] rounded-sm bg-white '>{waterInDate ? 'Update' : 'Save'}</button>
      {/* <button onClick={() => setDev()}>Set</button> */}
    </form>
  );
};

export default InputWater;
