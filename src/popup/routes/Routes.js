import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Count from '../components/CountWater';
import AuthApis from '../../api/Auth';
import { COMMAND } from './Command';
import { WrapContext } from '../../context/WrapContext';
//rafce
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path={COMMAND.home} element={<Count />} />
      <Route path={COMMAND.login} element={<Login />} />
      <Route path={COMMAND.register} element={<Register />} />
      <Route path='*' element={<h2 style={{ padding: '1rem' }}>Select an Invoice</h2>} />
    </Routes>
  );
};

export default RoutesComponent;
