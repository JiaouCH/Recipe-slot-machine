// name action types
const UPDATE_FAVORITE = 'UPDATE_FAVORITE';
const ADD_FAVORITE = 'ADD_FAVORITE';
const DELETE_FAVORITE = 'DELETE_FAVORITE';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL'; 
const ADD_OPTION = 'ADD_OPTION'; 
const DELETE_OPTIONS = 'DELETE_OPTIONS'; 
const ADD_SELECTED_OPTIONS = 'ADD_SELECTED_OPTIONS'; 
const DELETE_SELECTED_OPTIONS = 'DELETE_SELECTED_OPTIONS'; 
const OPEN_OPTION_MODAL = 'OPEN_OPTION_MODAL'; 
const CLOSE_OPTION_MODAL = 'CLOSE_OPTION_MODAL'; 
const TOGGLE_SELECTED_OPTIONS = 'TOGGLE_SELECTED_OPTIONS'; 


/**
 * load favorites from local storage, if the favorites array is not in local storage, create a new favorites array to initialize the state
 * 
 *
 * @return {Array} - favorites array
 * @example
 *
 *     loadFavoritesFromLocalStorage()
 */
const loadFavoritesFromLocalStorage = () => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [
        {
            method: 'None',
            meat: 'None',
            sides: 'None',
            drink: 'None',
            key: Date.now()
        }
    ];
};


/**
 * initailize options help generate key for each option, return the options with keys assigned for each option, so that we can do crud on options
 * 
 *
 * @return {Object} - options object with four arrays of options
 * @example
 *
 *     initializeOptions()
 */
const initializeOptions = () => {
    const generateItems = (arr) =>
      arr.map(option => ({ option, key: Date.now() + Math.random() }));
    return {
      methods: generateItems(['boil', 'steam', 'fry', 'grill', 'roast', 'sauté', 'stir-fry', 'simmering', 'poaching', 'stewing']),
      meats: generateItems(['beef brisket', 'chicken wings', 'pork chop', 'lamb leg', 'fish fillet', 'beef steak', 'pork ribs', 'lamb shank', 'fish steak', 'crabs', 'lobsters', 'mussels', 'oysters', 'scallops', 'shrimps', 'squids', 'schallops', 'turkey', 'pheasant', 'duck', 'chicken brisket']),
      sides: generateItems(['rice', 'chips', 'salad', 'noodles', 'mashed potatoes', 'Greek Salad', 'Macaroni and Cheese', 'Baked beans', 'dumplings', 'pasta salad', 'coleslaw', 'cornbread', 'garlic bread', 'french fries', 'onion rings']),
      drinks: generateItems(['iced tea', 'cola', 'apple juice', 'chocolate milk', 'coffee', 'beer', 'spirit', 'milkshake', 'lemonade', 'soda', 'water']),
    };
  };

/**
 * load options from the local storage, if the local storage does not have options key, then initialize the options using predefined options
 * 
 *
 * @return {Object} - options object with four arrays of options
 * @example
 *
 *     initializeOptions()
 */
const loadFoodOptionsFromLocalStorage = () => {
    const savedOptions = localStorage.getItem('options');
    return savedOptions ? JSON.parse(savedOptions) : initializeOptions();
};

const initialFavoriteState = {
    favorites: loadFavoritesFromLocalStorage(), // load favorites from local storage or using predefined favorites (None none with none, none)
    options: loadFoodOptionsFromLocalStorage(), // load options from local storage or using predefined options
    isModalVisible: false, // the favorite form modal visibility
    selectedFavorite: null, // selected favorite to be edited
    selectedOptions: {  // id of selected options to be deleted
        methods: new Set(), //set is used to avoid duplicate option id
        meats: new Set(),
        sides: new Set(),
        drinks: new Set()
    },
    optionModalVisible: false, // the option form modal visibility
};

/**
 * save favorites to local storage
 * 
 * @param {Array} favorites - favorites array
 * @return {void} 
 * @example
 *
 *     saveFavoritesToLocalStorage([{method: "grill", meat: "fish fillet", sides: "Greek Salad", drink: "apple juice", key: "1733127909566.203"}])
 */
const saveFavoritesToLocalStorage = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};



