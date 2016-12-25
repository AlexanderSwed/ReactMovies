import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  getMovies() {
    return fetch('api/movies', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(res => res.json())
    .then(response => {
      return response;
      /*return dispatch({
        type: "GET_CALL",
        response: response
      });*/
    })
  }

  componentWillMount() {
    this.setState({
      movies: this.getMovies()
    });
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
