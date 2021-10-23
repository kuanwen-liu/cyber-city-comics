import React from "react";

import "./card-detail.styles.css";

const CardDetail = (props) => {
  // Parse transcript to more readable format
  const transcript = props.comicData.transcript
    .split("\n")
    .map((paragraph) => <p key={Math.random()}>{paragraph}</p>);

  return (
    <div className="card-detail">
      <h1>{props.comicData.alt}</h1>
      <h5>Date: {props.createdDate}</h5>
      <img src={props.comicData.img} alt={props.comicData.alt} />
      <div>{transcript}</div>
    </div>
  );
};

export default CardDetail;
