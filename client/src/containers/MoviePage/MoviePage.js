import React from "react";
import {connect} from "react-redux"
import { Link } from "react-router"

import "./MoviePage.css";

import { getFavs, toggleFavMovie } from "../../redux/lists/listsActions";
import MovieCardImage from "../../components/MovieCardImage"
import MovieCardAction from "../../components/MovieCardAction"
import MovieActor from "../../components/MovieActor"
import MovieVideos from "../MovieVideos/MovieVideos"

import {API_KEY, fetchData, getDate } from "../../helper.js"

class MoviePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isImgLoaded: false, showContent: false, isBackdropLoaded: false,
            id: props.params.id,
            movie: {
                poster_path: '',
                title: '',
                overview: '',
                vote_average: '',
                backdrop_path: '',
                release_date: '',
                cast: [],
                videos: []
            },
            is_favorite: false
        }
        this.getMovieById(props.params.id);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onBackdropLoaded = this.onBackdropLoaded.bind(this);
        this.toggleFavMovie = props.toggleFavMovie.bind(this);
        this.toggleStateFavorite = this.toggleStateFavorite.bind(this);
    }

    componentWillReceiveProps(props) {
        if (this.state.id === props.params.id) {
            return;
        }
        else {
            this.setState({
                isImgLoaded: false, showContent: false, isBackdropLoaded: false,
                id: props.params.id,
                movie: {
                    poster_path: '',
                    title: '',
                    overview: '',
                    vote_average: '',
                    backdrop_path: '',
                    release_date: '',
                    cast: [],
                    videos: []
                },
                is_favorite: false
            });
            this.getMovieById(props.params.id);
        }
    }

    componentDidUpdate() {
        if (this.state.showContent === false && this.state.isImgLoaded === true && this.state.isBackdropLoaded === true) {
            this.setState({ showContent: true});
        }
    }

    getMovieById(id) {
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`;
        fetchData(url)
        .then(res => this.prepareMovieData(res))
        .then(res => this.setMovieInfo(res))
        .then(id => this.isFavorite(id))
        .catch(err => {
            console.log(err);
        });
    }

    prepareMovieData(movie) {
        let date = movie.release_date ? getDate(movie.release_date) : null;
        let link = `http://www.imdb.com/title/${movie.imdb_id}`,
            backdrop_path = movie.backdrop_path ? `https://image.tmdb.org/t/p/w640${movie.backdrop_path}` : null,
            poster_path = movie.poster_path ? `https://image.tmdb.org/t/p/w640${movie.poster_path}` : null;
        let cast = movie.credits.cast.slice(0, 6);
        let result = {
            title: movie.title,
            vote_average: movie.vote_average,
            overview: movie.overview,
            release_date: date,
            id: movie.id,
            link, backdrop_path, poster_path,
            cast,
            videos: movie.videos.results
        }
        return result;
    }
    setMovieInfo(movie) {
        this.setState({
            movie,
            isImgLoaded: !movie.poster_path,
            isBackdropLoaded: !movie.backdrop_path
        });
        return movie.id;
    }

    isFavorite(id) {
        if (this.props.favorites.some((el) => el.id === id)) {
            this.toggleStateFavorite();
        };
    }

    toggleStateFavorite() {
        this.setState(prevState => ({
            is_favorite: !prevState.is_favorite
        }));
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

    toggleFavorite(movie) {
        this.toggleStateFavorite();
        let data = Object.assign({}, this.state.movie, {
            cast: undefined,
            videos: undefined,
            release_date: undefined,
            vote_average: undefined,
            poster_path: undefined
        });
        this.toggleFavMovie(data, this.state.is_favorite);
    }

    render() {
        return (
            <div className="row movie-page">
                <div className={"progress blue-grey darken-2" + (this.state.showContent ? " hide" : "")}>
                    <div className="indeterminate pink"></div>
                </div>
                <div className={"col s12 m10 offset-m1 l6 offset-l3 movie" + (this.state.showContent ? " shown" : " hidden")}>
                    <div className="card large">
                        <MovieCardImage 
                            movie={this.state.movie}
                            is_favorite={this.state.is_favorite}
                            onImageLoaded={this.onImageLoaded}
                            onBackdropLoaded={this.onBackdropLoaded}
                            toggleFavorite={() => this.toggleFavorite(this.state.movie)}
                        />
                        <div className="card-content">
                            <p>{this.state.movie.overview}</p>
                        </div>
                        <MovieCardAction
                            is_favorite={this.state.is_favorite}
                            toggleFavorite={() => this.toggleFavorite(this.state.movie)}
                            url={`http://localhost:3000/movie/${this.state.id}`}
                        />
                    </div>
                    { this.state.movie.cast.length > 0 ? 
                        (<div className="card large card-cast">
                            <h2>Cast:</h2>
                            <div className="movie-cast">
                                { this.state.movie.cast.map((el, i) => (<MovieActor key={i} id={el.id} profile_path={el.profile_path} name={el.name} character={el.character}/>) )}
                            </div>
                            {
                                this.state.movie.cast.length < 6 ?
                                "" :
                                <div className="card-action">
                                    <Link to={`/movie/${this.state.id}/cast`}>View all</Link>
                                </div>
                            }
                        </div>)
                        : ""
                    }
                    {this.state.movie.videos.length > 0 ? 
                        <MovieVideos videos={this.state.movie.videos} />
                    : ""}
                </div>
            </div>);
    }
};

const mapStateToProps = (state) => {
    return {
        favorites: state.data.favorites
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFavs: () => {
            dispatch(getFavs());
        },
        toggleFavMovie: (movie, state) => {
            dispatch(toggleFavMovie(movie, state));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);