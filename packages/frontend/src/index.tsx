import * as React from "react";
import * as ReactDOM from "react-dom";
import {Home} from './pages/Home'
import {Search} from './pages/Search'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <nav>
        <div>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
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
)

ReactDOM.render(
    <App />,
    document.getElementById("home")
);
