import React from "react"
import { Link, browserHistory } from "react-router"
import {connect} from "react-redux"

import { search, cleanSearchState } from "../../redux/search/searchActions";
import { toggleFav } from "../../redux/favs/favsActions"
import Pagination from "../../components/Pagination"
import SearchCollection from "./SearchCollection"

import "./Search.css"
import nullResults from "./410.png";

const getQuery = (str) => {
    let a = str.split('&');
    let b = a[1].slice(a[1].indexOf('=')+1, a[1].length);
    return { query: a[0], page: b};
}

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showContent: !props.query,
            paginationLinks: []
        }
        this.changePage = this.changePage.bind(this);
        this.showData = this.showData.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.params.query !== this.props.query || !Object.is(nextState, this.state);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.query !== this.props.query) {
            if (nextProps.params.query && nextProps.params.query.split('&')[0] !== (this.props.query ? this.props.query.split('&')[0] : false)) {
                this.setState({
                    showContent: false,
                    paginationLinks: this.getPaginationLinks(nextProps.total_pages,nextProps.params.query.split('&')[0])
                });
                this.props.search(nextProps.params.query, this.showData);
            }
            else {
                this.setState({
                    showContent: false
                });
                this.props.search(nextProps.params.query, this.showData);
            }
        }
    }

    componentWillMount() {
        if (this.props.params.query) {
            this.props.search( this.props.params.query.split('&')[0], this.showData);
            document.title = "Search";
        }
    }

    getPaginationLinks(total, query) {
        let paginationLinks = [];
        for (let i = 1; i <= total; i++) {
            paginationLinks.push(<Link to={`/search/${query}&page=${i}`} className="pagination-btn">{i}</Link>);
        }
        return paginationLinks;
    }

    componentWillUnmount() {
        this.props.cleanSearchState();
    }

    changePage(str, dirrection) {
        if (str.split('&')[1]) {
            let queryObject = getQuery(str),
                page = dirrection === "next" ? parseInt(queryObject.page, 10) + 1 : parseInt(queryObject.page, 10) - 1;
            browserHistory.push(`/search/${queryObject.query}&page=${page}`);
        }
        else {
            browserHistory.push(`/search/${str}&page=2`);
        }
    }

    showData() {
        this.setState({showContent: true})
    }

    toggleFavorite(event, movie) {
        event.preventDefault();
        event.target.classList.toggle('like');
        this.props.toggleFav(movie);
    }

    render() {
        if (this.props.total_results === -1 && this.props.query === "") return null;
        if ((this.props.total_results === 0 || this.props.query === "") && this.state.showContent) {
            return (
                <div className="card large SearchPage">
                    <img src={nullResults} alt="Nothing found"/>
                </div>
            );
        }
        return (
                <div className="card large SearchPage" style={ this.state.showContent ? {} : { paddingBottom: 0 } }>
                    <div className={"progress white" + (this.state.showContent ? " hide" : "")}>
                        <div className="indeterminate pink"></div>
                    </div>
                    <h3>Total results: {this.props.total_results > 0 ? this.props.total_results : "?"}</h3>
                    {
                        this.state.paginationLinks && this.state.paginationLinks.length > 1 && (this.state.showContent || this.props.page !== 1) ?
                            (<Pagination
                                    page={this.props.page}
                                    total_pages={this.props.total_pages}
                                    paginationLinks={this.state.paginationLinks}
                                    toPrev={() => this.changePage(this.props.query, "prev")}
                                    toNext={() => this.changePage(this.props.query, "next")}
                                />) : ""
                    }
                    { this.props.movies && this.state.showContent ? 
                        <SearchCollection movies={this.props.movies} favs={ this.props.favs } toggleFavorite={this.toggleFavorite}/> : ""
                    }
                    
                </div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.search.entities.movies,
        total_pages: state.search.result.total_pages,
        total_results: state.search.result.total_results,
        page: state.search.result.page,
        query: state.search.result.query,
        favs: state.favs
    };
};

export default connect(mapStateToProps, {search, cleanSearchState, toggleFav})(Search);