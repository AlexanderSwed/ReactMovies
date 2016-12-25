import React from "react";
import {connect} from "react-redux"
import { browserHistory } from "react-router"

import { search, cleanSearchState } from "../../redux/search/searchActions";

import { API_KEY, fetchData } from "../../helper.js"
import SearchSuggestions from "./SearchSuggestions"
import "./SearchBar.css"

//import {setName} from "../redux/userActions";

const prepareSuggestions = movies => movies.sort((a, b) => (a.popularity < b.popularity ? 1 : -1) ).slice(0, 5);

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: props.query.split('&')[0],
            suggestions: [],
            total_results: 0
        }
        this.timeout = null;
        this.handleChange = this.handleChange.bind(this);
        this.clearQuery = this.clearQuery.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(props) {
        if (!props.query && this.state.query !== props.query) {
            clearTimeout(this.timeout);
            this.setState({
                query: "",
                suggestions: []
            });
            return;
        }
        if (props.query !== this.state.query) {
            this.setState({
                query: props.query.split('&')[0],
                suggestions: []
            })
        }
    }

    searchSuggestions(query) {
        let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=true`;
        fetchData(url)
        .then(res => this.setSuggestions(res))
        .catch(err => console.error(err))
    }

    setSuggestions(res) {
        this.setState({
            suggestions: prepareSuggestions(res.results),
            total_results: res.total_results
        });
    }

    handleChange(query) {
        this.setState({query});
        if (query.length > 2) {
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => {
                this.searchSuggestions(query);
             }, 500);
        }
        else if (query.length < 1) {
            clearTimeout(this.timeout);
            this.clearQuery();
        }
    }

    clearQuery() {
        /*this.props.cleanSearchState();*/
        this.setState({
            query: "",
            suggestions: [],
            total_results: 0
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.query === "") {
            this.clearQuery();
            this.props.cleanSearchState();
            clearTimeout(this.timeout);
            browserHistory.push(`/search/`);
            return;
        }
        browserHistory.push(`/search/${this.state.query}`);
        clearTimeout(this.timeout);
        this.props.search(this.state.query);
        this.clearQuery();
    }

    render() {
        return (
            <div className="row Search">
                <div className="row Search-row">
                    <div className="Search-input">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input 
                                placeholder="Cary Grant or Star Wars"
                                type="text"
                                autoComplete="off"
                                value={this.state.query}
                                onChange={(e) => this.handleChange(e.target.value)}
                            />
                            <button type="submit" className="btn-search valign-wrapper"><i className="search-icon material-icons valign">search</i></button>
                            { this.state.query.length > 0 && <button className="btn-clear valign-wrapper" onClick={ this.clearQuery }><i className="clear material-icons valign">clear</i></button> }
                        </form>
                    </div>
                </div>
                    <div className="row col s12 m7 l5 search-suggestions">
                        <SearchSuggestions
                                            movies={this.state.suggestions}
                                            total={this.state.total_results}
                                            query={this.state.query}
                                            handleSelect={this.clearQuery} />
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.search.moviesData,
        total_pages: state.search.total_pages,
        total_results: state.search.total_results,
        page: state.search.page,
        query: state.search.query
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: (query) => {
            dispatch(search(query));
        },
        cleanSearchState: () => { dispatch(cleanSearchState())}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);