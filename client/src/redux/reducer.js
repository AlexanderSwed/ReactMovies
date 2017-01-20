import { combineReducers } from "redux"
import { routerReducer } from 'react-router-redux';

import favsReducer from "./favs/favsReducer";
import { loadLocalStorageState } from "../helper";
import searchReducer from "./search/searchReducer";

const INIT_STATE = {
    favs: loadLocalStorageState
}

const reducer = combineReducers({
    favs: favsReducer,
    routing: routerReducer,
    search: searchReducer
}, INIT_STATE);

export default reducer;