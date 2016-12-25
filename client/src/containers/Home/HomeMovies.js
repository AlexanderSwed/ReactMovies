import React from "react";

import HomeMovieLink from "../../components/HomeMovieLink"

import {API_KEY, fetchData, getDate } from "../../helper.js"

const prepareData = (data, type) => {
    let result = [],
        to = type === "on_the_air" ? "tv" : "movie";
    if (type === "upcoming") {
        data.results.forEach((el) => {
            let date = getDate(el.release_date);
            result.push({
                title: el.title,
                poster_path: el.poster_path ? `https://image.tmdb.org/t/p/w640${el.poster_path}` : null,
                link: `/${to}/${el.id}`,
                release_date: date
            });
        });
    }
    else {
        data.results.forEach((el) => {
            result.push({
                title: el.title ? el.title : el.name,
                poster_path: el.poster_path ? `https://image.tmdb.org/t/p/w640${el.poster_path}` : null,
                link: `/${to}/${el.id}`,
                votes: el.vote_average,
                vote_count: el.vote_count,
            });
        });
    }
    return result;
};

class HomeMovies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showData: false
        };
        this.type = props.type.split("/");
        this.header = props.header;
    }
    
    componentDidMount() {
        let url = `https://api.themoviedb.org/3/${this.type[0]}/${this.type[1]}?api_key=${API_KEY}&region=US&page=1`;
        fetchData(url)
        .then(res => prepareData(res, this.type[1]))
        .then(res => this.setData(res))
        .then(() => this.showData())
        .catch(err => {console.log(err);})
    }

    setData(data) {
        this.setState({data});
    }
    
    showData() {
        this.setState({
            showData: true
        });
    }    

    render() {
        return (
            <div className={"home-block" + (this.state.showData ? " homeDiv-shown" : " hidden")}>
                <h1 className="content-header">{this.header}:</h1>
                <div className="Home-content">
                    {
                        this.state.data.map((el, ind) => (<HomeMovieLink movie={el} key={ind} index={ind} type={this.type[1]}/>))
                    }
                </div>
            </div>
        );
    }
}

export default HomeMovies;