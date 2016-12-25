import React from "react";

import HomeMovies from "./HomeMovies"
import HomePeople from "./HomePeople"

import "./Home.css";

class Home extends React.Component {

/*    contentScroll(e) {
        e.preventDefault();
        let path = e.nativeEvent.path,
            nowPlaying = path.indexOf(this.refs.$nowPlaying),
            popularPeople = path.indexOf(this.refs.$people),
            elem;
        if (nowPlaying !== -1) elem = path[nowPlaying];
        else if (popularPeople !== -1) elem = path[popularPeople];
        else return;
        if (e.deltaY > 0) {
            for (let i = 0; i <= 60; i++) {
                setTimeout((i) => elem.scrollLeft += 2, 10*i); 
            }
        }
        else {
             for (let i = 0; i <= 60; i++) {
                setTimeout((i) => elem.scrollLeft -= 2, 10*i); 
            }
        }
    }*/

    render() {
        return (
            <div className="Home">
                <HomeMovies type={"movie/upcoming"} header={"Upcoming"}/>
                <HomePeople />
                <HomeMovies type={"movie/now_playing"} header={"Now playing"}/>
                <HomeMovies type={"tv/on_the_air"} header={"Now on TV"}/>
            </div>
        );
    }
}

export default Home;