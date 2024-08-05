import React from "react";
import nubitlogo from "../img/nubitlogo.png";
import { FaRotate } from "react-icons/fa6";

// const data = [
//   {
//     id: 1,
//     value:
//       "| Lorem Ipsum is simply dummy text of the printing and typesetting industry. |",
//   },
//   {
//     id: 2,
//     value: "| Lorem Ipsum is simply dummy . | ",
//   },
//   {
//     id: 3,
//     value: "| Lorem Ipsum is simply dummy text of the . | ",
//   },
//   // more data ...
// ];

const Footer = (props) => {
  return (
    <div className="h-full font-dm flex bg-theme1-100 items-center lg:py-7 py-6 px-4 justify-center w-full">
      {/* <span></span> */}
      <div className="flex items-center">
        <span className="font-bold  lg:text-xl text-lg text-[#6F183D] tracking-widest">
          Powered By
        </span>
        <img
          onClick={() => props.onClick()}
          src={nubitlogo}
          className="h-full ml-1 cursor-pointer"
          width={120}
        />
      </div>
      {/* <div className="text-[#6F183D] ml-3 tracking-wide text-lg font-semibold">
        {`(${props.phoneNumber})`}
      </div> */}
      {/* <div className="flex pr-4">
        <span
          onClick={() => props.onClick()}
          className="p-3 border-gray-500 shadow-sm cursor-pointer  border rounded-full bg-[#6F183D]"
        >
          <FaRotate className="text-theme1-100" />
        </span>
      </div> */}
    </div>
  );
};

export default Footer;
