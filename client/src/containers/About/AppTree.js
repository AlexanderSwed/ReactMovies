import React from 'react';

import "./AppTree.css";

const AppTree = props => {
    return  (
            <ul className="AppTree">
                <button type="button" onClick={props.toggleTree} title="Expand all">
                    {props.isTreeExpanded ? <i className="material-icons">visibility_off</i> : <i className="material-icons">visibility</i>}
                </button>
                <li><input type="checkbox" id="redux" defaultChecked/><label htmlFor="redux">Redux Store Provider</label>
                    <ul>
                        <li><input type="checkbox" id="router" defaultChecked/><label htmlFor="router">Router and BrowserHistory</label>
                            <ul>
                                <li><input type="checkbox" id="App" /><label htmlFor="App">App</label>
                                    <ul>
                                        <li><input type="checkbox" id="SearchBar" /><label htmlFor="SearchBar">SearchBar</label>
                                            <ul>
                                                <li className="tree-leaf tree-component">SearchSuggestions</li>
                                                <li className="tree-leaf tree-component">SearchReducer</li>
                                            </ul>
                                        </li>
                                        <li className="tree-leaf">Navigation</li>
                                        <li><input type="checkbox" id="AppChildren" /><label htmlFor="AppChildren">App children components</label>
                                            <ul>
                                                <li><input type="checkbox" id="HomeComponent" /><label htmlFor="HomeComponent">Home Page</label>
                                                    <ul>
                                                        <li className="tree-component">
                                                            <input type="checkbox" id="HomeMoviesComponent" /><label htmlFor="HomeMoviesComponent">HomeMovies</label>
                                                            <ul>
                                                                <li className="tree-leaf tree-component">HomeMovieLink</li>
                                                            </ul>
                                                        </li>
                                                        <li className="tree-component">
                                                            <input type="checkbox" id="HomePeopleComponent" /><label htmlFor="HomePeopleComponent">HomePeople</label>
                                                            <ul>
                                                                <li className="tree-leaf tree-component">MovieActor</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><input type="checkbox" id="SearchComponent" /><label htmlFor="SearchComponent">Search Page</label>
                                                    <ul>
                                                        <li className="tree-leaf tree-component">Pagination</li>
                                                        <li className="tree-leaf tree-component">SearchReducer</li>
                                                    </ul>
                                                </li>
                                                <li><input type="checkbox" id="MoviePageComponent" /><label htmlFor="MoviePageComponent">Movie Page</label>
                                                    <ul>
                                                        <li className="tree-leaf tree-component">MovieCardImage</li>
                                                        <li className="tree-leaf tree-component">MovieCardAction</li>
                                                        <li className="tree-leaf tree-component">MovieActor</li>
                                                        <li className="tree-component">
                                                            <input type="checkbox" id="MovieVideos-1" /><label htmlFor="MovieVideos-1" className="tree-component">MovieVideos</label>
                                                            <ul>
                                                                <li className="tree-leaf tree-component">Pagination</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><input type="checkbox" id="TvPageComponent" /><label htmlFor="TvPageComponent">TV Page</label>
                                                    <ul>
                                                        <li className="tree-leaf tree-component">MovieCardImage</li>
                                                        <li className="tree-leaf tree-component">MovieCardAction</li>
                                                        <li className="tree-leaf tree-component">MovieActor</li>
                                                        <li className="tree-component">
                                                            <input type="checkbox" id="MovieVideos-2" /><label htmlFor="MovieVideos-2" className="tree-component">MovieVideos</label>
                                                            <ul>
                                                                <li className="tree-leaf tree-component">Pagination</li>
                                                            </ul>
                                                        </li>
                                                        <li className="tree-component">
                                                            <input type="checkbox" id="CardSeasons" /><label htmlFor="CardSeasons" className="tree-component">CardSeasons</label>
                                                            <ul>
                                                                <li className="tree-leaf tree-component">Pagination</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><input type="checkbox" id="PersonComponent" /><label htmlFor="PersonComponent">Person Page</label>
                                                    <ul>
                                                        <li className="tree-component">
                                                            <input type="checkbox" id="MainInfo" /><label htmlFor="MainInfo" className="tree-component">MainInfo</label>
                                                            <ul>
                                                                <li className="tree-leaf tree-component">PersonSocial</li>
                                                            </ul>
                                                        </li>
                                                        <li className="tree-component">
                                                            <input type="checkbox" id="Filmography" /><label htmlFor="Filmography" className="tree-component">Filmography</label>
                                                            <ul>
                                                                <li className="tree-leaf tree-component">HomeMovieLink</li>
                                                                <li className="tree-leaf tree-component">CardCollection</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><input type="checkbox" id="CastComponent" /><label htmlFor="CastComponent">Cast Page</label>
                                                    <ul>
                                                        <li className="tree-leaf tree-component">CardPoster</li>
                                                        <li className="tree-leaf tree-component">CardCollection</li>
                                                    </ul>
                                                </li>
                                                <li><input type="checkbox" id="AboutComponent" /><label htmlFor="AboutComponent">About Page</label>
                                                    <ul>
                                                        <li className="tree-leaf tree-component">AppTree</li>
                                                    </ul>
                                                </li>
                                                <li>Lists Page</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
    );
}

export default AppTree;