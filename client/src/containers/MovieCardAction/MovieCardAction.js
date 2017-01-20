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
            isShareTipShowed: false
        };
        this.shareLink = this.shareLink.bind(this);
        this.showTip = this.showTip.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.isFavorite !== this.props.isFavorite) return true;
        if (!nextProps.title && nextProps.title === this.state.title ) return false;
        else return true;
    }

    componentWillReceiveProps(newProps) {
        let url = encodeURIComponent(window.location.href),
            img = encodeURIComponent(newProps.img),
            title = encodeURIComponent(newProps.title);
        this.setState({
            url: window.location.href,
            title: newProps.title,
            ...getLinks(url, title, img),
            isShareTipShowed: false
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
                <button type="button" className={ this.props.isFavorite ? "like" : ""} onClick={this.props.toggleFavorite}>
                    <i className="material-icons center" title="Add to a list">favorite</i>
                </button>
            </div>
        );
    }

}

export default MovieCardAction;