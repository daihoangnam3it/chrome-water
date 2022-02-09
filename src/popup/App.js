import React, { useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import Routes from './routes/Routes';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const [text, setText] = useState('');
  useEffect(() => {
    // chrome.action.setBadgeText(
    //   {
    //     text: text.toString(),
    //   },
    //   () => console.log('Finished'),
    // );
  }, [text]);
  const checkBadge = (e) => {
    const value = e.target.value;
    setText(value);
  };
  return (
    <BrowserRouter>
      <div className='w-[600px] h-[500px] overflow-hidden'>
        <Routes />
        {/* <Login /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
