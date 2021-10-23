import React, { useContext } from "react";

import ComicContext from "../store/comicContext";
import "./about.styles.css";

const About = () => {
  const comicCtx = useContext(ComicContext);

  return (
    <div className="about">
      <h1>About Us</h1>
      <div className="about-container">
        <div>
          <img
            src="https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg"
            alt="first-comic"
          />
          <label>Our First Comic</label>
        </div>
        <div>
          <h3>
            Cyber City Comics is one of the fastest growing comic book stores in
            downtown Toronto since 1990s. We have upload{" "}
            {comicCtx.latestComicNumber} comics until now. You can go to our
            home page to see the last comic or simply type the /comicnumber/ +
            numbers after our home page url to navigate to the specific comic.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default About;
