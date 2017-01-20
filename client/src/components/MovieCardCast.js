import React from "react";
import { Link } from "react-router";

import MovieActor from "./MovieActor"

const MovieCardCast = (props) => 
    (<div className="card large card-cast">
        <h2>Cast:</h2>
        <div className="movie-cast">
            { props.cast.map((el, i) => (<MovieActor key={i} id={el.id} profile_path={el.profile_path} name={el.name} character={el.character}/>) )}
        </div>
        {
            props.cast.length > 5 &&
            (<div className="card-action">
                <Link to={`/movie/${props.id}/cast`}>View all</Link>
            </div>)
        }
    </div>)

export default MovieCardCast;