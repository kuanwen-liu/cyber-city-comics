import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import ComicProvider from "./store/comicProvider";

ReactDOM.render(
  <BrowserRouter>
    <ComicProvider>
      <App />
    </ComicProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
