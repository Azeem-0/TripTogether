import { useRef } from "react";
import faqs from "./FaqsData";
import "./Faqs.css";
import { motion, useInView } from "framer-motion";
const FaqsList = (props) => {
    const { question, ind, openFaq, reply } = props;
    return <div className="faqs-both">
        <div className="question">
            <p>{question}</p>
            <button name={ind} onClick={openFaq}>+</button>
        </div>
        <div
            id={ind} className="reply">
            <p>{reply}</p>
        </div>
    </div>
}

const Faqs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true
    })
    async function openFaq(e) {
        const { name } = e.target;
        const button = e.target;
        var wholeElement = document.querySelectorAll(".reply");
        const allButtons = document.querySelectorAll(".question button");
        allButtons.forEach((ele) => {
            ele.innerHTML = '+';
        })
        wholeElement.forEach((ele) => {
            if (ele.id !== name) {
                ele.classList.remove("show-faqs-both");
            }
            else {
                if (ele.classList.contains('show-faqs-both')) {
                    button.innerHTML = '+';
                }
                else {
                    button.innerHTML = '-';
                }
                ele.classList.toggle("show-faqs-both");
            }
        });
    }
    return <motion.div
        ref={ref}
        style={{
            transform: isInView ? 'none' : 'traslateY(-25px)',
            scale: isInView ? 1 : 0.9,
            opacity: isInView ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
        }}
        id="faqs-section">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <h1 className="section-headings">FAQ'S</h1>
            <p>These answers might help. </p>
        </div>
        <div className="queries-section">
            {faqs && faqs.map((ele, ind) => {
                return <FaqsList key={ind} ind={ind} question={ele.question} openFaq={openFaq} reply={ele.reply} />
            })}
        </div>
    </motion.div>
}
export default Faqs;