import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthUtility from "./AuthUtility";
import { notificationContext } from "../ContextApi/NotificationApi";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import "./Authentication.css";
const Regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;

function Authentication() {
    const { notify } = useContext(notificationContext);
    var location = useLocation();
    const m = (location.state && location.state.m2) || "";
    const [changeAuth, setChangeAuth] = useState(true);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    var [authInfo, setAuthInfo] = useState({
        name: "",
        email: "",
        password: "",
        phNumber: null,
    });
    function changeInput(event) {
        if (event) {
            if (event.target) {
                const { name, value } = event.target;
                setAuthInfo((prevValue) => {
                    return { ...prevValue, [name]: value }
                })
            }
            else {
                setAuthInfo((prevValue) => {
                    return { ...prevValue, phNumber: event }
                })
            }
        }
    }
    async function makeAuthenticate(event) {
        event.preventDefault();
        var route;
        var passwordValidation = true;
        var message;
        !changeAuth ? route = "/auth/register" : route = "/auth/login";
        if (route === '/auth/register') {
            passwordValidation = Regex.test(authInfo.password);
        }
        if (!passwordValidation) {
            message = "Password must contain atleast one Special,Lowercase,Uppercase and Number";
        }
        else {
            setLoader(true);
            try {
                const response = await axios.post(process.env.REACT_APP_DATABASE_URL + route, { authInfo },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                const data = await response.data;
                if (data.status === false) {
                    message = data.message;
                }
                else if (data.user) {
                    const user = data.user;
                    localStorage.setItem("token", user);
                    navigate("/");
                }
                else {
                    setChangeAuth(!changeAuth);
                    message = "Successfully Registerd, Please Log In"
                }
            }
            catch (err) {
                console.log(err);
                notify(err.message);
            }
        }
        setLoader(false);
        notify(message);
    }
    useEffect(() => {
        if (m) {
            notify(m);
        }
    })
    return <div id="authentication-section">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} theme="dark" />
        <React.Fragment>
            <div>
                {changeAuth ? <AuthUtility
                    functionality={makeAuthenticate}
                    change={changeInput}
                    changeAuth={() => {
                        setChangeAuth(!changeAuth);
                    }}
                    type="LOGIN"
                    to="REGISTER"
                    title="SIGN IN"
                    spinner={loader}
                /> : <AuthUtility
                    functionality={makeAuthenticate}
                    change={changeInput}
                    changeAuth={() => {
                        setChangeAuth(!changeAuth);
                    }}
                    type="REGISTER"
                    to="LOGIN"
                    title="SIGN UP"
                    spinner={loader}
                />}
            </div>
        </React.Fragment>
    </div>
}

export default Authentication;