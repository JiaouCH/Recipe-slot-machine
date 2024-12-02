import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel, Button } from 'antd';
import { ADD_FAVORITE } from '../reducer';
import './SlotMachineModify.css'; // 引入自定义样式

const SlotMachine = () => {
  const [isRolling, setIsRolling] = useState(false);
  const dispatch = useDispatch();
  const options = useSelector((state) => state.options);
  const MethodRef = useRef(null);
  const MeatRef = useRef(null);
  const SidesRef = useRef(null);
  const DrinkRef = useRef(null);
  const [selected, setSelected] = useState({
    method: '',
    meat: '',
    sides: '',
    drink: ''
    });
  
  const startRoll = () => {
    setIsRolling(true);
  };
  
  const stopRoll = (methodslide, meatslide, sideslide, drinkslide) => {
    setIsRolling(false);
    setSelected({
        method: options.methods[methodslide],
        meat: options.meats[meatslide],
        sides: options.sides[sideslide],
        drink: options.drinks[drinkslide]
    });
  };

  const addFavorite = ({ method, meat, sides, drink }) => {
    dispatch({
      type: ADD_FAVORITE,
      payload: {
        method: method.option,
        meat: meat.option,
        sides: sides.option,
        drink: drink.option
      }
    });
  }

  // 样式内容
  const contentStyle = {
    margin: 0,
    height: '160px',
    color: 'black',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#89B9AD',
    borderRadius: '10px',
    border: '3px solid #fff',
    fontSize: '1.2rem',
    fontFamily: 'Georgia, Helvetica, Arial, sans-serif',
    color: '#4A4A4A',
  };

  const contentStyleColor2 = {
    background: '#FFC5C5'
  }

  const contentStyleColor3 = {
    background: '#C7DCA7'
  }

  const contentStyleColor4 = {
    background: '#ADD8E6'
  }

  return (
    <div className="slot-machine-container">
      <div className="carousel-wrapper">
        <Carousel autoplay={isRolling} vertical autoplaySpeed={670} dots={false} ref={MethodRef}>
          {options.methods.map((method, index) => (
            <div key={index}>
              <h3 style={contentStyle}>{method.option}</h3>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="carousel-wrapper">
        <Carousel autoplay={isRolling} vertical autoplaySpeed={450} dots={false} ref={MeatRef}> 
          {options.meats.map((meat, index) => (
            <div key={index}>
              <h3 style={{...contentStyle, ...contentStyleColor2}}>{meat.option}</h3>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="carousel-wrapper">
        <Carousel autoplay={isRolling} vertical autoplaySpeed={360} dots={false} ref={SidesRef}>
          {options.sides.map((sides, index) => (
            <div key={index}>
              <h3 style={{...contentStyle, ...contentStyleColor3}}>{sides.option}</h3>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="carousel-wrapper">
        <Carousel autoplay={isRolling} vertical autoplaySpeed={570} dots={false} ref={DrinkRef}>
          {options.drinks.map((drink, index) => (
            <div key={index}>
              <h3 style={{...contentStyle, ...contentStyleColor4}}>{drink.option}</h3>
            </div>
          ))}
        </Carousel>
      </div>

      {/* 开始和停止按钮 */}
      {!isRolling ? (
        <div>
            <Button onClick={startRoll}>Start Rolling</Button>
            <Button onClick={() => { addFavorite(selected) }}>Add Favorite</Button>
        </div>
      ) : (
            <Button onClick={() => {
                stopRoll(
                    MethodRef.current.innerSlider.state.currentSlide,
                    MeatRef.current.innerSlider.state.currentSlide,
                    SidesRef.current.innerSlider.state.currentSlide,
                    DrinkRef.current.innerSlider.state.currentSlide
                )}}>Stop Rolling</Button>
      )}
    </div>
  );
};

export default SlotMachine;
