import React, { useReducer, useCallback } from "react";

import ComicContext from "./comicContext";

const DEFAULT_COMIC_STATE = {
  comicData: {},
  currentComicNumber: 0,
  latestComicNumber: 0,
};

const comicReducer = (state, action) => {
  if (action.type === "NEXT") {
    return {
      currentComicNumber: state.currentComicNumber + 1,
      latestComicNumber: state.latestComicNumber,
    };
  }

  if (action.type === "PREVIOUS") {
    return {
      currentComicNumber: state.currentComicNumber - 1,
      latestComicNumber: state.latestComicNumber,
    };
  }

  if (action.type === "SET") {
    return {
      currentComicNumber: action.num,
      latestComicNumber: state.latestComicNumber,
    };
  }

  if (action.type === "LATESTNUMBER") {
    return {
      currentComicNumber: state.currentComicNumber,
      latestComicNumber: action.num,
    };
  }

  return DEFAULT_COMIC_STATE;
};

const ComicProvider = (props) => {
  const [comicState, dispatchComicAction] = useReducer(
    comicReducer,
    DEFAULT_COMIC_STATE
  );

  const nextComicHandler = () => {
    dispatchComicAction({
      type: "NEXT",
    });
  };

  const prevComicHandler = () => {
    dispatchComicAction({
      type: "PREVIOUS",
    });
  };

  const setComicNumberHandler = useCallback((num) => {
    dispatchComicAction({
      type: "SET",
      num: num,
    });
  }, []);

  const getLatestComicNumberHandler = useCallback((num) => {
    dispatchComicAction({
      type: "LATESTNUMBER",
      num: num,
    });
  }, []);

  const comicContext = {
    currentComicNumber: comicState.currentComicNumber,
    latestComicNumber: comicState.latestComicNumber,
    nextComic: nextComicHandler,
    prevComic: prevComicHandler,
    setComicNumber: setComicNumberHandler,
    getLatestComicNumber: getLatestComicNumberHandler,
  };

  return (
    <ComicContext.Provider value={comicContext}>
      {props.children}
    </ComicContext.Provider>
  );
};

export default ComicProvider;
