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

  /**
   * Form included in a modal used for adding a new Favorite or editing an existing form.
   *
   * @param {number} favoriteId - Id of favorite to be deleted
   * @return {void}
   * @example
   *
   *     deleteFavorite(1733127909566.203)
   */
  const deleteFavorite = (favoriteId) => {
    dispatch({
        type: DELETE_FAVORITE,
        payload: { favoriteId: favoriteId },
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Favorites</h2>
      <div style={styles.favoritesGroupContainer}>
        <div style={styles.favoriteGroup}>
          <List
            dataSource={favorites}
            renderItem={(item, index) => (
              <List.Item key={index} style={styles.favoriteItem}>
                <span 
                  // when user click a favorite, it will automatically open the form modal by dispatching the OPEN_MODAL action and setting the payload to be the selected Favorite item.
                  onClick={() => dispatch({ type: OPEN_MODAL, payload: { selectedFavorite: item } })} 
                  style={styles.favoriteText}
                >
                  {item.method} {item.meat} with {item.sides}, {item.drink}
                </span>
                <i 
                  className="fa-solid fa-trash-can" 
                  onClick={() => { deleteFavorite(item.key) }} 
                  style={styles.deleteIcon}
                ></i>
              </List.Item>
            )}
          />
        </div>
        <Button 
          type="primary" 
          // when user click the Add Favorite button, it will automatically open the form modal by dispatching the OPEN_MODAL action and setting the payload to be null.
          onClick={() => dispatch({ type: OPEN_MODAL, payload: { selectedFavorite: null } })}
          style={styles.addButton}
        >
          Add Favorite
        </Button>
        <FavoriteDetail favorite={selectedFavorite} visible={isModalVisible} />
      </div>
    </div>
  );
};

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
  favoritesGroupContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
    marginTop: '20px',
  },
  favoriteGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
    borderRadius: '8px',
    background: '#F6D6D6',  
    border: '3px solid #fff',
  },
  favoriteGroupHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: '"Arial", sans-serif',
    marginBottom: '10px',
    textAlign: 'center',
  },
  favoriteItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    background: '#FFFFFF',  
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  favoriteText: {
    cursor: 'pointer',
    fontSize: '16px',
  },
  deleteIcon: {
    cursor: 'pointer',
    fontSize: '18px',
    color: '#000',  
  },
  addButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#3AA6B9',  
    border: '1px solid #fff',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    width: '50%',  
    alignSelf: 'flex-start',  
  },
};

export default Favorites;
