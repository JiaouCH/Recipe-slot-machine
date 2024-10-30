import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, List } from 'antd';
import { OPEN_MODAL } from '../reducer';
import FavoriteDetail from './FavoriteDetail';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { DELETE_FAVORITE } from '../reducer';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites); 
  const selectedFavorite = useSelector((state) => state.selectedFavorite); 
  const isModalVisible = useSelector((state) => state.isModalVisible); 
  const deleteFavorite = (favoriteId) => {
    dispatch({
        type: DELETE_FAVORITE,
        payload: { favoriteId: favoriteId },
    });
};

  return (
    <div>
      <h2>Favorites</h2>
        <List
          dataSource={favorites}
          renderItem={(item, index) => (
            <List.Item
              key={index}
            >
              <span 
                onClick={() => dispatch({ type: OPEN_MODAL, payload: { selectedFavorite: item } })} 
                style={{ cursor: 'pointer' }}
              >{item.method} {item.meat} with {item.sides}, {item.drink}</span>
              <i className="fa-solid fa-trash-can" onClick={ () => { deleteFavorite(item.key) } } style={{ cursor: 'pointer' }}></i>
            </List.Item>
          )}
        />
        <Button type='primary' onClick={() => dispatch({ type: OPEN_MODAL, payload: { selectedFavorite: null } })}>Add Favorite</Button>
        <FavoriteDetail favorite={selectedFavorite} visible={isModalVisible} />
    </div>
  );
};

export default Favorites;
