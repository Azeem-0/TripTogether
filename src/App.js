import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lottie from "lottie-react";
import preLoader from "./assests/preLoader.json";
import Landing from "./components/pages/Landing";
import SearchTrips from "./components/pages/SearchTrips/SearchTrips";
import PostTrips from "./components/pages/PostTrips/PostTrips";
import Navigation from "./components/Navigation/Navigation";
import Authentication from "./components/Authentication/Authentication";
import ContextApi from "./components/ContextApi/NotificationApi";

import './css/global.css';
import "./css/MediaQueries.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoader(false);
    }, 1000)
  }, []);

  return <div id="app">
    <ContextApi>
      {/* {window.innerWidth > 1020 && <CustomCursor />} */}
      {loader ? <Lottie className="loader-lottie" animationData={preLoader} loop={true} /> :
        <React.Fragment>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path='/' exact Component={Landing} />
              <Route path="/auth" exact Component={Authentication} />
              <Route path="/searchTrips" exact Component={SearchTrips} />
              <Route path="/postTrips" exact Component={PostTrips} />
            </Routes>
          </BrowserRouter>
        </React.Fragment>
      }
    </ContextApi>
  </div>
}
export default App;