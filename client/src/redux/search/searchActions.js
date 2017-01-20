import { normalize } from "normalizr";

import { INIT_SEARCH_STATE } from "./searchReducer"
import { API_KEY, fetchData } from "../../helper"
import { movies } from "../../schema"

const setSearchMovies = (data) => {
    return {
        type: "SEARCH",
        payload: data
    }
}

export function search(query, callback = () => {}) {
    let request = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    return function (dispatch) {
        return fetchData(request)
                .then( res => {
                    let data = normalize(res, { results: movies });
                    data.result.query = query;
                    return data;
                    
                })
                .then( data => dispatch(setSearchMovies(data)) )
                .then(callback)
                .catch(err => {
                    console.log(err);
                });
    };
}

export function cleanSearchState() {
    return {
        type: "SEARCH",
        payload: INIT_SEARCH_STATE
    };
}