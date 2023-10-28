import React from "react";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
const SocialIcons = () => {
    return <ul>
        <li><a href="https://www.instagram.com/azeem.shaik.16906/" target="/blank"><FaInstagramSquare /></a></li>
        <li><a href="https://www.linkedin.com/in/azeem-shaik-09b325243/" target="/blank"><FaLinkedin /></a></li>
        <li><a href="https://www.facebook.com/azeem.shaik.16906/" target="/blank"><AiFillFacebook /></a></li>
        <li><a href="https://www.instagram.com/azeem.shaik.16906/" target="/blank"><AiFillTwitterSquare /></a></li>
    </ul>
}
function Footer() {
    const navigate = useNavigate();
    const goToTop = () => {
        navigate("/");
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return <div id="footer-section">
        <div id="footer-description">
            <h3 onClick={goToTop}>TRIP TOGETHER</h3>
            <div className="footer-1">
                <p>azeemshaik025@gmail.com</p>
                <div></div>
                <p>+917995772042</p>
            </div>
            <h5>© TRIP TOGETHER 2023. All rights reserved.</h5>
            <SocialIcons />
        </div>
    </div>
}
export default Footer;