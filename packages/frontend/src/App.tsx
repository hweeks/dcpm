import * as React from "react";
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import thunkMiddleware from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'
import {Home} from './pages/Home'
import {Search} from './pages/Search'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { reducer } from "./reducers";

const GlobalStyle = createGlobalStyle`
  ${reset}
`

export const store = createStore(reducer, compose(applyMiddleware(thunkMiddleware)))

export const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <GlobalStyle />
        <nav>
          <div>
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <a href="https://docs.dcpm.dev" target="_blank">Docs</a>
          </div>
        </nav>
        {
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        }
      </div>
    </Router>
  </Provider>
)
