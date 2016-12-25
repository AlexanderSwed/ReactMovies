import { combineReducers } from "redux"

import listsReducer from "./lists/listsReducer";
import searchReducer from "./search/searchReducer";
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
    data: listsReducer,
    routing: routerReducer,
    search: searchReducer
});

export default reducer;