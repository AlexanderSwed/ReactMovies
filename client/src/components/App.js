import React from 'react';

import SearchBar from "../containers/SearchBar/SearchBar";
import Nav from "./Nav";

import "./App.css"

const App = props => {
    return (
        <div className="App">
            <header>
                <div className="row blue-grey darken-2 header-title">React Movies</div>
                <SearchBar/>
                <Nav/>
            </header>
            <main>
                <div className="row main-content">
                    {props.children}
                </div>
            </main>
        </div>
    );
}
    

export default App;