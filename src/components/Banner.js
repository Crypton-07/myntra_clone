import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className="slide-container">
      {bannerImage && (
        <Slide duration={1500} easing="ease-in" infinite transitionDuration={1500} slidesToScroll={1}>
          {bannerImage.map((bg, index) => (
            <div
              key={bg.raw}
              className={`px-2 flex items-center justify-center`}
            >
              <img
                className="h-[450px] w-[85%] object-cover"
                src={bg.full}
                alt="banner"
              />
            </div>
          ))}
        </Slide>
      )}
    </div>
  );
};

export default Banner;
