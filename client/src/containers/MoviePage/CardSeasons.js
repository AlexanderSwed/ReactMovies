import React from "react";

import Pagination from "../../components/Pagination"

import {API_KEY, fetchData, getDate } from "../../helper.js"

import "./CardSeasons.css";

const split_episodes = (episodes) => {
    return episodes.reduce((array, episode, i) => {
                if (i % 20 === 0 && i !== 0) array.push([]);
                array[array.length - 1].push(episode);
                return array;
        }, [[]]);
};

const getPaginationLinks = (episodes) => {
    return episodes.map( 
        (el, i) => {
            let date = el.air_date ? getDate(el.air_date) : null,
                img = el.still_path ? `https://image.tmdb.org/t/p/w454_and_h254_bestv2${el.still_path}` : null;
            if (el.overview.length > 600) {

            }
            return (
                <li className="collection-item" key={i} style={{animationDelay: `${0.2*i}s`}}>
                    { img && <img src={img} alt="" className="episode-cover"/> }
                    <div className={"item-info" + (!img ? " no-poster" : "") + (el.overview.length > 350 && img ? " huge-overview" : "")}>
                        <span className="title">{el.name}</span>
                        <p>
                            {el.overview}
                        </p>
                    </div>
                    { date && <h6 className="episode-date">{date.year}, {date.month} {date.day}</h6> }
                </li>
            );
    });
};

