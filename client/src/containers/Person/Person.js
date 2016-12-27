import React from "react";
import { Link } from "react-router"

import MainInfo from "./MainInfo"
import Filmography from "./Filmography"
import {API_KEY, fetchData, getDate, sortCredits } from "../../helper.js"

import "./Person.css";

class Person extends React.Component {

    constructor(props) {
        super(props);
        this.state = 
            {
                showContent: false,
                id: props.params.id,
                person: {},
                imgLoaded: false
            };
        this.imgLoaded = this.imgLoaded.bind(this);
        this.mapCollection = this.mapCollection.bind(this);
    }

    componentDidMount() {
        this.getPersonById(this.state.id);
    }

    componentDidUpdate() {
        if (this.state.imgLoaded && !this.state.showContent) {
            this.showContent();
            document.title = this.state.person.name;
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.id === newProps.params.id) {
            return;
        }
        else {
            this.setState({
                showContent: false, imgLoaded: false,
                id: newProps.params.id,
                person: {}
            });
            this.getPersonById(newProps.params.id);
        }
    }

    getPersonById(id) {
        let url = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&append_to_response=combined_credits,external_ids`;
        fetchData(url)/*
        .then( res => this.getFbCover(res))*/
        .then(res => this.setPersonInfo(res))
        /*.then(() => this.showContent())*/
        .catch(err => {
            console.log(err);
        });
    }
/*
    getFbCover(res) {
        if (res.external_ids.facebook_id) {
            const url = `https://graph.facebook.com/${res.external_ids.facebook_id}?fields=cover&access_token=${FB_TOKEN}`;
            return fetchData(url).then( response => Object.assign({}, res, {fb_cover: response.cover.source}));
        }
        else return res;
    }*/

    setPersonInfo(res) {
        let cast = res.combined_credits.cast ? res.combined_credits.cast.sort( (a, b) => sortCredits(a, b)) : null;
        let crew = res.combined_credits.crew ? this.setFullCrew(res.combined_credits.crew) : null;
        crew = crew.sort( (a, b) => sortCredits(a, b));
        let birthday = res.birthday ? (res.birthday.length > 4 ? getDate(res.birthday) : res.birthday) : null,
            deathday = res.deathday ? getDate(res.deathday) : null;
        let imgBig = res.profile_path ? "https://image.tmdb.org/t/p/w640" + res.profile_path : null,
            imgSmall = res.profile_path ? `https://image.tmdb.org/t/p/w132_and_h132_bestv2${res.profile_path}` : null;
        let person = Object.assign({}, res,
            {
                combined_credits: undefined,
                profile_path: undefined,
                cast, crew, birthday, deathday, imgBig, imgSmall
            });
        this.setState({ person: person, imgLoaded: !person.imgBig });
        console.log(person);
    }

    setFullCrew(crew) {
        let result = [];
        crew.map( (el, i) => {
            let isIn = result.findIndex( elem => elem.title === el.title );
            if (isIn >= 0 && result.length > 0) {
                result[isIn].job += `, ${el.job}`;
            }
            else result.push(el);
            return null;
        } );
        return result;
    }

    showContent() {
        this.setState({
            showContent: true
        });
    }

    imgLoaded() {
        this.setState({
            imgLoaded: true
        })
    }

    mapCollection(el, i) {
            return (<Link to={`/${el.media_type}/${el.id}`} key={i} className="collection-item">
                        <span className="title">{ el.title || el.name } {el.release_date ? `(${el.release_date.split('-')[0]})` : ""}</span>
                        {el.character ? <p>{el.character}</p> : ""}
                        {el.job ? <p>{el.job}</p> : ""}
                    </Link>);
    }

    render() {
        return (
            <div className="row Person">
                <div className={"progress blue-grey darken-2" + (this.state.showContent ? " hide" : "")}>
                    <div className="indeterminate pink"></div>
                </div>
                {
                    /*this.state.person.fb_cover ?
                    <img src={this.state.person.fb_cover} alt="" aria-busy="false" className="cover"/>
                    : ""*/
                }
                <div className={"col s12 m10 offset-m1 l6 offset-l3" + (this.state.showContent ? " shown" : " hidden")}>
                    <MainInfo person={this.state.person} imgLoaded={this.imgLoaded} />
                    {
                        this.state.person.biography &&
                        (<div className="card large bio">
                            <h3>Biography</h3>
                            {this.state.person.biography}
                        </div>)
                    }
                    {
                        this.state.person.cast && this.state.person.cast.length > 0 ?
                        <Filmography
                            data={this.state.person.cast}
                            header={"Latest"}
                            mapCollection={this.mapCollection}
                        />
                        : ""
                    }
                    {
                        this.state.person.crew && this.state.person.crew.length > 0 ?
                        <Filmography
                            data={this.state.person.crew}
                            header={"Crew"}
                            mapCollection={this.mapCollection}
                        />
                        : ""
                    }
                </div>
            </div>);
    }
};

export default Person;