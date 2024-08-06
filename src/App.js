// App.js
import "./App.css";
import "./components/ads.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Body from "./components/maincontent";
import Ads from "./components/ads";
import React, { useEffect, useRef, useState } from "react";
import westernLogo from "./img/westernlogo.png";
import moneyGramLogo from "./img/moneygramlogo.jpg";
import riaLogo from "./img/rialogo.png";
import logo from "./img/logo.png";
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
];

// this function will update seach query
const setQueryParam = (key, value) => {
  // Create a new URL object from the current location
  const url = new URL(window.location.href);

  // Set the query parameter
  url.searchParams.set(key, value);

  // Update the URL without reloading the page
  window.history.pushState({}, "", url);
};

const postLogin = async (username, password) => {
  const API = "http://api.lineup.pk/";

  try {
    const response = await fetch(`${API}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Invalid Credential");
    console.error("Error:", error);
    return null;
  }
};

function App() {
  const [isLeft, setIsLeft] = useState(null);
  const [visibleObjectIndex, setVisibleObjectIndex] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    postLogin(username, password).then((data) => {
      if (data) {
        setIsLogin(true);
        setUserData(data.data);

        setQueryParam("brcode", data.data.BRANCHID);
        setQueryParam("regionid", data.data.REGIONID);
        localStorage.setItem("data", JSON.stringify(data.data));
        window.location.reload();
        setLoad(false);
      } else {
        setIsLogin(false);
        localStorage.removeItem("data");
        setLoad(false);
      }
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      setQueryParam("brcode", parsedData.BRANCHID);
      setQueryParam("regionid", parsedData.REGIONID);
      fetchAPI(parsedData.REGIONID, parsedData.BRANCHID);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  // this query in params will be required for fetching data if missing may be it thrown an error because isn't any documentation of a single api related this project
  // http://example.com/?brcode=1&regionalcode=13

  const fetchAPI = async (regionalCode, branchCode) => {
    try {
      const url = `http://habibqatar.com.pk/TestService/${branchCode}/${regionalCode}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let currentIndex = 0;
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
        const showNextTimeout = setTimeout(showNextObject, 20000);

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
  }, [data]);

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

  return (
    <>
      {isLogin ? (
        <>
          {data.length ? (
            <>
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
                          localStorage.clear();
                          window.location.reload();
                        }}
                        branchName={userData.BRANCHNAME}
                        phoneNumber={userData.PHONENUMBER}
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
            </>
          ) : (
            <section
              style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
            </section>
          )}
        </>
      ) : (
        <>
          <div style={styles.container}>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md flex flex-col justify-center"
            >
              <img src={logo} alt="icon" className="w-60 h-20 mb-8 mx-auto" />
              <div style={styles.formGroup}>
                <input
                  className="focus:outline-[#6F193D] border-2"
                  placeholder="Username"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  className="focus:outline-[#6F193D] border-2"
                  placeholder="password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#6F193D] h-12 flex gap-4 mx-auto items-center justify-center"
                style={styles.button}
              >
                {load && <div class="loader"></div>}

                <span>Login</span>
              </button>
            </form>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    backgroundColor: "#f4f4f4",
  },
  formContainer: {
    maxWidth: "500px",
    width: "100%",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },

  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
  },
};
