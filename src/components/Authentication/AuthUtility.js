import Lottie from "lottie-react";
import LoadingSpinner from "../../assests/imageSpinner.json";
import logLottie from "../../assests/Authentication.json";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import React, { useState } from "react";
function AuthUtility(props) {
    const { title, type, change, changeAuth, to, functionality, spinner } = props;
    const [animation, setAnimation] = useState(false);
    useState(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1000) {
            setAnimation(false);
        }
        else {
            setAnimation(true);
        }
    })
    return <div className="authentication-utility">
        {animation && <Lottie className="auth-lottie" animationData={logLottie} loop={true} />}
        <div className="authentication-form">
            <h1>{title}</h1>
            <form name={type} onSubmit={functionality}>
                {type === "REGISTER" && <input name="name" type="text" placeholder="Enter Your Name" onChange={change} required></input>}
                <input name="email" type="email" placeholder="Enter Your Email" onChange={change} required></input>
                <input name='password' type="password" placeholder="Enter Your Password" onChange={change} required></input>
                {type === "REGISTER" && <PhoneInput className="PhoneInput" defaultCountry="IN" placeholder="Enter Mobile Number" onChange={change} />}
                {/* <button type="submit" name="auth">{type}</button> */}
                <button name="auth" type="submit">{spinner ? <Lottie className="loading-spinner" animationData={LoadingSpinner} loop={true} /> : type}</button>
            </form>
            <div className="change-authentication">{type === "LOGIN" ? "New Here ? " : "Already Registered ?  "} <button onClick={changeAuth}>{to}</button>
            </div>
        </div>
    </div>
}

export default AuthUtility;