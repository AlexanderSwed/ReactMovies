import React from "react";
import { Link } from "react-router";

const MovieActor = (props) => 
                (<div>
                    <Link to={`/person/${props.id}`}>
                        {
                            props.profile_path ?
                            <img src={`https://image.tmdb.org/t/p/w132_and_h132_bestv2/${props.profile_path}`} alt="" className="photo"/> :
                            <div className="photo"></div>
                        }
                    </Link>
                    <div className="movie-cast-title">
                        {props.name}
                        {
                            props.character ? <p>{props.character}</p>
                            : props.job ? <p>{props.job}</p> : ""
                        
                        }
                    </div>
                </div>
                );

export default MovieActor;