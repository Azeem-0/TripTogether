import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const SelectOne = ({ title, description, route }) => {
    var navigate = useNavigate();
    function changePage(event) {
        const { name } = event.target;
        navigate("/" + name);
    }
    return <motion.div
        initial={{ transform: 'scale(0)' }}
        animate={{ transform: 'scale(1)' }}
        transition={{ duration: 0.3 }}
    >
        <h1>{title} Trips</h1>
        <p>{description}</p>
        <button name={route} onClick={changePage}>{title} Now</button>
    </motion.div>
}
export default SelectOne;