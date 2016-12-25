import React from "react";
import { Link } from "react-router";

import CardCollection from "../CardCollection/CardCollection"
import { API_KEY, fetchData } from "../../helper.js"

class PersonCast extends React.Component {

    constructor(props) {
        super(props);
        this.id = props.params.id;
        this.state = {
            title: "",
            backdrop_path: "",
            cast: [], crew: [],
            dataReady: false, imgReady: false, show: false
        }
        this.onBackdropLoaded = this.onBackdropLoaded.bind(this);
    }

    componentDidMount() {
        let url = `https://api.themoviedb.org/3/person/${this.id}/combined_credits/?api_key=${API_KEY}`;
        fetchData(url)
        .then(res => this.prepareData(res))
        .then(res => this.setData(res))
        .catch(err => {
            console.log(err);
        });
    }

    prepareData(data) {
        let cast = res.combined_credits.cast ? res.combined_credits.cast.sort( (a, b) => sortCredits(a, b)) : null;
        let crew = res.combined_credits.crew ? res.combined_credits.crew.sort( (a, b) => sortCredits(a, b)) : null;

    }

    setData(data) {
        this.setState(data);
    }

    mapCollection(el, i) {
        return (<Link to={`/${el.media_type}/${el.id}`} key={i} className="collection-item">
                    <span className="title">
                        { el.title || el.name } ( {(el.release_date || el.first_air_date)} )
                    </span>
                    {el.character ? <p>{el.character}</p> : ""}
                </Link>);
    }

    render() {
        return (
            <div className="row">
                <div className={"progress blue-grey darken-2" + (this.state.show ? " hide" : "")}>
                    <div className="indeterminate pink"></div>
                </div>
                <div className={"col s12 m10 offset-m1 l6 offset-l3 cast-page" + (this.state.show ? " shown" : " hidden")}>
                    { this.state.cast.length > 0 ? <CardCollection collection={this.state.cast} mapCollection={this.mapCollection} /> : ""}
                </div>
            </div>
        );
    }
}

export default PersonCast;