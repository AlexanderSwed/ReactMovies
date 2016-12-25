const favsReducer =  (
    state = {
                favorites: []
            }, action) => {
    switch (action.type) {
        case "GET_FAVS":
            return Object.assign({}, state, { favorites: action.payload });
        case "ADD_FAV":
            return Object.assign({}, state, { favorites: action.payload });
        case "REMOVE_FAV":
            return Object.assign({}, state, { favorites: action.payload });
        default:
            return state;
    }
};

export default favsReducer;