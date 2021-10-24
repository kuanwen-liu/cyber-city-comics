import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./card-detail.styles.css";

const CardDetail = (props) => {
  const [numberOfVisited, setNumberOfVisited] = useState();

  // useParams to get the url parameter
  const paras = useParams();
  const paraNumber = paras.comicnumber;

  // fetch CountAPI to count every comic that has been view on my website
  useEffect(() => {
    const counter = async () => {
      try {
        const response = await fetch(
          `https://api.countapi.xyz/update/comic${paraNumber}/comic${paraNumber}/?amount=1`
        );

        // Check if the api does not return the value then create a new one
        if (!response.ok) {
          await fetch(
            `https://api.countapi.xyz/create?namespace=comic${paraNumber}&key=comic${paraNumber}&value=0`
          );
          counter();
        }

        const num = await response.json();

        setNumberOfVisited(num.value);
      } catch (err) {
        console.log(err);
      }
    };
    counter();
  }, [paraNumber]);

  // Parse transcript to more readable format
  const transcript = props.comicData.transcript
    .split("\n")
    .map((paragraph) => <p key={Math.random()}>{paragraph}</p>);

  return (
    <div className="card-detail">
      <h1>{props.comicData.alt}</h1>
      <h3>
        <span>Date: {props.createdDate}</span>
        <span>Viewed: {numberOfVisited}</span>
      </h3>
      <img src={props.comicData.img} alt={props.comicData.alt} />
      <div>{transcript}</div>
    </div>
  );
};

export default CardDetail;
