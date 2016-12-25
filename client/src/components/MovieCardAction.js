import React from "react";

const showTip = (event) => {
    event.target.classList.toggle("share-clicked");
    let tip = event.target.parentElement.nextSibling;
    tip.classList.toggle("show-tip");
};

const MovieCardAction = (props) => {
    return (
        <div className="card-action">
            <button type="button" onClick={showTip}>
                <i className="material-icons center"
                    title="Share">share</i>
            </button>
            <span className="blue-grey darken-2 share-tip">Link to this page: <h6>{props.url}</h6></span>
            <button type="button" onClick={props.toggleFavorite}>
                <i className={"material-icons center" + (props.is_favorite ? " favorite" : '')}
                    title="Add to favorites">favorite</i>
            </button>
        </div>
    );
}

export default MovieCardAction;