import React from "react";
import { Link } from "react-router"

const SearchSuggestions = (props) => {
    if (props.movies.length  > 0) {
        let moviesList = props.movies.map(
                (mov, i) => (
                            <Link to={`/${mov.media_type}/${mov.id}`}
                                key={i}
                                onClick={() => props.handleSelect()}
                                className="collection-item">{mov.title ? mov.title : mov.name} 
                                {mov.release_date ? ` (${mov.release_date.split('-')[0]})` : ''}
                            </Link>
                        )
                
            )
        return (<div className="collection results">
                    { moviesList }
                    { props.total > 1 && <Link to={`/search/${props.query}`} className="collection-item" onClick={() => props.handleSelect()} >All {props.total} results</Link> }
                </div>);
    }
    else return null;
}

export default SearchSuggestions;