import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Count from '../components/CountWater';
import { COMMAND } from './Command';
//rafce
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path={COMMAND.home} element={<Count />} />
      <Route path={COMMAND.login} element={<Login />} />
      <Route path='*' element={<h2 style={{ padding: '1rem' }}>Select an Invoice</h2>} />
    </Routes>
  );
};

export default RoutesComponent;
