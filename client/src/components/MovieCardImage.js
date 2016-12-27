import React from "react";

const MovieCardImage = (props) => {
    return (
        <div className="card-image">
            <div className="card-poster blue-grey" >
                {
                    !props.movie.backdrop_path ? 
                    <div className="poster-dummy blue-grey darken-2" ></div> :
                    (<img onLoad={props.onBackdropLoaded} src={props.movie.backdrop_path} alt={props.movie.title}/>)
                }
                <div className="poster-info">
                    <div className="movie-title">{props.movie.title}</div>
                    <div className="movie-vote">
                        <a href={props.movie.link} target="_blank">
                            <h6>Go to</h6>
                            <h6>IMDb</h6>
                            <h5>{props.movie.vote_average}</h5>
                        </a>
                    </div>
                    { props.movie.release_date ?
                        <div className="movie-date">
                            <h6>{props.movie.release_date.year}</h6> <h5>{props.movie.release_date.month}</h5> <h6>{props.movie.release_date.day}</h6>
                        </div> :
                        ""
                    }
                    { props.movie.first_air_date && !props.movie.last_air_date ?
                        <div className="movie-date">
                            <h6>{props.movie.first_air_date.year}</h6> <h5>{props.movie.first_air_date.month}</h5> <h6>{props.movie.first_air_date.day && props.movie.first_air_date.day}</h6>
                            <h6>{props.movie.status}</h6>
                        </div> :
                        ""
                    }
                    { props.movie.first_air_date && props.movie.last_air_date ?
                        <div className="movie-date">
                            <h6>{props.movie.first_air_date.year} {props.movie.first_air_date.month} {props.movie.first_air_date.day && props.movie.first_air_date.day}</h6>
                            <h6>-</h6>
                            <h6>{props.movie.last_air_date.year} {props.movie.last_air_date.month} {props.movie.last_air_date.day && props.movie.last_air_date.day}</h6>
                        </div> :
                        ""
                    }
                </div>
                <div className="poster-img">
                    {
                        props.movie.poster_path &&
                        (<img onLoad={props.onImageLoaded} src={props.movie.poster_path} alt={props.movie.title} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default MovieCardImage;