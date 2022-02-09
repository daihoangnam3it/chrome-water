import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    chrome.storage.sync.get(['login', 'token'], function (items) {
      console.log('Settings retrieved', items);
    });
  }, []);
  return <div className='text-3xl font-bold underline'>Hello Options</div>;
};

export default App;
