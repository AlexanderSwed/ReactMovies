const searchReducer =  (
    state = {
                total_pages: 0,
                moviesData: [],
                total_results: -1,
                page: 1,
                query: ""
            }, action) => {
                switch (action.type) {
                    case "SEARCH":
                        return Object.assign({},
                                            state,
                                            action.payload
                                            );
                    default:
                        return state;
                }
};

export default searchReducer;