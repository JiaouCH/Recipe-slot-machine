import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel, Button } from 'antd';
import { ADD_FAVORITE } from '../reducer';
import './SlotMachineModify.css'; 

/**
   * SlotMachine component is mainly used for rolling the methods, meats, sides, and drinks, allowing users to stop the rolling and add the random generated options to the favorites.
   *
   * 
   * @return {JSX.Element}
   * @example
   *
   *     SlotMachine()
   */
const SlotMachine = () => {
  const [isRolling, setIsRolling] = useState(false); // isRolling a state to control the autoplay property of the Carousel
  const dispatch = useDispatch();
  const options = useSelector((state) => state.options);
  const MethodRef = useRef(null); // useRef are to get a reference to the current slice of the Carousel
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
  
  /**
   * Stop the rolling, by setting the isRolling to false (a state controlling the autoplay of the Carousel) and setting the current random generated recipe (the "selected" state) to current slice of Carousel.
   *
   * @param {number} methodslide - current slide of the method Carousel
   * @param {number} meatslide - current slide of the meat Carousel
   * @param {number} sideslide - current slide of the sides Carousel
   * @param {number} drinkslide - current slide of the drink Carousel
   * @return {JSX.Element}
   * @example
   *
   *     stopRoll(2,3,4,2)
   */
  const stopRoll = (methodslide, meatslide, sideslide, drinkslide) => {
    console.log(methodslide, meatslide, sideslide, drinkslide);
    setIsRolling(false);
    setSelected({
        method: options.methods[methodslide],
        meat: options.meats[meatslide],
        sides: options.sides[sideslide],
        drink: options.drinks[drinkslide]
    });
  };

  /**
   * Dispatch the ADD_FAVORITE action with the selected recipe as payload, which will add the selected recipe to the favorites state.
   *
   * @param {string} method - method of cooking
   * @param {string} meat - meat type
   * @param {string} sides - side
   * @param {string} drink - drink
   * @return {JSX.Element}
   * @example
   *
   *     addFavorite({method: "grill", meat: "fish fillet", sides: "Greek Salad", drink: "apple juice"})
   */
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

  const contentStyle = {
    margin: 0,
    height: '160px',
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
          {/* autoplay Speed different to make the random generation possible */}
          {/* MethodRef used for accessing the current slide of the Carousel */}
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

      {/* conditional rendering the start rolling button, stop rolling button and add favorite button */}
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
