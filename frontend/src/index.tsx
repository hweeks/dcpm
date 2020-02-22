import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";

const load = () => {
  ReactDOM.render(
    <App />,
    document.getElementById("home")
  );
}

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', load)
} else {
  load()
}
