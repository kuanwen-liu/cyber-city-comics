import React, { useCallback, useContext, useEffect, useState } from "react";

import Button from "../button/button.component";
import ComicContext from "../../store/comicContext";
import CardDetail from "./card-detail.component";
import Spinner from "../spinner/spinner.component";

import "./card.styles.css";

const Card = () => {
  // Access Comic Context
  const comicCtx = useContext(ComicContext);
  const { latestComicNumber, currentComicNumber } = comicCtx;

  const [isLatestComic, setIsLatestComic] = useState(true);
  const [comicData, setComicData] = useState();
  const [createdDate, setCreatedDate] = useState();
  const [randomNumber, setRandomNumber] = useState();

  const nextPageHandler = () => {
    comicCtx.nextComic();
  };

  const prevPageHandler = () => {
    comicCtx.prevComic();
  };

  // Random number function with useCallback hook
  const randomNumberHandler = useCallback(() => {
    // get the random decimal number between 0 and latest number - 1
    const random = Math.random() * latestComicNumber;

    // get integer number and + 1. make sure not to get 0
    const truncNumber = Math.trunc(random) + 1;
    setRandomNumber(truncNumber);
  }, [latestComicNumber]);

  // A function to format the date
  const formatDate = (data) => {
    const { day, month, year } = data;
    const date = new Date(year, month, day).toISOString().split("T")[0];
    setCreatedDate(date);
  };

  // useEffect to check if the current comic is the latest one
  useEffect(() => {
    if (latestComicNumber === currentComicNumber) {
      setIsLatestComic(true);
    } else {
      setIsLatestComic(false);
    }
  }, [latestComicNumber, currentComicNumber]);

  // useEffect execute whenever number, setData, hooks are changing then fetch the new data
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        if (currentComicNumber <= 0) {
          return;
        } else {
          const response = await fetch(`/${currentComicNumber}/info.0.json`);

          if (!response.ok) {
            throw Error(response.statusText);
          }
          const data = await response.json();
          setComicData(data);
          formatDate(data);

          // When the page is randing will get a new random number immediately
          randomNumberHandler();
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAPI();
  }, [setComicData, currentComicNumber, randomNumberHandler]);

  // Show  spinner  before getting the data
  let content = <Spinner />;

  if (comicData) {
    content = (
      <div className="card">
        <CardDetail comicData={comicData} createdDate={createdDate} />

        <div className="btn-container">
          {/* Hide the button if the current comic is the first one */}
          {currentComicNumber !== 1 && (
            <Button
              onClick={prevPageHandler}
              to={`/comicnumber/${currentComicNumber - 1}`}
            >
              Previous
            </Button>
          )}

          <Button to={`/comicnumber/${randomNumber}`}>Random Comic</Button>

          {/* Hide the button if the current comic is the last one */}
          {!isLatestComic && (
            <Button
              onClick={nextPageHandler}
              to={`/comicnumber/${currentComicNumber + 1}`}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    );
  }

  return content;
};

export default Card;
