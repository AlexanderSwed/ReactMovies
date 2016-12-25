import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './components/App';
import About from './containers/About/About';
import Home from './containers/Home/Home';
import MoviePage from './containers/MoviePage/MoviePage';
import TvPage from './containers/TvPage/TvPage';
import Lists from './containers/Lists/Lists';
import MovieCast from './containers/MovieCast/MovieCast';
import Search from './containers/Search/Search';
import Person from './containers/Person/Person';

import store from "./redux/store";

import './index.css';


const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/search" component={Search}/>
        <Route path="/search/:query" component={Search}/>
        <Route path="/movie/:id" component={MoviePage}/>
        <Route path="/tv/:id" component={TvPage}/>
        <Route path="/person/:id" component={Person}/>
        <Route path="/movie/:id/cast" component={MovieCast}/>
        <Route path="/about" component={About}/>
        <Route path="/lists" component={Lists}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)