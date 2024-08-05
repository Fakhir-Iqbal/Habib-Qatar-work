import { useEffect, useState } from "react";
import image from "../img/logo.png";
import moment from "moment";
import { FaPhoneAlt } from "react-icons/fa";

const Header = (props) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  useEffect(() => {
    let IntervalForClock = setInterval(clock, 1000);
    return () => clearInterval(IntervalForClock);
  }, []);
  const clock = () => {
    setDate(moment(new Date()).format("Do MMM YYYY "));
    setTime(moment(new Date()).format("HH:mm:ss"));
    setHours(moment(new Date()).format("HH"));
    setMinutes(moment(new Date()).format("mm"));
    setSeconds(moment(new Date()).format("ss"));
  };

  const phoneNumbers = (number) => {
    const sepratedNumber = number.split(",");
    return sepratedNumber.map((ele) => (
      <div className="flex items-center justify-start">
        <div>
          <FaPhoneAlt className="h-4  w-4" />
        </div>
        &nbsp;:&nbsp;<div>{ele}</div>
      </div>
    ));
  };

  return (
    <div className="flex text-[#6F183D] bg-theme1-100 border border-b border-[#e0e0e0] justify-between items-center h-full p-1 px-3  py-4 lg:py-8  w-full ">
      {/* <div className="flex flex-col items-start justify-center"> */}
      <div className="flex flex-col text-2xl items-start justify-center">
        <div className=" tracking-wide font-bold">{date}</div>
        <div className=" tracking-widest mt-1 font-bold">{time}</div>
        {/* <div className=" flex w-32 justify-start tracking-wide font-bold">
          <span className="px-1  w-6 ">{hours}</span>:
          <span className="px-1 mr-1 w-6 ">{minutes}</span>:
          <span className="px-1  w-6 ">{seconds}</span>
        </div> */}
      </div>
      <div className="flex flex-col items-center justify-center">
        <img
          src={image}
          onClick={() => props.onClick()}
          width={200}
          className="h-80p cursor-pointer"
        />
        <div className=" text-2xl text-center mt-2 tracking-wider font-semibold">
          [{props.branchName}]
        </div>
      </div>
      <div className=" mt-3 flex flex-col items-end tracking-wide text-xl font-semibold">
        {phoneNumbers(props.phoneNumber)}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Header;
// #ccdad2
