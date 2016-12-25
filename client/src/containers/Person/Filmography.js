import React from "react";

import HomeMovieLink from "../../components/HomeMovieLink"
import CardCollection from "../CardCollection/CardCollection"

import { toggleReveal } from "../../helper.js"

const Filmography = (props) => {
    return (
        <div className="card large reveal">
            <div className="card-content">
                <div className="card-title activator grey-text text-darken-4" onClick={toggleReveal}>
                    { props.header }
                    { props.data.length > 5 ? <button type="button" className="activator right">view all</button> : ""}
                </div>
                <div className="Home-content">
                    {
                        props.data.slice(0,6).map( (el, i) => {
                            let movie =
                            {
                                title: el.title ? el.title : el.name,
                                poster_path: el.poster_path ? `https://image.tmdb.org/t/p/w640${el.poster_path}` : null,
                                link: `/${el.media_type}/${el.id}`
                            }
                            return <HomeMovieLink movie={movie} key={i}/>;
                        })
                    }
                </div>
            </div>
            <div className="card-reveal">
                <div className="card-title activator" onClick={toggleReveal}>Filmography<i className="material-icons right">close</i></div>
                <CardCollection collection={props.data} mapCollection={props.mapCollection} />
            </div>
        </div>
    );
}

export default Filmography;