import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Water from './Water/water';
import Heatmap from './Heatmap/Heatmap';
import AuthApis from '../../../api/Auth';
import { WrapContext } from '../../../context/WrapContext';
import theDate from './Heatmap/handleDate';
const initialState = [];
const Count = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [count, setCount] = useState(0);
  const [info, setInfo] = useState({});
  const [habitClient, setHabitClient] = useState(initialState);
  const [habitCloud, setHabitCloud] = useState([]);
  const { infoUser, setToken } = useContext(WrapContext);

  useEffect(() => {
    chrome.storage.sync.get(['login', 'token'], async function (items) {
      if (items.login) {
        setIsLogin(true);
        const result = await AuthApis.getAccessToken();
        if (result.token) {
          const infoUser = await AuthApis.getInfoUser(result.token);
          const habit = await AuthApis.getHabit(result.token);
          setToken(result.token);
          setInfo(infoUser);
          setHabitCloud(habit);
        }
      } else {
        chrome.storage.sync.get(['data'], async function (items) {
          if (!items.data) {
            chrome.storage.sync.set({ data: [{ process: true, water: 0, date: theDate.getDate() }] }, function () {
              setHabitClient([{ process: true, water: 0, date: theDate.getDate() }]);
            });
          } else {
            setHabitClient(items.data);
          }
        });
      }
    });
  }, [isLogin]);
  const logout = async () => {
    chrome.storage.sync.set({ login: false }, function () {});
    chrome.storage.sync.set({ token: '' }, function () {});
    setIsLogin(false);
    await AuthApis.logout(infoUser.token);
  };
  const addWater = (value) => {
    let currentWater;
    if (!isLogin) {
      currentWater = [...habitClient];
      if (currentWater[currentWater.length - 1].date === theDate.getDate()) {
        currentWater[currentWater.length - 1].water += value;
        setHabitClient(currentWater);
        chrome.storage.sync.set({ data: currentWater });
      } else {
        const waterToday = { process: true, water: 0, date: theDate.getDate() };
        currentWater.push(waterToday);
        chrome.storage.sync.set({ data: currentWater });
        setHabitClient(currentWater);
      }
    } else {
      currentWater = habitCloud.data;
    }
  };
  return (
    <div className='w-full h-full overflow-hidden'>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0' }}
        transition={{ duration: 1 }}
        exit={{ x: '-100%' }}
        className='w-full h-full '
      >
        {count}
        <button onClick={() => console.log(habitClient)}>check</button>
        <Water>
          <div className='w-full h-[70%] flex items-center justify-center gap-[5px]'>
            <div className='w-[50%] h-full flex justify-end items-center'>
              <div className='w-[100px] h-[90%] flex justify-center items-center bg-white border-2 border-current rounded-b-3xl'>
                <h4>2L</h4>
              </div>
            </div>
            <div className='w-[50%] h-full flex flex-col items-start justify-center gap-y-[5px] text-[10px]'>
              <div className='h-[20%] flex items-center gap-x-[5px] '>
                <div
                  onClick={() => addWater(100)}
                  className='cup w-[25px] h-full rounded-b-[.4rem] rounded-t-sm border-2 border-current cursor-pointer'
                ></div>
                <span>100ml</span>
              </div>
              <div className='h-[20%] flex items-center gap-x-[5px] '>
                <div className='cup w-[25px] h-full rounded-b-[.4rem] rounded-t-sm border-2 border-current cursor-pointer'></div>
                <span>200ml</span>
              </div>
              <div className='h-[20%] flex items-center gap-x-[5px] '>
                <div className='cup w-[25px] h-full rounded-b-[.4rem] rounded-t-sm border-2 border-current cursor-pointer'></div>
                <span>300ml</span>
              </div>
            </div>
          </div>
          <div className='w-full h-[30%] bg-pink-200'></div>
        </Water>
        {/* {isLogin && <Heatmap habit={habitCloud && habitCloud.data} />} */}
        {!isLogin && <Heatmap habit={habitClient} />}
      </motion.div>
    </div>
  );
};

export default Count;
