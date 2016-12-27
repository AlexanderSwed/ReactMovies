import React from "react"

import MovieVideos from "../MovieVideos/MovieVideos"

import "./Lists.css"

class Lists extends React.Component {

    componentDidMount() {
        document.title = "Lists"
    }

    render() {
        return (
            <div className="col s12 m10 offset-m1 l6 offset-l3 card-videos Lists">
                <div className="card large not-ready">
        I am sorry, it isn't implemented yet. Hope, it is never too late :)
                </div>
                <MovieVideos videos={[{ key: "ZSM3w1v-A_Y" }]} />
            </div>
        );
    }
};

export default Lists;
