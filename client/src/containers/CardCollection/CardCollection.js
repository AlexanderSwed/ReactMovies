import React from "react"

import "./CardCollection.css"

class CardCollection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collection: props.collection,
            filtered: props.collection,
            query: ""
        }
        this.mapCollection = props.mapCollection;
        this.handleChange = this.handleChange.bind(this);
        this.cleanInput = this.cleanInput.bind(this);
    }

    handleChange(event) {
        let val = event.target.value;
        this.setState({
            query: val
        });
        if (val.length === 0) {
            this.setState({filtered: this.state.collection});
            return;
        }
        if (val.length > 1) {
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => {
                this.filter(val);
             }, 100);
        }
    }

    filter(val) {
        let filtered = this.state.collection.filter( (el) => {
            if (el.name) {
                return (el.name.search(val) !== -1 || el.character.search(val) !== -1) ? true : false;
            }
            else if (el.title) {
                return (el.title.search(val) !== -1 || el.character.search(val) !== -1) ? true : false;
            }
            return false;
        });
        this.setState({
            query: val,
            filtered
        });
    }

    cleanInput() {
        this.setState({
            query: '',
            filtered: this.state.collection
        });
    }

    render() {
        return (
            <div className="content">
                {
                    this.state.collection.length > 8 ?
                    <div className="Search-input">
                        <input
                            placeholder={`${this.state.collection[1].name || this.state.collection[1].title} or ${this.state.collection[3].character}`}
                            type="text"
                            autoComplete="off"
                            value={this.state.query}
                            onChange={this.handleChange}
                        />
                        <button className="btn-search valign-wrapper"><i className="search-icon material-icons valign">search</i></button>
                        { this.state.query.length > 0 && <button className="btn-clear valign-wrapper" onClick={ this.cleanInput }><i className="clear material-icons valign">clear</i></button> }
                    </div>
                    : ""
                }
                <ul className={"collection" + (this.state.collection.length > 8 ? "" : " collection-no-search")} >
                    {
                        this.state.filtered.map( (el, i) => this.mapCollection(el, i))
                    }
                </ul>
            </div>
        );
    }
}

export default CardCollection;