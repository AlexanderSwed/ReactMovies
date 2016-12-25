import React from "react";

const CardPoster = (props) => {
    return (
        <div className="card-image">
            <div className="card-poster blue-grey" >
                {
                    !props.backdrop_path ? 
                    <div className="poster-dummy blue-grey darken-2" ></div> :
                    (<img onLoad={props.onBackdropLoaded} src={props.backdrop_path} alt={props.title}/>)
                }
                <div className="poster-info">
                    <div className="movie-title">{props.title}</div>
                </div>
            </div>
        </div>
    );
}

export default CardPoster;