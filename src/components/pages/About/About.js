import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageComponent from "../../utilities/ImageComponent";
import { AboutImages } from "../../utilities/ImagesnBlurHashes";
import TokenValidity from "../../Authentication/TokenValidity";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import "./About.css";
const AboutChild = (props) => {
    const { second, image, blurHash, heading, description, button } = props;
    const ref = useRef(null);
    const navigate = useNavigate();
    const isInView = useInView(ref, {
        once: true
    })
    return <div className="about-child">
        <div className="about-description">
            <h2>{heading}</h2>
            <p>{description}</p>
            {second && button && <button onClick={() => {
                navigate("/auth");
            }}>Let's Go</button>}
        </div>
        <motion.div
            ref={ref}
            style={{
                transform: isInView ? "none" : second ? "translateX(-250px)" : 'translateX(250px)',
                opacity: isInView ? 1 : 0,
                transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"
            }}
            className="about-image" >
            <ImageComponent src={image} blur={blurHash} />
        </motion.div>
    </div>
}

const AboutWave1 = () => {
    return <div className="custom-shape-divider-top-1692278916">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
    </div>
}

const AboutWave2 = () => {
    return <div className="custom-shape-divider-bottom-1692278876">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
    </div>
}

const About = () => {
    const [isActive, setIsActive] = useState(false);
    const [letsgo, showLetsgo] = useState(true);
    const [wave, setWave] = useState(true);
    function handleScroll() {
        const revealSection = document.querySelector('#about-section');
        if (revealSection) {
            const rect = revealSection.getBoundingClientRect();
            if (rect.y <= 600) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        TokenValidity().then((res) => {
            if (res) {
                showLetsgo(false);
            }
            else {
                showLetsgo(true);
            }
        })
        if (window.innerWidth < 1000) {
            setWave(false);
        }
        else {
            setWave(true);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return <div className={isActive ? 'active' : 'reveal-section'} id="about-section">
        {wave && <AboutWave1 />}
        <AboutChild
            image={AboutImages[0].image}
            blurHash={AboutImages[0].blurHash}
            heading="WHAT IS TRIP TOGETHER..?"
            description='"Trip Together" is an innovative online platform designed to connect individuals facing urgent travel needs. By bringing together people who are looking to travel quickly and efficiently, the platform aims to reduce travel costs through shared expenses and provide a solution for those seeking affordable and accessible transportation options, even in time-sensitive situations. Through the user-friendly website, users can either search for existing trips or host their own, fostering valuable connections and making travel more convenient and enjoyable.'
        />
        <AboutChild
            image={AboutImages[1].image}
            blurHash={AboutImages[1].blurHash}
            heading="HOW TO GET STARTED..?"
            description="To begin your journey with Trip Together, start by visiting our website and either signing up for an account or logging in if you're already a member. Once you're in, From there you can either browse existing trips or create your own trip listing if you have a travel plan in mind. Once you've found a suitable companion and finalized your plans, confirm the details and make any necessary preparations before your trip. As you embark on your shared adventure, stay in touch with your travel partner, communicate throughout the journey, and make the most of your travel experience together"
            button={letsgo}
            second={true}
        />
        {wave && <AboutWave2 />}
    </div >
}
export default About;