class CardSeasons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            seasons: props.seasons,
            season: {
                name: "",
                episodes: [],
                overview: ""
            },
            episodes: {episodesInfo: [], e_page: 1, paginationLinks: []},
            isEpisodesExpanded: false,
            seasonNumber: props.seasons[0].season_number, seasonNumberInput: props.seasons[0].season_number,
            seasonsTotal: props.seasons.length - 1 + props.seasons[0].season_number,
            showSeasons: false
        }
        this.showEpisodes = this.showEpisodes.bind(this);
        this.toggleEpisodesPage = this.toggleEpisodesPage.bind(this);
        this.changeEpisodePageRight = this.changeEpisodePageRight.bind(this);
        this.changeEpisodePageLeft = this.changeEpisodePageLeft.bind(this);
        this.onSeasonInputChange = this.onSeasonInputChange.bind(this);
        this.changeSeasonRight = this.changeSeasonRight.bind(this);
        this.changeSeasonLeft = this.changeSeasonLeft.bind(this);
    }

    componentDidMount() {
        if (this.state.seasons && this.state.seasons.length !== 0) {
            this.fetchSeasonData(this.state.seasonNumber);
        }
    }

    fetchSeasonData(num = 1) {
        let url = `https://api.themoviedb.org/3/tv/${this.state.id}/season/${num}?api_key=${API_KEY}`;
        fetchData(url)
        .then( res => this.setData(res))
        .then( () => this.showData())
        .catch( err => console.log(err))
    }
    
    setData(res) {
        let air_date = res.air_date ? getDate(res.air_date) : null;
        let season = {...res, air_date}, episodes;
        if (season.episodes.length > 20) {
            let split = split_episodes(season.episodes),
                episodesInfo = split.map( el => getPaginationLinks(el)),
                paginationLinks = [];
            for (let i = 1; i <= episodesInfo.length; i++) {
                paginationLinks.push(<button type="button" onClick={this.toggleEpisodesPage} >{i}</button>)
            }
            episodes = { episodesInfo, e_page: 1, paginationLinks }
        }
        else episodes = getPaginationLinks(season.episodes);
        this.setState({
            data: res,
            season,
            episodes,
            seasonNumber: res.season_number
        });
    }

    toggleEpisodesPage(e) {
        this.setState({
            episodes: { ...this.state.episodes, e_page: parseInt(e.target.textContent, 10) }
        })
    }

    changeEpisodePageRight() {
        this.setState({
            episodes: { ...this.state.episodes, e_page: this.state.episodes.e_page + 1 }
        })
    }

    changeEpisodePageLeft() {
        this.setState({
            episodes: { ...this.state.episodes, e_page: this.state.episodes.e_page - 1 }
        })
    }

    changeSeasonRight() {
        if (this.state.seasonNumber < this.state.seasons.length) {
            this.onSeasonInputChange(`${this.state.seasonNumber + 1}`);
        }
        return;
    }

    changeSeasonLeft() {
        if (this.state.seasonNumber > this.state.seasons[0].season_number) {
            this.onSeasonInputChange(`${this.state.seasonNumber - 1}`);
        }
        return;
    }

    showData() {
        setTimeout(() => {
            this.setState({showSeasons: true})
        }, 1000);
    }

    showEpisodes() {
        this.setState({
            isEpisodesExpanded: !this.state.isEpisodesExpanded
        });
    }

    showSeasons() {
        this.setState({
            showSeasons: true
        })
    }

    onSeasonInputChange(value) {
        if (value === "") {
            this.setState({seasonNumberInput: value});
            return;
        }
        if (value.match(/^[0-9]+$/)) {
            this.setState({
                seasonNumberInput: value,
                showSeasons: false, isEpisodesExpanded: false
            });
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
            }
            let num = parseInt(value, 10);
            if (num >= this.state.seasons[0].season_number && num <= this.state.seasons.length ) {
                this.timeout = setTimeout(() => {
                    this.fetchSeasonData(num);
                    }, 1000);
            }
        }
    }

    render() {
        return (
            <div className="card large card-seasons">
                <div className="season-main">
                    <div className="seasons-toggler-wrapper">
                        <button onClick={this.changeSeasonLeft} className={"valign-wrapper" + (this.state.seasonNumber > this.state.seasons[0].season_number ? "" : " disabled")}>
                            <i className="material-icons valign">keyboard_arrow_left</i>
                        </button>
                        season
                        <form className="season-number">
                            <input
                                type="text"
                                value={this.state.seasonNumberInput || this.state.seasonNumberInput === "" ? this.state.seasonNumberInput : "0"}
                                onChange={(e) => this.onSeasonInputChange(e.target.value)} />
                            <button></button>
                        </form>
                        from {this.state.seasonsTotal}
                        <button  onClick={this.changeSeasonRight} className={"valign-wrapper" + (this.state.seasonNumber < this.state.seasons.length ? "" : " disabled")}>
                            <i className="material-icons valign">keyboard_arrow_right</i>
                        </button>
                    </div>
                    <div className={"preloader-container" + (this.state.showSeasons ? " hide" : "")}>
                        <div className="preloader">
                            <div className="dot1"></div>
                            <div className="dot2"></div>
                        </div>
                    </div>
                    <div className={"season-content" + (!this.state.showSeasons ? " hidden" : "")}>
                        <div className="season-poster">
                            { this.state.season.poster_path &&
                            <img src={`https://image.tmdb.org/t/p/w640${this.state.season.poster_path}`} alt="Poster" />}
                        </div>
                        <div className="season-info">
                            <h4>{this.state.season.name}</h4>
                            {
                                this.state.season.air_date ?
                                <h6>{this.state.season.air_date.year}, {this.state.season.air_date.month} {this.state.season.air_date.day}</h6>
                                : ""
                            }
                            <p>{this.state.season.overview}</p>
                        </div>
                        {
                            this.state.season.episodes ?
                            <div className="center" onClick={this.showEpisodes}>
                                <h5>episodes</h5>
                                <h5><i className="material-icons" style={ this.state.isEpisodesExpanded ? {transform: "rotate(180deg)"} : {}}>keyboard_arrow_down</i></h5>
                            </div> : ""
                        }
                    </div>
                    
                    { this.state.episodes ?
                        (
                            <div className={"episodes" + ( this.state.isEpisodesExpanded ? " show-episodes": "" )}>
                                {   this.state.episodes.episodesInfo && this.state.episodes.episodesInfo.length > 0 ?
                                    <Pagination
                                        page={this.state.episodes.e_page}
                                        total_pages={this.state.episodes.episodesInfo.length}
                                        paginationLinks={this.state.episodes.paginationLinks}
                                        toPrev={this.changeEpisodePageLeft}
                                        toNext={this.changeEpisodePageRight}
                                    /> : ""
                                }
                                <ul className="collection">
                                    { Array.isArray(this.state.episodes) ? this.state.episodes : this.state.episodes.episodesInfo[this.state.episodes.e_page - 1] }
                                </ul>
                            </div>
                        ) : ""
                    }
                </div>
            </div>
        );
    }

}

export default CardSeasons;