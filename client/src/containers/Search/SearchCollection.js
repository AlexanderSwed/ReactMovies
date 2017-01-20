import React from "react";
import { Link } from "react-router";

import { prepareToStore } from "../../helper"

const SearchCollection = (props) => 
    (<div className="search-collection">
        {
            Object.keys(props.movies).map( key => {
                let isFavorite = props.favs.some(el => el.id.toString() === key ),
                    movie = prepareToStore(props.movies[key]);
                return (
                    <Link to={`/movie/${key}`} className="c-item blue-grey darken-3" key={key}>
                        {props.movies[key].profile_path || props.movies[key].poster_path ?
                            <img src={props.movies[key].poster_path && `https://image.tmdb.org/t/p/w640/${props.movies[key].poster_path}` } alt="" className={props.movies[key].profile_path ? "circle" : ""} />:
                            <div className="circle blue-grey darken-2"></div>}
                        <span className="title">
                            {props.movies[key].title} {props.movies[key].release_date ? ` (${props.movies[key].release_date.split('-')[0]})` : ""}
                        </span>
                        <button type="button" className={ isFavorite ? "like" : ""} onClick={(e) => props.toggleFavorite(e, movie)}>
                            <i className="material-icons center" title="Add to a list">favorite</i>
                        </button>
                    </Link>)
                }
            )
        }
        
    </div>)

export default SearchCollection;