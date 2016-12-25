import React from "react";

import MovieActor from "../../components/MovieActor"

import { API_KEY, fetchData } from "../../helper.js"

const preparePeople = (people) => {
    let result = [];
    if (people.results.length === 0) return;
    people.results.forEach((actor) => {
        result.push({
            name: actor.name,
            profile_path: actor.profile_path,
            id: actor.id
        });
    });
    return result;
};

class HomePeople extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showData: false,
            data: []
        }
    }
    
    componentDidMount() {
        let url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`;
        fetchData(url)
        .then(res => preparePeople(res))
        .then(res => this.setData(res))
        .then(() => this.showData())
        .catch(err => console.log(err))
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
                <h1 className="content-header">Popular actors:</h1>
                <div className="Home-content movie-cast">
                    { this.state.data.map((el, i) => (<MovieActor key={i} id={el.id} profile_path={el.profile_path} name={el.name}/>) )}
                </div>
            </div>
        );
    }
}

export default HomePeople;