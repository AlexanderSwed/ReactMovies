import React from "react";

import Pagination from "../../components/Pagination"

import "./MovieVideos.css";

class MovieVideos extends React.Component {

    constructor(props) {
        super(props);
        this.toggleVideo = this.toggleVideo.bind(this);
        let videos = props.videos.map( (el, i) => <button type="button" onClick={this.toggleVideo} data-key={el.key}>{i + 1}</button> );
        this.state = {
            videos,
            cur_video: props.videos[0].key,
            index: 1,
            video_height: 0,
            show: false
        }
    }

    componentDidMount() {
        return 
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.videos === this.state.videos &&
            nextState.video_height === this.state.video_height &&
            nextState.show === this.state.show &&
            nextState.cur_video === this.state.cur_video) {
            return false;
        }
        else return true;
    }

    setVideoSize(e) {
        let video_height = 0;
        if (e.target.offsetWidth > 0) {
            video_height = Math.floor(9 * e.target.offsetWidth / 16);
        }
        this.setState({video_height, show: true});
    }

    toggleVideo(e) {
        this.setState({
            cur_video: e.target.getAttribute("data-key"),
            index: parseInt(e.target.textContent, 10)
        });
    }

    render() {
        return (
                <div className={ "card large card-videos" + (this.state.show ? " video-shown" : " hidden") }>
                    <h2>Videos:</h2>
                    {
                        this.state.videos && this.state.videos.length > 1 ?
                        <Pagination
                                    page={this.state.index}
                                    total_pages={this.state.videos.length}
                                    paginationLinks={this.state.videos}
                                /> : ""
                    }
                    <div className="card-image movie-videos">
                        <iframe id="ytplayer"
                                type="text/html"
                                src={`https://www.youtube.com/embed/${this.state.cur_video}`}
                                frameBorder="0"
                                height={this.state.video_height}
                                onLoad={(e) => this.setVideoSize(e)}></iframe>
                    </div>
                </div>
            );
    }
}

export default MovieVideos;