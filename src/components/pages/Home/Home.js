import { motion, useInView } from "framer-motion";
import Lottie from "lottie-react";
import homeLottie from "../../../assests/home.json";
import contact2 from "../../../assests/contact.json";
import './Home.css';
import React, { useRef } from "react";
const Home = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true
    });
    const heroHeadingStyling = {
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
    }
    return <motion.div
        id="hero-section">
        <h3 ref={ref} style={heroHeadingStyling}>WELCOME TO TRIP TOGETHER,</h3>
        <h1 ref={ref} style={heroHeadingStyling}>FIND A TRAVEL PARTNER</h1>
        <p ref={ref} style={heroHeadingStyling}>Unlock a world of instant connections and cost-saving adventures with Trip Together. Seamlessly match urgent travel needs, share expenses, and turn fleeting moments into unforgettable journeys.</p>
        <a ref={ref} style={heroHeadingStyling} href="#about-section" ><button>EXPLORE</button></a>
        <a id="lottie-contact-us" href="#contact-section"><Lottie animationData={contact2} loop={true} /></a>
        <div id="lottie-home">
            <Lottie style={{
                transform: isInView ? 'none' : 'translateX(100px)',
                opacity: isInView ? 1 : 0,
                transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
            }} animationData={homeLottie} loop={true} />
        </div>
    </motion.div >
}
export default Home;