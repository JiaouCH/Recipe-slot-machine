import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_OPTION } from '../reducer';
import { type } from '@testing-library/user-event/dist/type';
import { Button } from 'antd';

const CustomOptionsForm = ({ options, setOptions }) => {
  const [newOption, setNewOption] = useState('');
  const [category, setCategory] = useState('methods');
  const dispatch = useDispatch();
  const addOptions = (types, option) => {
    dispatch({
      type: ADD_OPTION,
      payload: {
        types: types,
        option: option
      }
    });
  }

  const handleAddOption = (e) => {
    e.preventDefault();
    if (newOption.trim() === '') return;

    setOptions((prev) => ({
      ...prev,
      [category]: [...prev[category], newOption]
    }));
    setNewOption('');
  };

  return (
    <form onSubmit={handleAddOption}>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="methods">Methods</option>
        <option value="meats">Meat</option>
        <option value="sides">Sides</option>
        <option value="drinks">Drinks</option>
      </select>
      <input
        type="text"
        placeholder="Add an option"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
      />
      <Button type="primary" onClick={()=>{addOptions(category, newOption)}}>添加</Button>
    </form>
  );
};

export default CustomOptionsForm;
