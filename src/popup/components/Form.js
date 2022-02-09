import React from 'react';

const Form = () => {
  return (
    <form className='w-full h-fit flex items-center justify-center flex-col gap-y-[10px]' onSubmit={login}>
      <div className='w-[70%] h-fit flex items-center justify-between'>
        <label htmlFor='username' className='mr-[2px] font-bold text-[15px]'>
          Username
        </label>
        <input name='username' type='text' className='border-2 border-current px-[10px] py-[5px]' id='username' placeholder='username' />
      </div>
      <div className='w-[70%] h-fit flex items-center justify-between'>
        <label htmlFor='password' className='mr-[2px] font-bold text-[15px]'>
          Password
        </label>
        <input
          name='password'
          type='password'
          className='border-2 border-current px-[10px] py-[5px]'
          id='password'
          placeholder='your password'
        />
      </div>
      <button className='border-2 border-[black] rounded-[10px] px-[20px] py-[5px] mx-auto hover:scale-[1.1]'>Login</button>
    </form>
  );
};

export default Form;
