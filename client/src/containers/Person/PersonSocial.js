import React from "react";

import imdb from "./static/imdb.png"
import fb from "./static/fb.png"
import tw from "./static/tw.png"
import inst from "./static/inst.png"

const PersonSocial = (props) => {
    let i = 0;
    let links = Object.keys(props.links).map( (key, index) => {
        if (props.links[key]) {
            let bg, addr;
            switch (key) {
                case "imdb_id":
                    addr = `http://www.imdb.com/name/${props.links[key]}`;
                    bg = imdb;
                    break;
                case "facebook_id":
                    addr = `https://www.facebook.com/${props.links[key]}`;
                    bg = fb;
                    break;
                case "twitter_id":
                    addr = `https://twitter.com/${props.links[key]}`;
                    bg = tw;
                    break;
                case "instagram_id":
                    addr = `https://www.instagram.com/${props.links[key]}`;
                    bg = inst;
                    break;
                default:
                    return null;
            }
            i++;
            return (<a href={addr} key={i} target="_blank">
                        <div className="social-link" style={ {transitionDelay: `${0.08*i}s`, backgroundImage: `url(${bg})`} }></div>
                    </a>);
        }
        return null;
    });
    return (<div className="social-links">
                {links}
            </div>)
}

export default PersonSocial;