import React, { forwardRef } from "react";
import "./ads.css";

const Ads = forwardRef(function Ads({ image, heading, description }, ref) {
  return (
    <>
      {heading == null ? (
        <div ref={ref} className=" hidden ">
          <div className="flex z-50 absolute top-1/2 h-[200vh] w-full items-center justify-center">
            <div className=" flex max-w-2xl h-96 bg-white border border-gray-300 rounded-sm shadow-2xl  dark:bg-gray-800 dark:border-gray-700">
              <div className=" w-100p ">
                <img
                  src={image}
                  alt="Advertisement"
                  className="h-full object-center"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div ref={ref} className=" hidden ">
          <div className="flex z-50 absolute top-1/2 h-[200vh] w-full items-center justify-center">
            <div className=" flex max-w-2xl h-96 bg-white border border-gray-300 rounded-sm shadow-2xl  dark:bg-gray-800 dark:border-gray-700">
              <div className=" w-40p ">
                <img
                  src={image}
                  alt="Advertisement"
                  className="h-full object-center"
                />
              </div>
              <div className="flex h-full flex-col w-60p overflow-hidden pr-8 ml-8 items-start justify-center">
                <span>
                  <h5 className="my-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {heading}
                  </h5>
                </span>
                <p className=" text-sm text-gray-700 dark:text-gray-400">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Ads;
