import { createStore } from 'redux';
import rootReducer from './reducer';  // 假设你的 reducer 文件名为 'reducer.js'

// 创建 Redux store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 如果你需要 Redux DevTools
);

export default store;
