import React, { useState, useEffect } from 'react';
import './SlotMachine.css';  
import { useSelector, useDispatch } from 'react-redux';
import { ADD_FAVORITE } from '../reducer'; 
import { Button } from 'antd';

const SlotMachine = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [selected, setSelected] = useState({
    method: '',
    meat: '',
    sides: '',
    drink: ''
  });

  const [rollingIntervals, setRollingIntervals] = useState({});
  const dispatch = useDispatch();
  const options = useSelector((state) => state.options);

  const startRoll = () => {
    setIsRolling(true);

    // 开始滚动，每个块设置不同的滚动速度
    const methodInterval = setInterval(() => {
      const method = getRandomItem(options.methods);
      setSelected(prev => ({ ...prev, method }));
    }, 100); // method 的滚动速度

    const meatInterval = setInterval(() => {
      const meat = getRandomItem(options.meats);
      setSelected(prev => ({ ...prev, meat }));
    }, 200); // meat 的滚动速度

    const sidesInterval = setInterval(() => {
      const sides = getRandomItem(options.sides);
      setSelected(prev => ({ ...prev, sides }));
    }, 300); // sides 的滚动速度

    const drinkInterval = setInterval(() => {
      const drink = getRandomItem(options.drinks);
      setSelected(prev => ({ ...prev, drink }));
    }, 400); // drink 的滚动速度

    // 将各个 interval 存起来，以便停止时清除
    setRollingIntervals({ methodInterval, meatInterval, sidesInterval, drinkInterval });
  };

  const stopRoll = () => {
    setIsRolling(false);
    // 清除所有滚动的 interval
    clearInterval(rollingIntervals.methodInterval);
    clearInterval(rollingIntervals.meatInterval);
    clearInterval(rollingIntervals.sidesInterval);
    clearInterval(rollingIntervals.drinkInterval);
  };

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const addFavorite = ({ method, meat, sides, drink }) => {
    dispatch({
      type: ADD_FAVORITE,
      payload: {
        method,
        meat,
        sides,
        drink
      }
    });
  };

  return (
    <div className="slot-machine">
      <div className={`column ${isRolling ? 'rolling' : ''}`}>
        <div>{selected.method}</div>
      </div>
      <div className={`column ${isRolling ? 'rolling' : ''}`}>
        <div>{selected.meat}</div>
      </div>
      <div className={`column ${isRolling ? 'rolling' : ''}`}>
        <div>{selected.sides}</div>
      </div>
      <div className={`column ${isRolling ? 'rolling' : ''}`}>
        <div>{selected.drink}</div>
      </div>
      
      {!isRolling ? (
        <Button onClick={startRoll}>开始</Button>
      ) : (
        <Button onClick={stopRoll}>停止</Button>
      )}

      {selected.method && !isRolling && (
        <div>
          <p>{selected.method} {selected.meat} 配 {selected.sides}，饮料：{selected.drink}</p>
          <button onClick={() => addFavorite(selected)}>添加到收藏</button>
        </div>
      )}
    </div>
  );
};

export default SlotMachine;

