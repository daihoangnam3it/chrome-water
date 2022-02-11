import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Water from './Water/Water';
import Heatmap from './Heatmap/Heatmap';
import AuthApis from '../../../api/Auth';
import { WrapContext } from '../../../context/WrapContext';
import theDate from './Heatmap/handleDate';
import { Link } from 'react-router-dom';
import InputWater from './Water/InputWater';
const initialState = [];
const Count = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [habitCloud, setHabitCloud] = useState([]);
  const { infoUser, setToken, setWaterToday } = useContext(WrapContext);
  const [waterInDate, setWaterInDate] = useState(0);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // setLoading(true);
    chrome.storage.sync.get(['login', 'token'], async function (items) {
      if (items.login) {
        setIsLogin(true);
        const result = await AuthApis.getAccessToken();
        if (result.token) {
          const infoUser = await AuthApis.getInfoUser(result.token);
          if (infoUser.bmiId && infoUser.bmiId.weight) {
            const water = infoUser.bmiId.weight * 2 * 0.5 * 0.03 * 1000;
            setWaterToday(water);
            setWaterInDate(water);
          }
          const habit = await AuthApis.getHabit(result.token);
          if (habit.data[habit.data.length - 1].date === theDate.getDate()) {
            if (infoUser.bmiId && infoUser.bmiId.weight) {
              const water = infoUser.bmiId.weight * 2 * 0.5 * 0.03 * 1000;
              const percent = calculate(habit.data[habit.data.length - 1].water, water);

              setPercent(percent);
            }
          }
          setToken(result.token);
          setHabitCloud(habit.data);
        }
      } else {
        chrome.storage.sync.get(['data', 'waterInDate'], async function (items) {
          console.log(items.data);
          if (!items.data) {
            chrome.storage.sync.set({ data: [{ process: true, water: 0, date: theDate.getDate() }] }, function () {
              setHabitCloud([{ process: true, water: 0, date: theDate.getDate() }]);
              setPercent(0);
            });
          } else {
            setHabitCloud([...items.data]);
            if (items.data[items.data.length - 1].date === theDate.getDate()) {
              if (items.waterInDate) {
                const percent = calculate(items.data[items.data.length - 1].water, items.waterInDate);
                setPercent(percent);
              }
            }
          }
          if (items.waterInDate) {
            setWaterInDate(items.waterInDate);
            setWaterToday(items.waterInDate);
          }
        });
      }
      setLoading(false);
    });
  }, [isLogin, waterInDate]);

  const logout = async () => {
    chrome.storage.sync.set({ login: false }, function () {});
    chrome.storage.sync.set({ token: '' }, function () {});
    setIsLogin(false);
    setWaterInDate(0);
    setPercent(0);
    setWaterToday(0);
    await AuthApis.logout(infoUser.token);
  };
  const addWater = async (value) => {
    let currentWater;
    if (!waterInDate) return alert('Please input your weight to calculate your water');
    if (!isLogin) {
      currentWater = [...habitCloud];
      if (currentWater[currentWater.length - 1].date === theDate.getDate()) {
        const newValue = (currentWater[currentWater.length - 1].water += value);
        setPercent(calculate(newValue, waterInDate));
        setHabitCloud(currentWater);
        chrome.storage.sync.set({ data: currentWater });
      } else {
        const waterToday = { process: true, water: value, date: theDate.getDate() };
        currentWater.push(waterToday);
        setPercent(calculate(value, waterInDate));
        chrome.storage.sync.set({ data: currentWater });
        setHabitCloud(currentWater);
      }
    } else {
      const object = {
        process: false,
        water: value,
      };
      const newValue = (habitCloud[habitCloud.length - 1].water += value);
      try {
        await AuthApis.addHabit(infoUser.token, object);
        const habit = await AuthApis.getHabit(infoUser.token);
        setPercent(calculate(newValue, waterInDate));
        setHabitCloud(habit.data);
      } catch (error) {
        alert(error.message);
      }
    }
    chrome.storage.sync.set({ timer: 60 });
    chrome.storage.local.set({ isCountDown: true, timer: 0, minutes: 0 });
  };
  const submitWater = async (value) => {
    const water = value * 2 * 0.5 * 0.03 * 1000;
    if (isLogin) {
      if (!waterInDate) {
        await AuthApis.createBMIWater(infoUser.token, value);
      } else {
        await AuthApis.updateBMIWater(infoUser.token, value);
      }
      setWaterToday(water);
      setWaterInDate(water);
      return;
    }
    setWaterToday(water);
    setWaterInDate(water);
    chrome.storage.sync.set({ waterInDate: water });
  };
  const calculate = (current, total) => {
    return Math.floor((current * 100) / total);
  };

  return (
    <div className='w-full h-full overflow-hidden bg-[#CDB699]'>
      {loading && <div className='w-full h-full fixed inset-0 bg-loading z-[99]'>Loading.....</div>}
      <motion.div className='w-full h-full relative'>
        <Water onAddWater={addWater} waterInDate={waterInDate} percent={percent}>
          <div className='w-[40%] h-full flex items-center justify-center relative'>
            {/* {isLogin ? (
              <button className='w-[60px] py-[5px] border-2 border-[black] rounded-sm top-2 left-2 absolute' onClick={() => logout()}>
                Logout
              </button>
            ) : (
              <div className='flex w-full gap-x-[5px] top-2 left-2 absolute '>
                <button className='w-[60px] h-[25px] border-2 border-[black]'>
                  <Link to={'login'}>Login</Link>
                </button>
                <button className='w-[60px] h-[25px] border-2 border-[black]'>
                  <a href='https://daihoang.space' target={'_blank'} rel='noopener noreferrer'>
                    Register
                  </a>
                </button>
              </div>
            )} */}
            <InputWater onSubmitWater={submitWater} waterInDate={waterInDate} />
          </div>
        </Water>
        <Heatmap habit={habitCloud} />
      </motion.div>
    </div>
  );
};

export default Count;
