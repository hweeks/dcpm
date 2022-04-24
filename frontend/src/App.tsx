import * as React from "react";
import { Provider } from "react-redux";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import thunkMiddleware from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { reducer } from "./reducers";
import { theme } from "./theme";
import { Nav } from "./comps/Nav";
import { Blob } from "./pages/Blob";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Crimson+Text:400,600|Montserrat:400,600&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Cousine:400,400i,700,700i&display=swap');
  ${reset}
  html {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    background-color: #f7f7f7;
    border-top: 4px solid #ff7043;
    border-bottom: 4px solid #fb8c00;
    min-height: 100vh;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    font-family: 'Montserrat', sans-serif;
  }

`;

const PageWrapper = styled.div`
  width: ${(props) => props.theme.widthFull};
  max-width: 1200px;
  padding: 0 10vw;
  margin: auto;
`;

export const store = createStore(
  reducer,
  compose(applyMiddleware(thunkMiddleware))
);

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <PageWrapper>
          <GlobalStyle />
          <Nav />
          {
            <Switch>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/package/:pkg" component={Blob}></Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          }
        </PageWrapper>
      </Router>
    </ThemeProvider>
  </Provider>
);
