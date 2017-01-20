import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import reducer from "./reducer";

import throttle from "lodash/throttle";
import { setLocalStorageState } from "../helper"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose, middleware = [thunk];

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

store.subscribe( throttle( () => {
    setLocalStorageState( { favs: store.getState().favs } )
}, 1000) )

export default store;