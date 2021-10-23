import React, { useEffect, useContext, useCallback } from "react";
import { Route } from "react-router-dom";

import Home from "./pages/home";
import Comic from "./pages/comic";
import ComicContext from "./store/comicContext";
import Header from "./components/header/header.component";
import About from "./pages/about";
import Footer from "./components/footer/footer.component";

const App = () => {
  const comicCtx = useContext(ComicContext);
  const { getLatestComicNumber } = comicCtx;

  // useCallback to find the latestComic in the API and it only execute once
  const fetchAPIToGetLatestComicNumber = useCallback(async () => {
    try {
      const latestComicResponse = await fetch(`/info.0.json`);
      if (!latestComicResponse.ok) {
        throw Error(latestComicResponse.statusText);
      }
      const latestData = await latestComicResponse.json();
      getLatestComicNumber(latestData.num);
    } catch (err) {
      console.log(err);
    }
  }, [getLatestComicNumber]);

  // useEffect to run fetchAPIToGetLatestComicNumber when loading the website
  useEffect(() => {
    fetchAPIToGetLatestComicNumber();
  }, [fetchAPIToGetLatestComicNumber]);

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/comicnumber/:comicnumber">
          <Comic />
        </Route>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
