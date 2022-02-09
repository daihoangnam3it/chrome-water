import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthApis from '../../../api/Auth';
import { motion } from 'framer-motion';
import { COMMAND } from '../../routes/Command';
import { WrapContext } from '../../../context/WrapContext';
const Login = () => {
  const navigate = useNavigate();
  const { getContext } = useContext(WrapContext);

  const login = async (e) => {
    e.preventDefault();
    const content = {
      username: e.target.elements[0].value,
      password: e.target.elements[1].value,
    };
    try {
      const result = await AuthApis.login(content);
      chrome.storage.sync.set({ login: true }, function () {
        console.log('Settings saved');
      });
      chrome.storage.sync.set({ token: result.token }, function () {
        console.log('Settings saved');
      });
      getContext(result.bmiId);
      navigate(COMMAND.home);
    } catch (error) {
      alert(error.message);
    }
  };
  const check = () => {
    chrome.storage.sync.get(['login', 'token'], function (items) {
      console.log('Settings retrieved', items);
    });
  };

  return (
    <motion.div
      key={'login'}
      className='w-full h-full relative'
      initial={{ x: '-100%' }}
      animate={{ x: '0' }}
      transition={{ duration: 1 }}
      exit={{ x: '-100%' }}
    >
      <div className='absolute top-[5px] left-[5px]' onClick={() => navigate(COMMAND.home)}>
        Back
      </div>
      <div className='w-full h-full text-[20px] flex flex-col items-center justify-center'>
        <h2 className='font-bold'>Halloooooo</h2>
        <form className='w-full h-fit flex items-center justify-center flex-col gap-y-[10px]' onSubmit={login}>
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
          <button className='border-2 border-[black] rounded-[10px] px-[20px] py-[5px] mx-auto hover:scale-[1.1]'>Login</button>
        </form>
      </div>
      <div className='w-full text-center'>
        <h3 className='text-[15px] italic'>
          If you don't have an account.{' '}
          <span className='text-[red]'>
            <Link to={'register'}>Let's create</Link>
          </span>
          , it's just simple{' '}
        </h3>
      </div>
      <button onClick={() => check()}>Get</button>
    </motion.div>
  );
};

export default Login;
