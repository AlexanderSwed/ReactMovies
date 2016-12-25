import { API_KEY, fetchData } from "../../helper.js"

const setSearchMovies = (data) => {
    return {
        type: "SEARCH",
        payload: data
    }
}

const prepareData = (response, query) => {
    if (response.results.length > 0) {
        let moviesData = response.results.map(el => {
            return {
                id: el.id,
                media_type: el.media_type,
                name: el.title ? el.title : el.name,
                poster_path: el.poster_path ? `https://image.tmdb.org/t/p/w640${el.poster_path}` : null,
                profile_path: el.profile_path ? `https://image.tmdb.org/t/p/w132_and_h132_bestv2/${el.profile_path}` : null,
                release_date: el.release_date ? el.release_date.split('-')[0] : null
            }
        });
        return {
            moviesData,
            total_pages: response.total_pages,
            total_results: response.total_results,
            page: response.page,
            query
        }
    }
    else return {
        total_results: 0,
        query
    }
};

export function search(query, callback = () => {}) {
    let request = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`;
    return function (dispatch) {
        return fetchData(request)
                .then(res => prepareData(res, query))
                .then(res => {
                    dispatch(setSearchMovies(res))
                })
                .then(callback)
                .catch(err => {
                    console.log(err);
                });
    };
}

export function cleanSearchState() {
    return {
        type: "SEARCH",
        payload: {
                total_pages: 0,
                moviesData: [],
                total_results: 0,
                page: 1,
                query: ""
            }
    };
}