/**
 * update selected favorite according to user input value, update the entire favorites array and then save the new favorites array to local storage
 * 
 * @param {Object} state 
 * @param {number} favoriteId - Id of favorite to be edited
 * @param {string} method - method of cooking
 * @param {string} meat - meat type
 * @param {string} sides - side
 * @param {string} drink - drink
 * @return {Object} - updated state 
 * @example
 *
 *     updateFavorite(state, 1733127909566.203, 'grill', 'fish fillet', 'Greek Salad', 'apple juice')
 */
const updateFavorite = (state, favoriteId, method, meat, sides, drink) => {
    const newFavorites = state.favorites.map(favorite => 
        favorite.key === favoriteId 
        ? { method: method, meat: meat, sides: sides, drink: drink, key: favoriteId }
        : favorite
    );
    saveFavoritesToLocalStorage(newFavorites);
    return {
        ...state,
        favorites: newFavorites
    };
}

/**
 * add a new favorite according to user input value, update the entire favorites array and then save the new favorites array to local storage
 * 
 * @param {Object} state 
 * @param {number} favoriteId - Id of favorite to be edited
 * @return {Object} - updated state 
 * @example
 *
 *     addFavorite(state, 'grill', 'fish fillet', 'Greek Salad', 'apple juice')
 */
const addFavorite = (state, method, meat, sides, drink) => {
    const newFavorite = {
        method: method,
        meat: meat,
        sides: sides,
        drink: drink,
        key: Date.now() + Math.random()
    };
    const newFavorites = [...state.favorites, newFavorite];
    saveFavoritesToLocalStorage(newFavorites);
    return {
        ...state,
        favorites: [...state.favorites, newFavorite]
    };
}

/**
 * delete the favorite according to favoriteId, update the entire favorites array and then save the new favorites array to local storage
 * 
 * @param {Object} state 
 * @param {string} method - method of cooking
 * @param {string} meat - meat type
 * @param {string} sides - side
 * @param {string} drink - drink
 * @return {Object} - updated state 
 * @example
 *
 *     deleteFavorite(state, 1733127909566.203)
 */
const deleteFavorite = (state, favoriteId) => {
    const newFavorites = state.favorites.filter(favorite => favorite.key !== favoriteId);
    saveFavoritesToLocalStorage(newFavorites);
    return {
        ...state,
        favorites: newFavorites
    };
}

/**
 * open the modal by setting the isModalVisible true and set the selected favorite to be the selectedFavorite
 * 
 * @param {Object} state 
 * @param {Object} selectedFavorite - selected favorite to be edited
 * @return {Object} - updated state 
 * @example
 *
 *     openModal(state, {method: "grill", meat: "fish fillet", sides: "Greek Salad", drink: "apple juice", key: "1733127909566.203"})
 */
const openModal = (state, selectedFavorite) => {
    return {
        ...state,
        isModalVisible: true,
        selectedFavorite: selectedFavorite
    };
}

/**
 * close the modal by setting the isModalVisible false and set the selected favorite to be null
 * 
 * @param {Object} state
 * @return {Object} - updated state
 * 
 * @example
 * 
 *    closeModal(state)
 */
const closeModal = (state) => {
    return {
        ...state,
        isModalVisible: false,
        selectedFavorite: null 
    };
}

/**
 * add a new option to the selected options array, the selected options array is a set of options to be deleted, so that we can avoid duplicate options
 * 
 * @param {Object} state 
 * @returns {Object} - updated state
 */
const addSelectedOptions = (state, types, optionid) => {
    const originalSelectedOptions = state.selectedOptions;
    const newSelectedOptions = {
        ...state.selectedOptions,
        [types]: new Set([...originalSelectedOptions[types], optionid])
    };
    return {
        ...state,
        selectedOptions: newSelectedOptions
    }
}


/**
 * remove the selected option id from the selected options set, I used deep copy to avoid changing the original state
 * Set is used instead of array because the has method of Set has a lower time complexity then using for loop to traverse an array. The time complexity of Set.has is O(1) and the time complexity of array traversal is O(n).
 * 
 * @param {Object} state 
 * @param {String} types - option types (methods/meats/sides/drinks)
 * @param {Number} optionid 
 * @returns {Object} - updated state
 */
const deleteSelectedOptions = (state, types, optionid) => {
    const newSelectedOptions = {
        ...state.selectedOptions,
        [types]: new Set([...state.selectedOptions[types]])
    };
    newSelectedOptions[types].delete(optionid); // 删除项
    return {
        ...state,
        selectedOptions: newSelectedOptions
    };
};

