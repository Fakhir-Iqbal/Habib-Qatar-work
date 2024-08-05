// App.js
import "./App.css";
import "./components/ads.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Body from "./components/maincontent";
import Ads from "./components/ads";
import React, { useEffect, useRef, forwardRef, useState } from "react";
import westernLogo from "./img/westernlogo.png";
import moneyGramLogo from "./img/moneygramlogo.jpg";
import riaLogo from "./img/rialogo.png";
import HQLogo from "./img/logo.png";
import ramadan from "./img/ramadan.png";
import March23 from "./img/23March.jpeg";

const ads = [
  {
    id: 1,
    image: westernLogo,
    heading: "Wester Union",
    description:
      "We help aspiring people and businesses around the world save, spend, and transfer money— empowering more prosperous financial futures for their family, friends, and communities across borders.",
  },
  {
    id: 2,
    image: moneyGramLogo,
    heading: "Money Gram",
    description: `MoneyGram provides money transfer and other financial services around the globe with both digital platforms and retail locations. Consumers can send money internationally to friends and family, pay bills and more with affordable fees and great exchange rates.   MoneyGram is trusted by 150+ million consumers who can choose how they send money - online, in our highly-rated mobile app or at one of 430,000+ locations.
      MoneyGram has been serving consumers around the globe for more than 80 years. We started as Travelers Express but transformed our name and services across the decades to always meet our consumers' needs.`,
  },
  {
    id: 3,
    image: riaLogo,
    heading: "Ria Money Transfer",
    description: `
      The first Ria store opens in New York City with one goal: to help people send money to their loved ones back home.
      Ria expands to Spain, France, Italy, UK, Germany, Australia, Belgium, and Switzerland.
      Ria is acquired by Euronet Worldwide, a leader in processing secure, electronic financial transactions
      Ria expands to India and Senegal.
      We're online! Ria announces RiaMoneyTransfer.com.
      Walmart partners with Ria to create Walmart-2-Walmart domestic money transfer service. Euronet acquires HiFX, a UK-based foreign exchange broker and payments provider.
      `,
  },
  {
    id: 4,
    image: ramadan,
    heading: null,
    description: null,
  },
];

function App() {
  const [isLeft, setIsLeft] = useState(null);
  const [visibleObjectIndex, setVisibleObjectIndex] = useState(null);
  const [isLogin, setIsLogin] = useState(null);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchAPIChecking();
  // }, []);

  // const fetchAPIChecking = async () => {
  //   try {
  //     const res = await fetch(
  //       "http://habibqatar.com.pk/forexlator/frmBranchscreenDesktop.aspx?branchId=14&priceregionId=1"
  //     );
  //     const data = await res.json();
  //     console.log(data, "API CHECKING");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const regionalCode = urlParams.get("regionalcode");
    const branchCode = urlParams.get("brcode");
    fetchAPI(regionalCode, branchCode);
  }, []);

  // this query in params will be required for fetching data if missing may be it thrown an error because isn't any documentation of a single api related this project
  // http://example.com/?brcode=1&regionalcode=13

  const fetchAPI = async (regionalCode, branchCode) => {
    try {
      //   const res = await fetch(
      //     `http://nizamuddintai-001-site41.ctempurl.com/forexrates/currencyrates?brcode=${
      //       branchCode || myParam
      //     }`
      //   );
      //   const data = await res.json();
      //   if (data) {
      //     setData(data);
      //     setIsLogin(true);
      //   } else {
      //     setIsLogin(false);
      //   }
      // } catch (err) {
      //   console.log(err);
      //   setIsLogin(false);
      // }
      const url = `http://habibqatar.com.pk/TestService/${regionalCode}/${branchCode}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      if (result) {
        setData(result);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let currentIndex = 0;
    console.log(data);
    if (data) {
      const showNextObject = () => {
        // Show the next object
        setVisibleObjectIndex(currentIndex);
        currentIndex = (currentIndex + 1) % ads.length;
        adRef.current.attributes.class.value = "block animation";
        // Hide the component after 5 seconds
        const hideTimeout = setTimeout(() => {
          adRef.current.attributes.class.value = "animation-out";
          setTimeout(() => {
            adRef.current.attributes.class.value = "hidden";
          }, 1000);
        }, 10000);

        // Show the next object after 10 seconds
        const showNextTimeout = setTimeout(showNextObject, 30000);

        // Clean up timeouts to avoid memory leaks
        return () => {
          clearTimeout(hideTimeout);
          clearTimeout(showNextTimeout);
        };
      };

      const initialShowTimeout = setTimeout(showNextObject, 10000);

      return () => {
        clearTimeout(initialShowTimeout);
      };
    }
  }, [ads, data]);

  const adRef = useRef(null);

  const portraitStyle2 = {
    width: "100vh",
    height: "100vw",
    position: "fixed",
    top: "50%",
    left: "50%",
    margin: 0,
    transformOrigin: "center center",
    transform: isLeft
      ? "translate(-50%, -50%) rotate(-90deg)"
      : "translate(-50%, -50%) rotate(90deg)",
  };

  if (isLogin === null) {
    return (
      <div className="bg-theme1-100 overflow-hidden flex items-center justify-center h-screen w-full">
        <img src={HQLogo} className=" object-scale-down" />
      </div>
    );
  } else {
    return (
      <>
        {isLogin ? (
          <div style={portraitStyle2}>
            <div className=" overflow-hidden h-full flex flex-col ">
              <div className="z-50">
                <Ads
                  image={ads[visibleObjectIndex]?.image}
                  heading={ads[visibleObjectIndex]?.heading}
                  description={ads[visibleObjectIndex]?.description}
                  ref={adRef}
                />
              </div>
              <div className="flex w-full h-10p overflow-hidden ">
                {data && (
                  <Header
                    onClick={() => {
                      let url = window.location.origin;
                      window.location.replace(url);
                      setIsLogin(false);
                    }}
                    branchName={data.branchname}
                    phoneNumber={data.phonenumber}
                  />
                )}
              </div>
              <div className="flex flex-col relative overflow-x-hidden h-83p">
                <div className="grid border h-5p text-[#f4f4f4] text-xl font-bold text-black grid-cols-3 gap-1 rounded-sm col-span-3">
                  <div className="flex p-2 bg-theme1-200 items-center w-full h-full justify-center">
                    Currency
                  </div>
                  <div className="flex p-2 bg-theme1-200 items-center w-full h-full justify-center">
                    We Buy
                  </div>
                  <div className="flex p-2 bg-theme1-200 items-center w-full h-full justify-center">
                    We Sell
                  </div>
                </div>
                <div className="h-95p">{data && <Body data={data} />}</div>
              </div>
              <div className="flex items-center justify-center w-full h-7p">
                {data && (
                  <Footer
                    phoneNumber={data.phonenumber}
                    onClick={() => setIsLeft(!isLeft)}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-theme1-100  overflow-hidden flex flex-col items-center justify-center h-screen w-full">
            <img src={HQLogo} className=" object-scale-down " />
            <h2 className="text-[#6F183D] mt-5 font-bold text-xl">
              User Not Found, Login To Continue
            </h2>
            <a
              href="https://lineup.pk/"
              className="text-blueSecondary underline mt-2"
            >
              https://lineup.pk/
            </a>
          </div>
        )}
      </>
    );
  }
}

export default App;
