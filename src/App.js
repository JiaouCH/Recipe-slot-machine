import React from 'react';
import SlotMachine from './components/SlotMachine_Modify';
import Favorites from './components/Favorites';
import './App.css';  
import { Provider } from 'react-redux'; 
import store from './store'; 
import Options from './components/Options';

/**
 * App function.
 *
 * @return {JSX.Element}
 * @example
 *
 *     App()
 */
const App = () => {
  return (
    <Provider store={store}> 
    <div style={styles.wrap}>
      <div style={styles.container}> 
      <h1 style={styles.header}>Recipe Slot Machine</h1>
      <div className="app">
        <SlotMachine/>
        <Favorites />  
        <Options />
      </div>
      </div>
      </div>
    </Provider>
  );
};

export default App;

const styles = {
  header: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#4A4A4A',
    fontFamily: 'Georgia, Helvetica, Arial, sans-serif',
  },
  container: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '50px',
  },
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#D7C3F1',
  },
};
