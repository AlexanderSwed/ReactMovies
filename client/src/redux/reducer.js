import { combineReducers } from "redux"
import { routerReducer } from 'react-router-redux';

import favsReducer from "./favs/favsReducer";
import searchReducer from "./search/searchReducer";

const reducer = combineReducers({
    favs: favsReducer,
    routing: routerReducer,
    search: searchReducer
});

export default reducer;