/**
 * toggle selected options based on click times, if even times clicked, the option will be unselected, otherwise, it will be selected as an option to be deleted.
 * If the selected option id is not in the selected Options array, then add it to the selected Option array. If the selected option id is already in the selected Options array, then remove it from the selected Options array.
 * 
 * @param {Object} state 
 * @param {String} types - option types (methods/meats/sides/drinks)
 * @param {Number} optionid 
 * @returns {Object} - updated state
 */
const toggleSelectedOptions = (state, types, optionid) => {
    const originalSelectedOptions = state.selectedOptions;
    const newSelectedOptions = {
        ...state.selectedOptions,
        [types]: originalSelectedOptions[types].has(optionid) 
        ? new Set([...originalSelectedOptions[types]].filter(id => id !== optionid))
        : new Set([...originalSelectedOptions[types], optionid])
    };
    return {
        ...state,
        selectedOptions: newSelectedOptions
    };
}


/**
 * Add a new option of a given type to the options, and save the new Options to local storage
 * 
 * @param {Object} state 
 * @param {String} types 
 * @param {String} option 
 * @returns {Object} - updated state
 */
const addOptions = (state, types, option) => {
    const newOptions = {
        ...state.options,
        [types]: [...state.options[types], {option: option, key: Date.now() + Math.random()}]
    };
    localStorage.setItem('options', JSON.stringify(newOptions));
    return {
        ...state,
        options: newOptions
    };
}

/**
 * If the selected option id is in the selected Options set, then filter it out.
 * 
 * @param {Object} state 
 * @param {String} types 
 * @returns {Object} - updated state
 */ 
const deleteOptions = (state, types) => {
    const newOptions = {
        ...state.options,
        [types]: state.options[types].filter(option => !state.selectedOptions[types].has(option.key))
    };
    const newSelectedOptions = {
        ...state.selectedOptions,
        [types]: new Set()
    };
    localStorage.setItem('options', JSON.stringify(newOptions));
    return {
        ...state,
        options: newOptions,
        selectedOptions: newSelectedOptions
    };
};

/**
 * open the option modal by setting the optionModalVisible to true
 * 
 * @param {Object} state
 * @returns {Object} - updated state
 */
const openOptionModal = (state) => {
    return {
        ...state,
        optionModalVisible: true
    };
}


/**
 * close the option modal by setting the optionModalVisible to false
 * 
 * @param {Object} state
 * @returns {Object} - updated state
 */
const closeOptionModal = (state) => {
    return {
        ...state,
        optionModalVisible: false
    };
}


/**
 * The root reducer function, used for updating the state based on action type.
 * 
 * @param {Object} state
 * @param {Object} action
 * 
 * @returns {Object} - updated state
 */
function rootReducer(state = initialFavoriteState, action) {
    switch(action.type) {
        case UPDATE_FAVORITE:
            return updateFavorite(
                state, 
                action.payload.favoriteId, 
                action.payload.method, 
                action.payload.meat, 
                action.payload.sides, 
                action.payload.drink
            );
        case ADD_FAVORITE:
            return addFavorite(
                state, 
                action.payload.method, 
                action.payload.meat, 
                action.payload.sides, 
                action.payload.drink
            );
        case DELETE_FAVORITE:
            return deleteFavorite(state, action.payload.favoriteId);
        case OPEN_MODAL:
            return openModal(state, action.payload.selectedFavorite); 
        case CLOSE_MODAL:
            return closeModal(state);
        case ADD_OPTION:
            return addOptions(state, action.payload.types, action.payload.option);
        case DELETE_OPTIONS:
            return deleteOptions(state, action.payload.types);
        case ADD_SELECTED_OPTIONS:
            return addSelectedOptions(state, action.payload.types, action.payload.optionid);
        case DELETE_SELECTED_OPTIONS:
            return deleteSelectedOptions(state, action.payload.types, action.payload.optionid);
        case TOGGLE_SELECTED_OPTIONS:
            return toggleSelectedOptions(state, action.payload.types, action.payload.optionid);
        case OPEN_OPTION_MODAL:
            return openOptionModal(state);
        case CLOSE_OPTION_MODAL:
            return closeOptionModal(state);
        default:
            return state;
    }
}

export default rootReducer;
export { UPDATE_FAVORITE, ADD_FAVORITE, DELETE_FAVORITE, OPEN_MODAL, CLOSE_MODAL, ADD_OPTION, DELETE_OPTIONS, OPEN_OPTION_MODAL, CLOSE_OPTION_MODAL, TOGGLE_SELECTED_OPTIONS};
