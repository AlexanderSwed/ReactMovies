/*const getMovies = () => {
    fetch('/api/movies', {method: "GET"})
    .then(res => res.json())
    .then(res => {return res;})
};

const removeMovie = (id) => {
    fetch(`/api/movies/${id}`, {method: "DELETE"})
    .then(res => res.json())
    .then(res => {console.log(res); return res;})
}

const addMovie = (body) => {
    fetch(`/api/movies`, {method: "POST", body})
    .then(res => res.json())
    .then(res => {console.log(res); return res;})
}*/

import "../../redux/storageDummy.js";

export function getFavs() {
    return {
        type: "GET_FAVS",
        payload: window.dataStorage.favs
    };
}

export function toggleFavMovie(mov, state) {
    if (state) {
        return {
            type: "REMOVE_FAV",
            payload: window.dataStorage.removeFav(mov.id)
        };
    }
    return {
        type: "ADD_FAV",
        payload: window.dataStorage.addFavs(mov)
    };
}

/*export function deleteMovie(moviesList, id) {
    let movie_index = moviesList.findIndex((el, ind) => ind === id),
        movies = [...moviesList.slice(0, movie_index), ...moviesList.slice(movie_index + 1)];
    return {
        type: "DELETE_MOVIE",
        payload: movies
    };
}*/