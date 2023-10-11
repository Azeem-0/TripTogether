import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectOne from "./SelectOne";
import { useLocation } from "react-router-dom";
import Typewriter from "./LogoWriter";
import miniNavBar from "../../assests/mini-navigation.json";
import { RxCross1 } from "react-icons/rx";
import Lottie from "lottie-react";
import { motion, useScroll, useSpring } from "framer-motion";
import TokenValidity from "../Authentication/TokenValidity";
import "./Navigation.css";

const MiniNavigation = (props) => {
    const { showMiniNavBar, miniBar, tripPopUp, changeComponent } = props;
    const location = useLocation();
    return <motion.div className="two-navigation">
        {miniBar ? <RxCross1 className="cross" onClick={showMiniNavBar} /> : <Lottie className="lottie" animationData={miniNavBar} loop={false} onClick={showMiniNavBar} />}
        {miniBar && <motion.div
            initial={{ transform: "translateY(-28em)" }}
            animate={{ transform: "translateY(0em)" }}
            exit={{ transform: "translate(-28em)" }}
            transition={{ duration: 0.5 }}
            id="mini-navigation">
            <div>
                <a href={location.pathname === '/' ? "#hero-section" : "/"} onClick={showMiniNavBar}>Home</a>
                {tripPopUp && <a href='/searchTrips' onClick={showMiniNavBar}>Search Trip</a>}
                {tripPopUp && <a href="/postTrips" onClick={showMiniNavBar}>Post Trip</a>}
                <a href={location.pathname === '/' ? "#about-section" : "/"} onClick={showMiniNavBar}>About</a>
                <a href={location.pathname === '/' ? "#faqs-section" : "/"} onClick={showMiniNavBar}>Faq's</a>
                <button name="log" className="log-button" onClick={changeComponent}>{tripPopUp ? "Log Out" : "Log In"}</button>
            </div>
        </motion.div>}
    </motion.div>
}


const MaxiNavigation = (props) => {
    const { setShowSelectOne, showOption, tripPopUp, changeComponent } = props;
    const location = useLocation();
    return <div className="one-navigation">
        <div>
            <a href={location.pathname === '/' ? "#hero-section" : "/"} onClick={() => { setShowSelectOne(false); }} >Home</a>
            {tripPopUp ? <a href="#" onClick={showOption}>Trips</a> : null}
            <a href={location.pathname === '/' ? "#about-section" : "/"} onClick={() => { setShowSelectOne(false); }}>About</a>
            <a href={location.pathname === '/' ? "#faqs-section" : "/"} onClick={() => { setShowSelectOne(false); }}>Faq's</a>
        </div>
        <>
            <button name="log" className="log-button" onClick={changeComponent}>{tripPopUp ? "Log Out" : "Log In"}</button>
        </>
    </div>
}


function Navigation() {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress)

    const navigate = useNavigate();

    var [showSelectOne, setShowSelectOne] = useState(false);

    var [tripPopUp, setTripPopUp] = useState(false);

    const [whichNavigation, setNavigation] = useState(false);

    const [miniBar, setMiniBar] = useState(false);

    const location = useLocation();

    function changeComponent() {
        localStorage.removeItem("token");
        navigate("/auth");
    }
    const showOption = () => {
        setMiniBar(!miniBar);
        setShowSelectOne(!showSelectOne);
    }

    async function showMiniNavBar() {
        setShowSelectOne(false);
        setMiniBar(!miniBar);
    }
    useEffect(() => {
        setShowSelectOne(false);
        setMiniBar(false);
        const screenWidth = window.innerWidth;
        const navigation = document.querySelector("#navigation");
        if (screenWidth < 1000) {
            setNavigation(false);
        }
        else {
            setNavigation(true);
        }
        if (location.pathname === '/auth') {
            navigation.style.backgroundColor = 'transparent';
        }
        else {
            navigation.style.backgroundColor = 'rgb(236, 236, 236)'
        }
        TokenValidity().then((res) => {
            if (res) {
                setTripPopUp(true);
            }
            else {
                setTripPopUp(false);
                if (location.pathname !== '/' && location.pathname !== '/auth') {
                    const msg = "Oops..! Login Session Expired"
                    navigate("/auth", { state: { m2: msg } });
                }
            }
        })
    }, [location.pathname])
    return <div id="navigation">
        <h2 style={{ cursor: "pointer" }} onClick={() => { navigate("/"); }}><Typewriter text="TripTogether" delay={100} /></h2>

        {location.pathname !== '/auth' ? whichNavigation === true ?

            <MaxiNavigation setShowSelectOne={setShowSelectOne} showOption={showOption} changeComponent={changeComponent} tripPopUp={tripPopUp} />
            :
            <MiniNavigation miniBar={miniBar} showMiniNavBar={showMiniNavBar} tripPopUp={tripPopUp} changeComponent={changeComponent} />
            : null
        }
        <motion.div id="progress-bar" style={{ scaleX }} />

        {!showSelectOne ? null : <div id="select-one-section">
            <SelectOne title="Search"
                description='Looking for an adventure? Explore our wide range of existing trips and find the perfect journey to join. Connect with fellow travelers, share costs, and make memories together. Start your search now'
                route='searchTrips'
            />
            <SelectOne
                title='Post'
                description='Got an exciting trip in mind? Share your travel plans  and find likeminded companions, our platform makes it easy to connect. Share your journey with others and make your travel dreams a reality'
                route='postTrips'
            /></div>}
    </div>
}

export default Navigation;