import { useContext, useRef, useState } from "react";
import Lottie from "lottie-react";
import { ToastContainer } from 'react-toastify';
import LoadingSpinner from "../../../assests/imageSpinner.json";
import contact_section from "../../../assests/contact-section.json";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import "./Contact.css";
import { notificationContext } from "../../ContextApi/NotificationApi";
const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true
    })
    const { notify } = useContext(notificationContext);
    const [loader, setLoader] = useState(false);
    const [feedback, setFeedBack] = useState({
        name: "",
        email: "",
        message: "",
        showForm: true
    })
    async function changeFeedBack(e) {
        const { name, value } = e.target;
        setFeedBack((prev) => {
            return { ...prev, [name]: value }
        })
    }
    async function sendFeedBack(e) {
        const formElement = document.querySelector("#contact-form");
        e.preventDefault();
        setLoader(true);
        const response = await axios.post(process.env.REACT_APP_DATABASE_URL + "/postFeedBack", {
            feedback
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        const data = await response.data;
        notify(data.message);
        setLoader(false);
        formElement.reset();
    }
    return <motion.div
        ref={ref}
        style={{
            transform: isInView ? 'none' : 'traslateY(-25px)',
            scale: isInView ? 1 : 0.9,
            opacity: isInView ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
        }}
        id="contact-section" >
        <div style={{ gap: '0.5rem' }}>
            <h1 className="section-headings">CONTACT US</h1>
            <p>Feel free to Contact us by submitting the form below and we will get back to you as soon as possible </p>
        </div>
        <div id="contact-child1">
            <Lottie animationData={contact_section} loop={true} />
            <form id="contact-form" onSubmit={sendFeedBack}>
                <input name="name" placeholder="Enter your name" onChange={changeFeedBack} required></input>
                <input name="email" placeholder="Enter your email" onChange={changeFeedBack} required></input>
                <input name="message" placeholder="Enter your message" onChange={changeFeedBack} required></input>
                <button type="submit">{loader ? <Lottie className="loading-spinner" animationData={LoadingSpinner} loop={true} /> : "Submit"}</button>
            </form>
        </div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} theme="dark" />
    </motion.div>
}
export default Contact;