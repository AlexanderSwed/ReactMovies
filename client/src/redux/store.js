import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import reducer from "./reducer";

import throttle from "lodash/throttle";
import { setLocalStorageState, loadLocalStorageState } from "../helper"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose, middleware = [thunk];

const INIT_STATE = {
    favs: loadLocalStorageState(),
};

const store = createStore(reducer, INIT_STATE, composeEnhancers(applyMiddleware(...middleware)));

store.subscribe( throttle( () => {
    setLocalStorageState( { favs: store.getState().favs } )
}, 1000) )

export default store;