import React from "react";

import AppTree from "./AppTree"

import "./About.css"
import cast_search_src from "./static/cast-search.webm"
import wat from "./static/wat.jpg"

class About extends React.Component {

    constructor(props) {
        super(props);
        this.toggleTree = this.toggleTree.bind(this);
        this.goTo = this.goTo.bind(this);
        this.state = {
            isTreeExpanded: false
        }
    }

    componentDidMount() {
        this.components = document.querySelectorAll('.About .tree-component');
        this.tree = document.querySelectorAll('.About input[type="checkbox"]');
        this.components.forEach( el => {
            el.addEventListener('mouseover', (event) => {
                let text = event.target.textContent;
                this.components.forEach( (component) => {
                    if (component.textContent === text) {
                        component.style.color = "#e91e63";
                    }
                });
            });
            el.addEventListener('mouseout', (event) => {
                this.components.forEach( el => el.removeAttribute('style'));
            });
        } );
    }

    toggleTree() {
        this.tree.forEach( el => el.checked = !this.state.isTreeExpanded);
        this.setState({
            isTreeExpanded: !this.state.isTreeExpanded
        });
    }

    goTo(e) {
        document.querySelector(e.target.parentElement.getAttribute('data-id')).scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        return (
            <div className="col s12 m10 offset-m1 l6 offset-l3 About">
                <div className="card large">
                    <h3>Contents</h3>
                    <ul>
                        <li>
                            <ul className="collection">
                                <li className="collection-header">
                                    <button type="button" onClick={this.goTo} data-id="#apologies"><h4>Apologies<i className="material-icons">link</i></h4></button>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="collection">
                                <li className="collection-header">
                                    <button type="button" onClick={this.goTo} data-id="#main"><h4>Main Info<i className="material-icons">link</i></h4></button>
                                </li>
                                <li className="collection-item wat">What?<img src={wat} alt="WAT"/></li>
                                <li className="collection-item">How?</li>
                                <li className="collection-item">Why?</li>
                            </ul>
                        </li>
                        <li>
                            <ul className="collection">
                                <li className="collection-header">
                                    <button type="button" onClick={this.goTo} data-id="#structure"><h4>Project info<i className="material-icons">link</i></h4></button>
                                </li>
                                <li className="collection-item">Tools</li>
                                <li className="collection-item">Project Tree</li>
                                <li className="collection-item">Noteworthy components</li>
                            </ul>
                        </li>
                        <li>
                            <ul className="collection">
                                <li className="collection-header">
                                    <button type="button" onClick={this.goTo} data-id="#me"><h4>About me c:<i className="material-icons">link</i></h4></button>
                                </li>
                                <li className="collection-item">Main info</li>
                                <li className="collection-item">Contacts</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="apologies" className="card large">
                    <h3>Apologies</h3>
                    <p>
                    First of all, sorry for my English. Hope, everything will be clear for you.<br/>
                    Also, before we start, sorry for horizontal scroll on the home page.
                    While creating the home page, I was thinking about mobile devices. What's can be better, smoother and more native
                    than native horizontal scroll? With horizontal scroll all items are easily accessible. Try it on your phone.
                    This issue will be resolved later.<br/>
                    And sorry for the joke, Ben, I like your work, it's just a joke.
                    </p>
                </div>
                <div id="main" className="card large">
                    <h3>Main Info</h3>
                    <h5>So, what is that?</h5>
                    <p>This web application allows you to use a huge database of <a href="https://www.themoviedb.org/" target="_blank">The Movie DB</a>.
                    The database contains a huge amount of information about movies, TV shows and people, like actors or directors. If you're looking for some information
                    about movie you can use it. You can find a movie by title and read overview, get a link to chosen movie on IMDb, find out who is starring or in the crew.
                    If you noted one of the characters in some movie, you can easily find an actor who performs this role. When you found this actor, you can go to his page
                    and find a list of movies or tv shows in which he starred. If the database provides a list of videos, related to the movie or TV, you can watch them.
                    For TV this database has a lot of information about the seasons and episodes. A plenty of episodes has posters and overview.<br/>
                    And all this is easily accessible as marijuana in 
                    <i title="In August 2014, Uruguay legalized growing up to six plants at home." className="title-info"> Uruguay</i>.
                    </p>
                    <h5>And how to use it?</h5>
                    <p>
                        On the homepage you can see the list of most wanted people, now playing movies and TVs and upcoming movies that will be next week/month.
                        Use search bar to find a movie, TV or a person. You can enter a title or a name letter by letter and if there is nothing in the suggestions list
                        that you are looking for, type Enter button to jump to the search page. It has posters and photo, so you can find sought-for item.<br/>
                        On a movie or a TV page you can see overview, starring actors and videos. There are also release date and IMDb rate that is the link to the IMDB page
                        of current item. Clicking on <button type="button">VIEW ALL</button> button on the cast card will send you to the page with cast where you can use
                        inner search bar to find a person by name or by character.
                        <video width="100%" autoPlay loop>
                            <source src={cast_search_src}/>
                        </video>
                        It's quite similar to how you can search for the movies or TVs on the person's page.
                    </p>
                    <h5>Okay, but why I should use it?</h5>
                    <p>Frankly, you shouldn't. This project had only one goal - understand React and get an experience in React + Redux. Once I found
                    <a href="https://www.themoviedb.org/" target="_blank"> The Movie DB API</a> and ideas like bricks began to build this project in my mind.
                    It takes a lot of time as questions have been raised not only about the appearance, but in functionality as well. Firstly, inspired by the idea
                    of the React tutorial I started to build an application that simply allows to create a list of favorites movies. For now, I would like to implement the database,
                    which would contain users and their lists, like user's favorites, or list of Marvel movies, or an empty list of good movies with Ben Affleck.
                    As almost all frontend work is complete, I can start to learn NodeJS to implement this idea.
                    </p>
                </div>
                <div id="structure" className="card large">
                    <h3>Project Info</h3>
                    <h5>Tools</h5>
                    <p>
                    As I said, my main goal was to obtain an experince in <a href="https://facebook.github.io/react/">React</a>, as I knew nothing about it at the beginning.
                    For quick start I used <a href="https://github.com/facebookincubator/create-react-app">create-react-app</a> that 
                    makes initialization really fast and simple without worrying about <a href="https://webpack.github.io/">Webpack</a> stuff.
                    There is also <a href="https://nodejs.org/en/">NodeJS</a> with <a href="http://expressjs.com/">Express</a> on backend. Again, simple and easy.<br/>
                    Of course, there is also <a href="http://redux.js.org/">react-redux</a> module. 
                    Currently it is used only to keep in state search results, as some search happens when user
                    type query in search bar and some when he changes a page on search result's page. It is easy to see from Project Tree
                    that these two components lie in different levels of nesting, so it is much easier to have a main state and take necessary properties and actions
                    from those components that needs them.
                    To make appearance stuff easily I used <a href="http://materializecss.com/">MaterializeCSS</a>.
                    </p>
                    <h5>Project Tree</h5>
                    <AppTree toggleTree={this.toggleTree} isTreeExpanded={this.state.isTreeExpanded}/>
                    <p>
                    I devided sources to stateless components and containers. Components that are used only by one container lie in the same folder with it.
                    Some containers, such as <i className="tree-component">MovieVideos</i> are reusable.
                    Also, I decided to put all reducer stuff in a separate folder, instead of keeping them in the same folder with the containers that are used them.
                    </p>
                    <h5>Noteworthy components</h5>
                    <p><i>SearchBar and SearchPage</i> - component that returns search bar that lies in header. 
                    This component keeps its own state with query string and search suggestions that are passed to SearchSuggestions component. 
                    When a user click Enter button, he dispatches search action that fetches data from API and set it to the state. 
                    While fetching, user is redirected to the search page, where all results from redux state will be shown as soon as they will be ready.</p>
                    <p><i>CardCollection</i> - allows user to search for a person, a character or a movie. It takes an array or collection of data and the function that maps this array
                    to render elements. I did it in this way to make component more reusable. With this map method CardCollection maps an array of filtered elements,
                    elements from an main array that contains inputed value.</p>
                    <p>More info soon...</p>
                </div>
                <div id="me" className="card large">
                    <h3>About me</h3>
                    <h5>Main info</h5>
                    <p>My name is Oleksandr Shvechykov and I am from Ukraine - wonderful country with a plenty of smart and talanted people.
                    Once I understood that in variety of directions I could go in IT world, web-developing is much preferable for me. 
                    After some time with C++ I realized that in love with JS. So if you are searching for someone clever,
                    creative, who fascinated by software engineering and who develop skills everyday - here I am.</p>
                    <h5>Contacts</h5>
                    <p>If you found a mistake - feel free to contact me:</p>
                    <p className="contacts">
                    Email: swedalexander@gmail.com<br/>
                    Phone: +380507310163<br/>
                    Telegram: @AlexanderSwed</p>
                </div>
            </div>
        );
    }
}

export default About;