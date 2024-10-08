import React, { Fragment, useEffect, useState } from "react";
import "./ads.css";
import Skeleton from "./skeleton";
import aedFlag from "../img/aed.svg";
import audFlag from "../img/aud.svg";
import bhdFlag from "../img/bhd.svg";
import cadFlag from "../img/cad.svg";
import cnyFlag from "../img/cny.svg";
import eurFlag from "../img/eur.svg";
import gbpFlag from "../img/gbp.svg";
import omrFlag from "../img/omr.svg";
import qarFlag from "../img/qar.svg";
import sarFlag from "../img/sar.svg";
import usdFlag from "../img/usd.svg";
import kwdFlag from "../img/kwd.svg";

let arr = [
  usdFlag,
  gbpFlag,
  eurFlag,
  sarFlag,
  aedFlag,
  qarFlag,
  kwdFlag,
  bhdFlag,
  omrFlag,
  audFlag,
  cadFlag,
  cnyFlag,
  usdFlag,
];

const Maincontent = (props) => {
  const [data, setData] = useState(props.data || []);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(!refresh);
  }, [props.data]);

  const fetchAPI = async () => {
    const storedData = localStorage.getItem("data");
    let parsedData = JSON.parse(storedData);
    const brcode = parsedData.BRANCHID;
    const regionid = parsedData.REGIONID;

    try {
      const url = `http://habibqatar.com.pk/TestService/${brcode}/${regionid}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      if (result.length) {
        setData(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let IntervalForApi = setInterval(() => {
      fetchAPI();
    }, 15000);
    return () => clearInterval(() => IntervalForApi);
  }, []);

  return (
    <>
      {!data.length ? (
        <Skeleton />
      ) : (
        <div className="flex overflow-hidden flex-col h-full w-full">
          <div className="bg-animation font-dm tracking-wide grid grid-cols-3  gap-1 p-1 w-full h-full">
            {data.map((ele, i) => (
              <Fragment key={i}>
                <div className="flex font-poppins odd:bg-white  even:bg-theme1-100 items-center w-full h-full justify-around border border-slate-300	 font-bold rounded-sm">
                  <div className="grid px-2 w-full grid-cols-2 ">
                    <div className="flex items-center p-1 py-4 justify-center ">
                      <img
                        src={arr[i]}
                        width={60}
                        className="object-cover h-12 shadow-xl"
                      />
                    </div>
                    <div className="text-3xl flex flex-col items-center justify-center">
                      <span className=" py-2 text-3xl tracking-widest ">
                        {ele.currencyCode}
                      </span>
                      <span className="pb-2 text-center text-sm">
                        {ele.country}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex font-dm even:bg-white  odd:bg-theme1-100 text-5xl tracking-wide items-center w-full h-full justify-end pr-2 border border-slate-300 font-bold rounded-sm">
                  {ele.currencyCode != "TT/DD"
                    ? Number(ele.buyingRate.toFixed(2))
                    : "--"}
                </div>
                <div className="flex font-dm odd:bg-white  even:bg-theme1-100 text-5xl tracking-wide items-center w-full h-full justify-end pr-2 border border-slate-300 font-bold rounded-sm">
                  {Number(ele.sellingRate.toFixed(2)) || "--"}
                </div>
              </Fragment>
            ))}
            <>
              <div className="flex font-poppins odd:bg-white  even:bg-theme1-100 items-center w-full h-full justify-around border border-slate-300	 font-bold rounded-sm">
                <div className="grid px-2 w-full grid-cols-2 ">
                  <div className="flex items-center p-1 py-4 justify-center ">
                    <img
                      src={arr[arr.length - 1]}
                      width={60}
                      className="object-cover h-12 shadow-xl"
                    />
                  </div>
                  <div className="text-3xl flex flex-col items-center justify-center">
                    <span className=" py-2 text-3xl tracking-widest ">
                      TT/DD
                    </span>
                    <span className="pb-2 text-center text-sm">
                      United States Dollar
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex font-dm even:bg-white  odd:bg-theme1-100 text-5xl tracking-wide items-center w-full h-full justify-end pr-2 border border-slate-300 font-bold rounded-sm">
                --
              </div>
              <div className="flex font-dm odd:bg-white  even:bg-theme1-100 text-5xl tracking-wide items-center w-full h-full justify-end pr-2 border border-slate-300 font-bold rounded-sm">
                {data[0].ddttusdrate}
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default Maincontent;

// ScrollProperties overflow-y-scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-[#4D7B61] scrollbar-thumb-rounded
