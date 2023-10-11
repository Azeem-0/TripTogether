import React from "react";
import Home from "./Home/Home";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";
import Faqs from "./Faqs/Faqs";

function Landing() {
    return <div id="landing-section">
        <Home />
        <About />
        <Faqs />
        <Contact />
        <Footer />
    </div>
}

export default Landing;