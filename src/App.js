import React, { useState, useEffect } from 'react';
import SlotMachine from './components/SlotMachine_Modify';
import SlotMachineModify from './components/SlotMachine_Modify';
import CustomOptionsForm from './components/CustomOptionsForm';
import Favorites from './components/Favorites';
import './App.css';  // 引入 CSS 文件
import { Provider } from 'react-redux'; 
import store from './store'; 
import Options from './components/Options';

const App = () => {
  return (
    <Provider store={store}>  {/* 确保 Provider 包裹了所有组件 */}
      <h1>Recipe Slot Machine</h1>
      <div className="app">
        <SlotMachineModify/>
        <Favorites />  {/* 不再通过 props 传递 favorites 和 setFavorites */}
        <Options />
      </div>
    </Provider>
  );
};

export default App;
