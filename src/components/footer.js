import React from "react";
import nubitlogo from "../img/nubitlogo.png";

const Footer = (props) => {
  return (
    <div className="h-full font-dm flex bg-theme1-100 items-center lg:py-7 py-6 px-4 justify-center w-full">
      <div className="flex items-center">
        <span className="font-bold  lg:text-xl text-lg text-[#6F183D] tracking-widest">
          Powered By
        </span>
        <img
          onClick={() => props.onClick()}
          src={nubitlogo}
          className="h-full ml-1 cursor-pointer"
          width={120}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default Footer;
