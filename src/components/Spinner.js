import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="relative w-screen h-screen backdrop-grayscale-0 bg-white/30">
      <div className="z-50 absolute top-[45%] left-[45%]">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#FF5B5B"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default Spinner;
