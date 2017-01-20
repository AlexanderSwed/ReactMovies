import React from "react";
import {connect} from "react-redux"

import "./MoviePage.css";

import MovieCardImage from "../../components/MovieCardImage"
import MovieCardAction from "../MovieCardAction/MovieCardAction"
import MovieCardCast from "../../components/MovieCardCast"
import MovieVideos from "../MovieVideos/MovieVideos"
import CardSeasons from "./CardSeasons"

import {API_KEY, fetchMovie, prepareToStore } from "../../helper.js"
import { toggleFav } from "../../redux/favs/favsActions"

class MoviePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isImgLoaded: false, showContent: false, isBackdropLoaded: false,
            id: props.params.id,
            movie: {}, isFavorite: false
        }
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onBackdropLoaded = this.onBackdropLoaded.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    componentWillMount() {
        this.getMovieById(this.props);
    }

    componentWillReceiveProps(newProps) {
        if (this.state.id === newProps.params.id) {
            return;
        }
        else {
            this.setState({
                isImgLoaded: false, showContent: false, isBackdropLoaded: false,
                id: newProps.params.id,
                movie: {
                }
            });
            this.getMovieById(newProps.params.id);
        }
    }

    componentDidUpdate() {
        if (this.state.showContent === false && this.state.isImgLoaded === true && this.state.isBackdropLoaded === true) {
            this.setState({ showContent: true});
            document.title = this.state.movie.title || this.state.movie.name;
        }
    }

    getMovieById() {
        let url = `https://api.themoviedb.org/3/${this.props.route.media_type}/${this.props.params.id}?api_key=${API_KEY}&append_to_response=credits,videos${this.props.route.append ? `,${this.props.route.append}` : ""}`;
        fetchMovie(url)
        .then(res => this.setMovieInfo(res))
        .catch(err => {
            console.log(err);
        });
    }

    setMovieInfo(data) {
        let movie = data.entities.movies[data.result];
        this.setState({
            movie,
            isFavorite: Boolean(this.props.favs.findIndex(el => el.id === movie.id) > -1),
            isImgLoaded: !movie.poster_path,
            isBackdropLoaded: !movie.backdrop_path
        });
    }

    onImageLoaded() {
        this.setState({
            isImgLoaded: true
        });
    }
    onBackdropLoaded() {
        this.setState({
            isBackdropLoaded: true
        });
    }
    toggleFavorite() {
        this.setState({ isFavorite: !this.state.isFavorite });
        this.props.toggleFav(prepareToStore(this.state.movie));
    }

    render() {
        return (
            <div className="row movie-page">
                <div className={"progress blue-grey darken-2" + (this.state.showContent ? " hide" : "")}>
                    <div className="indeterminate pink"></div>
                </div>
                <div className={"col s12 m10 offset-m1 l6 offset-l3" + (this.state.showContent ? " shown" : " hidden")}>
                    { this.state.movie &&
                        <div className="card large movie-main">
                            <MovieCardImage 
                                movie={this.state.movie}
                                onImageLoaded={this.onImageLoaded}
                                onBackdropLoaded={this.onBackdropLoaded}
                            />
                            <div className="card-content">
                                <p>{this.state.movie.overview}</p>
                            </div>
                            <MovieCardAction
                                title={this.state.movie.title}
                                img={this.state.movie.poster_path}
                                toggleFavorite={this.toggleFavorite}
                                isFavorite={this.state.isFavorite}
                                />
                        </div>
                    }
                    { this.state.movie && this.state.movie.credits && this.state.movie.credits.cast.length > 0 ? 
                        <MovieCardCast id={this.state.id} cast={this.state.movie.credits.cast} />
                        : ""
                    }
                    { this.state.movie.seasons &&
                        <CardSeasons seasons={this.state.movie.seasons} id={this.state.id}/>
                    }
                    {this.state.movie.videos && this.state.movie.videos.results.length > 0 ? 
                        <MovieVideos videos={this.state.movie.videos.results} />
                    : ""}
                </div>
            </div>);
    }
};

const mapStateToProps = (state) => {
    return {
        favs: state.favs
    };
};

export default connect(mapStateToProps, {toggleFav})(MoviePage);