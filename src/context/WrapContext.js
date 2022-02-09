import React, { useReducer } from 'react';
import { COMMAND_CONTEXT } from './WrapCommand';
import { WrapReducer } from './WrapReducer';

export const WrapContext = React.createContext();
const initialState = {
  bmi: {},
  habit: [],
  token: '',
};
const WrapContextProvider = ({ children }) => {
  const [infoUser, dispatch] = useReducer(WrapReducer, initialState);
  const getContext = async (content) => {
    // const result
  };
  const setBMI = (content) => dispatch({ type: COMMAND_CONTEXT.SET_BMI, payload: content });
  const setHabit = (content) => dispatch({ type: COMMAND_CONTEXT.SET_HABIT, payload: content });
  const setToken = (content) => dispatch({ type: COMMAND_CONTEXT.SET_TOKEN, payload: content });
  const infoContext = {
    infoUser,
    getContext,
    setHabit,
    setBMI,
    setToken,
  };
  return <WrapContext.Provider value={infoContext}>{children}</WrapContext.Provider>;
};

export default WrapContextProvider;
