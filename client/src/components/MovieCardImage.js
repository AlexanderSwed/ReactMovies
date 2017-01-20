import React from "react";

import { getDate } from "../helper.js"

const MovieCardImage = (props) => {
    let date;
    if (props.movie.release_date) date = getDate(props.movie.release_date);
    else if (props.movie.first_air_date) {
        date = {
            launch: getDate(props.movie.first_air_date),
            final: props.movie.last_air_date ? getDate(props.movie.last_air_date) : null
        }
    }
    return (
        <div className="card-image">
            <div className="card-poster blue-grey" >
                {
                    !props.movie.backdrop_path ? 
                    <div className="poster-dummy blue-grey darken-2" ></div> :
                    (<img onLoad={props.onBackdropLoaded}
                          src={`https://image.tmdb.org/t/p/w640${props.movie.backdrop_path}`}
                          alt={props.movie.title}/>)
                }
                <div className="poster-info">
                    <div className="movie-title">{props.movie.title}</div>
                    <div className="movie-vote">
                        {
                            props.movie.imdb_id || (props.movie.external_ids && props.movie.external_ids.imdb_id) ?
                            (<a href={`http://www.imdb.com/title/${props.movie.imdb_id || props.movie.external_ids.imdb_id}`} target="_blank">
                                <h6>Go to</h6>
                                <h6>IMDb</h6>
                                <h5>{props.movie.vote_average}</h5>
                            </a>) : <h5>{props.movie.vote_average}</h5>
                        }
                    </div>
                    { date && !date.launch ?
                        <div className="movie-date">
                            <h6>{date.year}</h6> <h5>{date.month}</h5> <h6>{date.day}</h6>
                        </div> :
                        ""
                    }
                    { date && date.launch ?
                        <div className="movie-date">
                            <h6>{date.launch.year}</h6> <h5>{date.launch.month}</h5> <h6>{date.launch.day && date.launch.day}</h6>
                            <h6>{ date.final ? "-" : props.movie.status}</h6>
                            { date.final && <h6>{date.final.year} {date.final.month} {date.final.day && date.final.day}</h6> }
                        </div> :
                        ""
                    }
                </div>
                <div className="poster-img">
                    {
                        props.movie.poster_path &&
                        (<img onLoad={props.onImageLoaded}
                              src={`https://image.tmdb.org/t/p/w640${props.movie.poster_path}`}
                              alt={props.movie.title} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default MovieCardImage;