import React from "react";
import { Link } from "react-router"

const SearchSuggestions = (props) => {
    if (props.movies.length  > 0) {
        let moviesList = props.movies.map(
                (el) => (
                            <Link to={`/movie/${el.id}`}
                                key={el.id}
                                onClick={() => props.handleSelect()}
                                className="collection-item">{el.title ? el.title : el.name} 
                                {el.release_date ? ` (${el.release_date.split('-')[0]})` : ''}
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