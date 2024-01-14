import React from "react";

const Shimmer = () => {
  const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="flex flex-wrap gap-3 items-center justify-start mx-2 space-y-2">
      {dummyData.map((e, i) => (
        <div
          key={i}
          className="w-[240px] h-[400px] flex flex-col space-y-6 justify-start items-center bg-slate-50 shadow-md rounded-md"
        >
          <div className="w-full h-[200px] p-2 bg-gray-200"></div>
          <div className="flex flex-col justify-center items-center space-y-2 w-full">
            <p className="px-2 py-4 bg-gray-200 w-44"></p>
            <p className="px-2 py-4 bg-gray-200 w-44"></p>
            <p className="px-2 py-4 bg-gray-200 w-44"></p>
          </div>
          <button className="px-2 h-10 w-[100%] bg-gray-200"></button>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
