import React, { useEffect, useContext, useCallback } from "react";

import "./home.css";
import Card from "../components/card/card.component";
import ComicContext from "../store/comicContext";

const Home = (props) => {
  const comicCtx = useContext(ComicContext);
  const { setComicNumber, latestComicNumber } = comicCtx;

  // useCallback to make sure only render once
  const setLatestNumberToCurrentNumber = useCallback(() => {
    setComicNumber(latestComicNumber);
  }, [setComicNumber, latestComicNumber]);

  useEffect(() => {
    setLatestNumberToCurrentNumber();
  }, [setLatestNumberToCurrentNumber]);

  return <Card data={props.comicData} />;
};

export default Home;
