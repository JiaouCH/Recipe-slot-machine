import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { TOGGLE_SELECTED_OPTIONS, DELETE_OPTIONS, OPEN_OPTION_MODAL } from '../reducer';
import { hover } from '@testing-library/user-event/dist/hover';
import OptionForm from './OptionForm';
import { type } from '@testing-library/user-event/dist/type';

const Options = () => {
    const dispatch = useDispatch();
    const optionModalVisible = useSelector((state) => state.optionModalVisible);
    const selectedOptions = useSelector((state) => state.selectedOptions);
    const options = useSelector((state) => state.options);
    const [type, setType] = useState('');

    const toggleSelectedOptions = (optionid, types) => {
        dispatch({
            type: TOGGLE_SELECTED_OPTIONS,
            payload: { optionid: optionid, types: types }
        });
    }

    const deleteOptions = (types) => {
        dispatch({
            type: DELETE_OPTIONS,
            payload: {
                types: types
            }
        });
    }

    const openAddOptionModal = () => {
        dispatch({
            type: OPEN_OPTION_MODAL
        });
    }

    return (
        <div style={styles.container}>
            <h2>Options</h2>
            <div style={styles.optionsGroupContainer}>
                <div style={styles.optionGroup}>
                    <h3>Methods</h3>
                    <div style={styles.flexContainer}>
                        {options.methods.map((method, index) => 
                            <span 
                                key={index} 
                                onClick={() => {
                                    toggleSelectedOptions(method.key, 'methods');
                                }}
                                style={selectedOptions.methods.has(method.key) ? styles.optionSelected : styles.optionUnselected}
                            >
                                {method.option}
                            </span>
                        )}
                    </div>
                    <Button onClick={() => { deleteOptions('methods') }}>delete</Button>
                    <Button onClick={() => { 
                        setType((type) => 'methods');
                        openAddOptionModal(); 
                    }}>Add Method</Button>
                </div>

                <div style={styles.optionGroup}>
                    <h3>Meats</h3>
                    <div style={styles.flexContainer}>
                        {options.meats.map((meat, index) => 
                            <span 
                                key={index} 
                                onClick={() => {
                                    toggleSelectedOptions(meat.key, 'meats');
                                }}
                                style={selectedOptions.meats.has(meat.key) ? styles.optionSelected : styles.optionUnselected}
                            >
                                {meat.option}
                            </span>
                        )}
                    </div>
                    <Button onClick={() => { deleteOptions('meats') }}>delete</Button>
                    <Button onClick={() => { 
                        setType((type) => 'methods');
                        openAddOptionModal(); 
                    }}>Add Meats</Button>
                </div>

                <div style={styles.optionGroup}>
                    <h3>Sides</h3>
                    <div style={styles.flexContainer}>
                        {options.sides.map((side, index) => 
                            <span 
                                key={index} 
                                onClick={() => {
                                    toggleSelectedOptions(side.key, 'sides');
                                }}
                                style={selectedOptions.sides.has(side.key) ? styles.optionSelected : styles.optionUnselected}
                            >
                                {side.option}
                            </span>
                        )}
                    </div>
                    <Button onClick={() => { deleteOptions('sides') }}>delete</Button>
                    <Button onClick={() => { 
                        setType((type) => 'methods');
                        openAddOptionModal(); 
                    }}>Add Sides</Button>
                </div>

                <div style={styles.optionGroup}>
                    <h3>Drinks</h3>
                    <div style={styles.flexContainer}>
                        {options.drinks.map((drink, index) => 
                            <span 
                                key={index} 
                                onClick={() => {
                                    toggleSelectedOptions(drink.key, 'drinks');
                                }}
                                style={selectedOptions.drinks.has(drink.key) ? styles.optionSelected : styles.optionUnselected}
                            >
                                {drink.option}
                            </span>
                        )}
                    </div>
                    <Button onClick={() => { deleteOptions('drinks') }}>delete</Button>
                    <Button onClick={() => { 
                        setType((type) => 'methods');
                        openAddOptionModal(); 
                    }}>Add Drinks</Button>
                </div>
                <OptionForm optionModalVisible={optionModalVisible} type={type}/>   
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '10px',
    },
    optionsGroupContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    optionGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    flexContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    optionSelected: {
        curser: 'pointer',
        backgroundColor: 'lightblue',
        margin: '5px',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid black',
    },
    optionUnselected: {
        curser: 'pointer',
        backgroundColor: 'lightgrey',
        margin: '5px',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid black',
    }
}

export default Options;
