import React from "react";
import {connect} from "react-redux"

import MovieCardImage from "../../components/MovieCardImage"
import MovieCardAction from "../MovieCardAction/MovieCardAction"
import MovieActor from "../../components/MovieActor"
import MovieVideos from "../MovieVideos/MovieVideos"
import CardSeasons from "./CardSeasons"

import {API_KEY, fetchData, getDate } from "../../helper.js"

import "./TvPage.css"

class TvPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isImgLoaded: false, showContent: false, isBackdropLoaded: false,
            id: props.params.id,
            tv: {},
            is_favorite: false
        }
        this.getTvById(props.params.id);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onBackdropLoaded = this.onBackdropLoaded.bind(this);
    }

    componentWillReceiveProps(props) {
        if (this.state.id === props.params.id) {
            return;
        }
        else {
            this.setState({
                isImgLoaded: false, showContent: false, isBackdropLoaded: false,
                id: props.params.id,
                tv: {},
                is_favorite: false
            });
            this.getTvById(props.params.id);
        }
    }

    componentDidUpdate() {
        if (this.state.showContent === false && this.state.isImgLoaded === true && this.state.isBackdropLoaded === true) {
            this.setState({ showContent: true});
            document.title = this.state.tv.title;
        }
    }

    getTvById(id) {
        let url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos,external_ids`;
        fetchData(url)
        .then(res => this.prepareTvData(res))
        .then(res => this.setTvInfo(res))
        .catch(err => {
            console.log(err);
        });
    }

    prepareTvData(data) {
        let link = `http://www.imdb.com/title/${data.external_ids.imdb_id}`,
            backdrop_path = data.backdrop_path ? `https://image.tmdb.org/t/p/w640${data.backdrop_path}` : null,
            poster_path = data.poster_path ? `https://image.tmdb.org/t/p/w640${data.poster_path}` : null;
        let people = [...data.credits.cast, ...data.credits.crew, ...data.created_by];
        let first_air_date = data.first_air_date ? getDate(data.first_air_date) : null,
            last_air_date = data.last_air_date ? getDate(data.last_air_date) : null;
        let result = {
            title: data.name,
            vote_average: data.vote_average,
            overview: data.overview,
            homepage: data.homepage,
            seasons: data.seasons,
            number_of_episodes: data.number_of_episodes,
            number_of_seasons: data.number_of_seasons,            
            id: data.id,
            link, backdrop_path, poster_path,
            people, first_air_date, last_air_date,
            videos: data.videos.results,
            status: data.status
        }
        return result;
    }
    setTvInfo(tv) {
        console.log(tv);
        this.setState({
            tv,
            isImgLoaded: !tv.poster_path,
            isBackdropLoaded: !tv.backdrop_path
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

    render() {
        return (
            <div className="row movie-page tv-page">
                <div className={"progress blue-grey darken-2" + (this.state.showContent ? " hide" : "")}>
                    <div className="indeterminate pink"></div>
                </div>
                { this.state.tv.title &&
                    <div className={"col s12 m10 offset-m1 l6 offset-l3" + (this.state.showContent ? " shown" : " hidden")}>
                        <div className="card large movie-main">
                            <MovieCardImage 
                                movie={this.state.tv}
                                onImageLoaded={this.onImageLoaded}
                                onBackdropLoaded={this.onBackdropLoaded}
                            />
                            <div className="card-content">
                                <p>{this.state.tv.overview}</p>
                            </div>
                            <MovieCardAction />
                        </div>
                        { this.state.tv.people.length > 0 ? 
                            (<div className="card large card-cast">
                                <h2>Credits:</h2>
                                <div className="movie-cast">
                                    { this.state.tv.people.map(
                                        (el, i) => (<MovieActor
                                                        key={i}
                                                        id={el.id}
                                                        profile_path={el.profile_path}
                                                        name={el.name}
                                                        character={el.character}
                                                        job={el.job}
                                                    />
                                                    )
                                        )
                                    }
                                </div>
                            </div>)
                            : ""
                        }
                        { this.state.tv.seasons &&
                            <CardSeasons seasons={this.state.tv.seasons} id={this.state.id}/>
                        }
                        {this.state.tv.videos.length > 0 ? 
                            <MovieVideos videos={this.state.tv.videos} />
                        : ""}
                    </div>
                }
            </div>);
    }
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TvPage);