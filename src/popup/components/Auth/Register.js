import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COMMAND } from '../../routes/Command';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      key={'register'}
      className='w-full h-full'
      initial={{ x: '-100%' }}
      animate={{ x: '0' }}
      transition={{ duration: 1 }}
      exit={{ x: '-100%' }}
      className='w-full h-full relative'
    >
      <div className='absolute top-[5px] left-[5px]' onClick={() => navigate(COMMAND.home)}>
        Back
      </div>
      <div className='w-full h-full text-[20px] flex flex-col items-center justify-center'>
        <h2 className='font-bold'>Register</h2>
        <form className='w-full h-fit flex items-center justify-center flex-col gap-y-[10px]'>
          <div className='w-[70%] h-fit flex items-center justify-between'>
            <label htmlFor='username' className='mr-[2px] font-bold text-[15px]'>
              Username
            </label>
            <input
              name='username'
              type='text'
              className='border-2 border-current px-[10px] py-[5px]'
              id='username'
              placeholder='username'
            />
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
          <div className='w-[70%] h-fit flex items-center justify-between'>
            <label htmlFor='password2' className='mr-[2px] font-bold text-[15px]'>
              Password
            </label>
            <input
              name='password2'
              type='password2'
              className='border-2 border-current px-[10px] py-[5px]'
              id='password'
              placeholder='password repeat'
            />
          </div>
          <button className='border-2 border-[black] rounded-[10px] px-[20px] py-[5px] mx-auto hover:scale-[1.1]'>Login</button>
        </form>
      </div>
      <div className='w-full text-center'>
        <h3 className='text-[15px] italic'>
          If you don't have an account.{' '}
          <span className='text-[red]'>
            <Link to={COMMAND.home}>Let's create</Link>
          </span>
          , it's just simple{' '}
        </h3>
      </div>
    </motion.div>
  );
};

export default Register;
