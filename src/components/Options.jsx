import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { TOGGLE_SELECTED_OPTIONS, DELETE_OPTIONS, OPEN_OPTION_MODAL } from '../reducer';
import OptionForm from './OptionForm';

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
            <h2 style={styles.header}>Options</h2>
            <div style={styles.optionsGroupContainer}>
                {['methods', 'meats', 'sides', 'drinks'].map((type, index) => (
                    <div key={index} style={styles.optionGroup}>
                        <h3 style={styles.optionGroupHeader}>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                        <div style={styles.flexContainer}>
                            {options[type].map((option, index) => (
                                <span 
                                    key={index} 
                                    onClick={() => {
                                        toggleSelectedOptions(option.key, type);
                                    }}
                                    style={selectedOptions[type].has(option.key) ? styles.optionSelected : styles.optionUnselected}
                                >
                                    {option.option}
                                </span>
                            ))}
                        </div>
                        <div style={styles.buttonContainer}>
                            <Button onClick={() => { deleteOptions(type) }} style={styles.deleteAddButton}>Delete</Button>
                            <Button onClick={() => { 
                                setType(type);
                                openAddOptionModal(); 
                            }} style={styles.deleteAddButton}>Add {type.charAt(0).toUpperCase() + type.slice(1)}</Button>
                        </div>
                    </div>
                ))}
                <OptionForm optionModalVisible={optionModalVisible} type={type} />   
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '10px',
    },
    header: {
        fontFamily: 'Georgia, Helvetica, Arial, sans-serif',
        color: '#4A4A4A',
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    optionsGroupContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginTop: '20px',
    },
    optionGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px',
        borderRadius: '8px',
        background: '#F6D6D6',  
        border: '3px solid #fff',
    },
    optionGroupHeader: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: '"Arial", sans-serif',
        marginBottom: '10px',
        textAlign: 'center',
    },
    flexContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    optionSelected: {
        cursor: 'pointer',
        backgroundColor: 'lightblue',
        margin: '5px',
        padding: '5px',
        borderRadius: '5px',
        border: '3px solid black',
    },
    optionUnselected: {
        cursor: 'pointer',
        backgroundColor: '#F0FFFF',
        margin: '5px',
        padding: '5px',
        borderRadius: '5px',
        border: '3px solid white',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
        marginTop: '10px',
    },
    deleteAddButton: {
        padding: '5px 15px',
        backgroundColor: '#3AA6B9', 
        border: '1px solid #fff',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '45%',
        color: 'white',
    },
};

export default Options;
