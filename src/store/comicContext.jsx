import React from "react";

const ComicContext = React.createContext({
  currentComicNumber: 0,
  latestComicNumber: 0,
  nextComic: () => {},
  prevComic: () => {},
  setComicNumber: (num) => {},
  getLatestComicNumber: (num) => {},
});

export default ComicContext;
