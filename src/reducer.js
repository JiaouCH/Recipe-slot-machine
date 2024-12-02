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

// initial state: initial states are props for rootreducer, so that the reducer is able to initialize the state 
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

// initailize options help generate key for each option, return the options with keys, so that we can do crud on options
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

const loadFoodOptionsFromLocalStorage = () => {
    const savedOptions = localStorage.getItem('options');
    return savedOptions ? JSON.parse(savedOptions) : initializeOptions();
};

// initial state
const initialFavoriteState = {
    favorites: loadFavoritesFromLocalStorage(), 
    options: loadFoodOptionsFromLocalStorage(), 
    isModalVisible: false,
    selectedFavorite: null,
    selectedOptions: {
        methods: new Set(),
        meats: new Set(),
        sides: new Set(),
        drinks: new Set()
    },
    optionModalVisible: false,
};

// Helper function to save favorites to localStorage
const saveFavoritesToLocalStorage = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};


// update state if the action is of the type UPDATE_FAVORITE
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

// update state if the action is of the type ADD_FAVORITE
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

// update state if the action is of the type DELETE_FAVORITE
const deleteFavorite = (state, favoriteId) => {
    const newFavorites = state.favorites.filter(favorite => favorite.key !== favoriteId);
    saveFavoritesToLocalStorage(newFavorites);
    return {
        ...state,
        favorites: newFavorites
    };
}

const openModal = (state, selectedFavorite) => {
    return {
        ...state,
        isModalVisible: true,
        selectedFavorite: selectedFavorite
    };
}

const closeModal = (state) => {
    return {
        ...state,
        isModalVisible: false,
        selectedFavorite: null 
    };
}

const openAddOptionModal = (state) => {
    return {
        ...state,
        optionModalVisible: true,
    };
}

const closeAddOptionModal = (state) => {
    return {
        ...state,
        optionModalVisible: false,
    };
}

// add new selected options to be deleted
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

// delete selected options from selected options array, I used deep copy to avoid changing the original state
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

//toggle selected options based on click times, if even times clicked, the option will be unselected, otherwise, it will be selected as an option to be deleted.
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


// add options 更新完成
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

// delete options 
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

const openOptionModal = (state) => {
    return {
        ...state,
        optionModalVisible: true
    };
}

const closeOptionModal = (state) => {
    return {
        ...state,
        optionModalVisible: false
    };
}

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
        case OPEN_OPTION_MODAL:
            return openAddOptionModal(state);
        case CLOSE_OPTION_MODAL:
            return closeAddOptionModal(state);
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
