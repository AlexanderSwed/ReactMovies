import React from "react"
import { Link, browserHistory } from "react-router"
import {connect} from "react-redux"

import { cleanSearchState, search, changePage } from "../../redux/search/searchActions";
import Pagination from "../../components/Pagination"

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
        this.search = props.search;
        this.changePage = this.changePage.bind(this);
        this.showData = this.showData.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (Object.is(nextState, this.state)) return false;
        return nextProps.params.query !== this.props.query || !Object.is(nextState, this.state);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.query !== this.props.query) {
            if (nextProps.params.query && nextProps.params.query.split('&')[0] !== (this.props.query ? this.props.query.split('&')[0] : false)) {
                this.setState({
                    showContent: false,
                    paginationLinks: this.getPaginationLinks(nextProps.total_pages,nextProps.params.query.split('&')[0])
                });
                this.search(nextProps.params.query, this.showData);
            }
            else {
                this.setState({
                    showContent: false
                });
                this.search(nextProps.params.query, this.showData);
            }
        }
    }

    componentDidMount() {
        if (this.props.params.query) {
            this.search( this.props.params.query.split('&')[0], this.showData);
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
        setTimeout(() => {
            this.setState({showContent: true})
        }, 1000);
    }

    render() {
        if ((this.props.total_results === 0 || this.props.query === "") && this.state.showContent) {
            return (
                <div className="card large SearchPage">
                    <img src={nullResults} alt="Nothing found"/>
                </div>
            );
        }
        return (
                <div className="card large SearchPage" style={ this.state.showContent ? {} : {paddingBottom: 0} }>
                    <div className={"progress white" + (this.state.showContent ? " hide" : "")}>
                        <div className="indeterminate pink"></div>
                    </div>
                    <h3>Total results: {this.props.total_results}</h3>
                    {
                        this.state.paginationLinks && this.state.paginationLinks.length > 0 && (this.state.showContent || this.props.page !== 1) ?
                            (<Pagination
                                    page={this.props.page}
                                    total_pages={this.props.total_pages}
                                    paginationLinks={this.state.paginationLinks}
                                    toPrev={() => this.changePage(this.props.query, "prev")}
                                    toNext={() => this.changePage(this.props.query, "next")}
                                />) : ""
                    }
                    { this.props.movies && this.state.showContent ? 
                        (<ul className="search-collection">
                            { this.props.movies.map( (el, i) => 
                                (
                                    <Link to={`/${el.media_type}/${el.id}`} className="c-item blue-grey darken-3" key={i}>
                                        {el.profile_path || el.poster_path ?
                                            <img src={el.poster_path ? el.poster_path : el.profile_path} alt="" className={el.profile_path ? "circle" : ""} />:
                                            <div className="circle blue-grey darken-2"></div>}
                                        <span className="title">{el.name} {el.release_date ? ` (${el.release_date})` : ""}</span>
                                    </Link>
                                ) )}
                            
                        </ul>) : ""
                    }
                    
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
        search: (query, callback) => {
            dispatch(search(query, callback));
        },
        cleanSearchState: () => { dispatch(cleanSearchState())},
        changePage: (str, dirrection) => { dispatch(changePage(str, dirrection))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);