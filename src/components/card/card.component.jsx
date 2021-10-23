import React, { useContext, useEffect, useState } from "react";

import Button from "../button/button.component";
import ComicContext from "../../store/comicContext";
import "./card.styles.css";
import CardDetail from "./card-detail.component";
import Spinner from "../spinner/spinner.component";

const Card = () => {
  // Access Comic Context
  const comicCtx = useContext(ComicContext);
  const { latestComicNumber, currentComicNumber } = comicCtx;

  const [isLatestComic, setIsLatestComic] = useState(true);
  const [comicData, setComicData] = useState();
  const [createdDate, setCreatedDate] = useState();

  const nextPageHandler = () => {
    comicCtx.nextComic();
  };

  const prevPageHandler = () => {
    comicCtx.prevComic();
  };

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
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAPI();
  }, [setComicData, currentComicNumber]);

  // Show  spinner  before getting the data
  let content = <Spinner />;

  if (comicData) {
    content = (
      <div className='card'>
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
      </div >
    );
  }

  return content;
};

export default Card;
