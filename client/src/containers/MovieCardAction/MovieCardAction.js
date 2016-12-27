import React from "react";
import CopyToClipboard from 'react-copy-to-clipboard';

import share_fb from "./static/share-fb.svg"
import share_vk from "./static/share-vk.svg"
import share_t from "./static/share-t.svg"
import "./MovieCardAction.css"

const copyLink = () => {
    let area = document.getElementById('share-link');
    area.setSelectionRange(0, area.value.length);
    area.nextSibling.style.opacity = 1;
    setTimeout(function() {
        area.nextSibling.style.opacity = 0;
    }, 2000);
}

const getLinks = (url, title, img) => {
    return {
                fb_url: `https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=${url}`,
                vk_url: `http://vk.com/share.php?url=${url}&title=${title}&image=${img}`,
                t_url: `https://telegram.me/share/url?url=${url}&text=${title}`
            };
};

class MovieCardAction extends React.Component {

    constructor(props) {
        super(props);
        let url = encodeURIComponent(window.location.href),
            img = encodeURIComponent(props.img),
            title = encodeURIComponent(props.title);
        this.state = {
            url: window.location.href,
            title: props.title,
            ...getLinks(url, title, img),
            isShareTipShowed: false, isAddTipShowed: false,
            userLists: [{id: "someId", name: "Favorites"}],
            newListName: ""
        };
        this.shareLink = this.shareLink.bind(this);
        this.showTip = this.showTip.bind(this);
        this.onListCreate = this.onListCreate.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.title && nextProps.title === this.state.title ) return false;
        else return true;
    }

    componentDidMount() {
        this.dummyTip = document.querySelector('.dummy-tip');
    }

    componentWillReceiveProps(newProps) {
        let url = encodeURIComponent(window.location.href),
            img = encodeURIComponent(newProps.img),
            title = encodeURIComponent(newProps.title);
        this.setState({
            url: window.location.href,
            title: newProps.title,
            ...getLinks(url, title, img),
            newListName: "",
            isShareTipShowed: false, isAddTipShowed: false,
            userLists: [{id: "someId", name: "Favorites"}]
        })
    }

    showTip(isShareButtonClicked) {
        if (isShareButtonClicked) this.setState({ isShareTipShowed: !this.state.isShareTipShowed, isAddTipShowed: false});
        else this.setState({ isShareTipShowed: false, isAddTipShowed: !this.state.isAddTipShowed});
    }

    shareLink(url) {
        window.open(url,"_blank", 'toolbar=0,location=0,menubar=0,directories=0,scrollbars=0,width=548,height=325');
        return false;
    }

    handleNameInput(e) {
        this.setState({newListName: e.target.value})
    }

    onListCreate(e) {
        e.preventDefault();
        if (this.state.newListName) {
            let date = new Date();
            this.setState({
                userLists: [...this.state.userLists, {id: date, name: this.state.newListName}],
                newListName: ""
            });
            if (!this.dummyTip.style.opacity) {
                this.dummyTip.style.opacity = 1;
                this.dummyTip.style.pointerEvents = "all";
            }
        }
    }

    render() {
        return (
            <div className="card-action">
                <button type="button" className={this.state.isShareTipShowed ? "share-clicked" : ""} onClick={() => this.showTip(true)}>
                    <i className="material-icons center" title="Share">share</i>
                </button>
                <div className={"tip tip-share" + ( this.state.isShareTipShowed ? " show-tip" : "" )}>
                    <CopyToClipboard text={this.state.url} onCopy={copyLink}>
                        <input type="text" id="share-link" value={this.state.url} readOnly="true" />
                    </CopyToClipboard>
                        <label htmlFor="share-link">Link copied!</label>
                    <button type="button" onClick={ () => this.shareLink(this.state.fb_url) }>
                        <img src={share_fb} alt="Facebook" />
                    </button>
                    <button type="button" onClick={ () => this.shareLink(this.state.vk_url) }>
                        <img src={share_vk} alt="VK"/>
                    </button>
                    <button type="button" onClick={ () => this.shareLink(this.state.t_url) }>
                        <img src={share_t} alt="Telegram"/>
                    </button>
                </div>
                <button type="button" className={this.state.isAddTipShowed ? "share-clicked" : ""} onClick={() => this.showTip(false)}>
                    <i className="material-icons center" title="Add to a list">add</i>
                </button>
                <div className={"tip tip-add" + ( this.state.isAddTipShowed ? " show-tip" : "" )}>
                    { this.state.userLists.map( el => 
                        [<input type="checkbox" id={el.id}/>,<label htmlFor={el.id}>{el.name}</label>]
                    ) }
                    <form className="new-list" onSubmit={this.onListCreate}>
                        <input
                            type="text"
                            id="newListName"
                            autoComplete="off"
                            value={this.state.newListName}
                            placeholder="New list"
                            onChange={this.handleNameInput}
                        /><label htmlFor="newListName">Create a new list</label>
                        <button type="submit">Create</button>
                    </form>
                    <div className="dummy-tip" onClick={
                        () => {this.dummyTip.style.opacity = 0;this.dummyTip.style.pointerEvents = "none";}}
                    >Indeed, in reality nothing has changed. This feature isn't ready yet.<br/>¯\_(ツ)_/¯<br/>OK</div>
                </div>
            </div>
        );
    }

}

export default MovieCardAction;