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
  const [info, setInfo] = useState({});
  const [habitClient, setHabitClient] = useState(initialState);
  const [habitCloud, setHabitCloud] = useState([]);
  const { infoUser, setToken, setWaterToday } = useContext(WrapContext);
  const [waterInDate, setWaterInDate] = useState(0);
  const [percent, setPercent] = useState(0);
  useEffect(() => {
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
          setInfo(infoUser);
          setHabitCloud(habit.data);
        }
      } else {
        chrome.storage.sync.get(['data', 'waterInDate'], async function (items) {
          if (!items.data) {
            chrome.storage.sync.set({ data: [{ process: true, water: 0, date: theDate.getDate() }] }, function () {
              setHabitClient([{ process: true, water: 0, date: theDate.getDate() }]);
              setPercent(0);
            });
          } else {
            setHabitClient(items.data);
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
    });
  }, [isLogin]);
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
    if (!isLogin) {
      currentWater = [...habitClient];
      if (currentWater[currentWater.length - 1].date === theDate.getDate()) {
        const newValue = (currentWater[currentWater.length - 1].water += value);
        setPercent(calculate(newValue, waterInDate));
        setHabitClient(currentWater);
        chrome.storage.sync.set({ data: currentWater });
      } else {
        const waterToday = { process: true, water: value, date: theDate.getDate() };
        currentWater.push(waterToday);
        chrome.storage.sync.set({ data: currentWater });
        setHabitClient(currentWater);
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
  };
  const submitWater = async (value) => {
    const water = value * 2 * 0.5 * 0.03 * 1000;
    if (isLogin) {
      if (!waterInDate) {
        alert('no water');
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
    <div className='w-full h-full overflow-hidden'>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0' }}
        transition={{ duration: 1 }}
        exit={{ x: '-100%' }}
        className='w-full h-full '
      >
        {isLogin ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <div>
            <button>
              <Link to={'login'}>Login</Link>
            </button>
            <button>
              <a href='https://daihoang.space' target={'_blank'} rel='noopener noreferrer'>
                Register
              </a>
            </button>
          </div>
        )}

        <Water onAddWater={addWater} waterInDate={waterInDate} percent={percent}>
          <div className='w-[40%] h-full bg-gray-200 flex items-center justify-center'>
            <InputWater onSubmitWater={submitWater} waterInDate={waterInDate} />
          </div>
        </Water>
        {isLogin && <Heatmap habit={habitCloud && habitCloud} percent={percent} />}
        {!isLogin && <Heatmap habit={habitClient} waterInDate={waterInDate} />}
      </motion.div>
    </div>
  );
};

export default Count;
