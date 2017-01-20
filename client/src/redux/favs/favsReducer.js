const favsReducer =  ( state = [], action) => {
    switch (action.type) {
        case "TOGGLE_FAV":
            let index = state.findIndex(el => el.id === action.payload.id),
                newState = index === -1 ? [...state, action.payload] : state.filter(el => el.id !== action.payload.id);
            return newState;
        default:
            return state;
    }
};

export default favsReducer;