import React, { useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import Card from "../components/card/card.component";
import ComicContext from "../store/comicContext";

const Comic = () => {
  // useParams to get the url parameter
  const paras = useParams();
  const paraNumber = paras.comicnumber;
  const comicCtx = useContext(ComicContext);

  const { setComicNumber } = comicCtx;

  // useCallback to make sure only render once unless url parameter is changing
  const setParaNumber = useCallback(() => {
    setComicNumber(+paraNumber);
  }, [setComicNumber, paraNumber]);

  useEffect(() => {
    setParaNumber();
  }, [setParaNumber]);

  return <Card />;
};

export default Comic;
