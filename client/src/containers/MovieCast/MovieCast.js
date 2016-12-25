import React from "react"
import { Link } from "react-router"

import CardPoster from "./CardPoster"
import CardCollection from "../CardCollection/CardCollection"
import { API_KEY, fetchData } from "../../helper.js"

import "./MovieCast.css";



class MovieCast extends React.Component {

    constructor(props) {
        super(props);
        this.id = props.params.id;
        this.state = {
            title: "",
            backdrop_path: "",
            cast: [],
            dataReady: false, imgReady: false, show: false
        }
        this.onBackdropLoaded = this.onBackdropLoaded.bind(this);
    }

    componentDidMount() {
        let url = `https://api.themoviedb.org/3/movie/${this.id}?api_key=${API_KEY}&append_to_response=credits`;
        fetchData(url)
        .then(res => this.prepareData(res))
        .then(res => this.setData(res))
        .catch(err => {
            console.log(err);
        });
    }

    prepareData(data) {
        let cast = data.credits.cast,
            backdrop_path = data.backdrop_path ? `https://image.tmdb.org/t/p/w640${data.backdrop_path}` : null,
            title = data.title;
        return {
            cast, backdrop_path, title,
            filtered: cast
        }
    }

    setData(data) {
        this.setState(data);
    }

    onBackdropLoaded() {
        this.setState({show: true});
    }

    mapCollection(el, i) {
        return (
            <Link to={`/person/${el.id}`} className="collection-item avatar" key={i}>
                {
                    el.profile_path ?
                    <img src={`https://image.tmdb.org/t/p/w132_and_h132_bestv2/${el.profile_path}`} alt="" className="circle" />
                    : <div className="circle blue-grey darken-2"></div>
                }
                <span className="title">{el.name}</span>
                <p>{el.character}</p>
            </Link>
            );
    }

    render() {
        return (
            <div className="row">
                <div className={"progress blue-grey darken-2" + (this.state.show ? " hide" : "")}>
                    <div className="indeterminate pink"></div>
                </div>
                <div className={"col s12 m10 offset-m1 l6 offset-l3 cast-page" + (this.state.show ? " shown" : " hidden")}>
                    <CardPoster backdrop_path={this.state.backdrop_path} onBackdropLoaded={this.onBackdropLoaded} title={this.state.title}/>
                    { this.state.cast.length > 0 ? <CardCollection collection={this.state.cast} mapCollection={this.mapCollection} /> : ""}
                </div>
            </div>
        );
    }
}

export default MovieCast;