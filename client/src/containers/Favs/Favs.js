import React from "react"
import {connect} from "react-redux"
import { Link } from "react-router"

import { toggleFav } from "../../redux/favs/favsActions"

import "./Favs.css"

class Favs extends React.Component {

    componentDidMount() {
        document.title = "Favorites"
    }

    render() {
        return (
            <div className="col s12 m10 offset-m1 l8 offset-l2 Favs">
                {
                    this.props.favs.length > 0 ?
                    ( this.props.favs.map( el => (
                    <div className="card fav-card hoverable" key={el.id}>
                        <div className="card-image">
                            {
                                el.bg !== null ?
                                <img src={`https://image.tmdb.org/t/p/w640${el.bg}`} alt="" /> :
                                <div className="poster-dummy blue-grey darken-2" ></div>
                            }
                            <button type="button" onClick={() => this.props.toggleFav(el)}>
                                <i className="material-icons center" title="Remove">clear</i>
                            </button>
                        </div>
                        <Link to={`/${el.media_type}/${el.id}`} className="card-content">
                            <p>{ el.title }</p>
                        </Link>
                    </div>)) )
                    : (<div className="card">
                           <h2>I don't know whether you've got any favorite movies. Try to find something you like a lot.</h2>
                       </div>)
                }
            </div>
        );
    }
};


const mapStateToProps = (state) => {
    return {
        favs: state.favs
    };
};

export default connect(mapStateToProps, {toggleFav})(Favs);
