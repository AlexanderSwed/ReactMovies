import React from "react";
import { Link } from "react-router";

const HomeMovieLink = (props) => {
    let delay = {animationDelay: `${2 + 0.2*props.index}s`};
    return (
        <div className="content-link" style={delay}>
            <Link to={props.movie.link}>
                <div className="link-img">
                    {
                        props.movie.poster_path ?
                        <img src={props.movie.poster_path} className="poster" alt=""/> :
                        <span className="content-badge poster-dummy">
                            <h4>{props.movie.title}</h4>
                            <h6>(Poster is not available yet)</h6>
                        </span>
                    }
                    {
                        props.movie.votes ?
                        <span className="content-badge">
                            <h5>{props.movie.title}</h5>
                            <h6>IMDb: {props.movie.votes}</h6>
                            <h6>({props.movie.vote_count} votes)</h6>
                        </span>
                        : ""
                    }
                    {
                        props.movie.release_date && props.movie.poster_path ?
                        <span className="content-badge">
                            <h5>{props.movie.title}</h5>
                            <h6>{props.movie.release_date.year}, {props.movie.release_date.month} {props.movie.release_date.day}</h6>
                        </span>
                        : ""
                    }
                </div>
            </Link>
        </div>
    );
}

export default HomeMovieLink;