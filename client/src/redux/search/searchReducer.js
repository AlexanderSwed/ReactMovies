export const INIT_SEARCH_STATE = {
    entities: {},
    result: {
        page: 1,
        results: [],
        total_pages: -1,
        total_results: 0,
        query: ''
    }
}

const searchReducer =  (
    state = INIT_SEARCH_STATE, action) => {
                switch (action.type) {
                    case "SEARCH":
                        return Object.assign( {}, state, action.payload );
                    default:
                        return state;
                }
};

export default searchReducer;