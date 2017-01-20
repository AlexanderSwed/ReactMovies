import React from 'react';

import nullResults from "../containers/Search/410.png";

const NotFound = props => {
    return  (
        <div className="col s12 m10 offset-m1 l6 offset-l3">
            <div className="card large SearchPage">
               <h1>404 Not Found</h1>
                <img src={nullResults} alt="Nothing found"/>
            </div>
        </div>
        );
}

export default NotFound;

