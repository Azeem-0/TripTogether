import React, { useState, useEffect, useContext } from "react";
import Lottie from "lottie-react";
import LoadingSpinner from "../../../assests/imageSpinner.json";
import { ToastContainer } from 'react-toastify';
import { notificationContext } from "../../ContextApi/NotificationApi";
// import tripDetailsLottie from "../../../assests/tripDetails.json";
// import costLottie from "../../../assests/costLottie.json";
import stopOversLottie from "../../../assests/PostTrip1.json";
import Footer from "../Footer/Footer";
import MultiStep from 'react-multistep';
import { SearchImages } from "../../utilities/ImagesnBlurHashes";
import ImageComponent from "../../utilities/ImageComponent";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./PostTrips.css";

const InfoCard = (props) => {
    const { heading, description, infoAnime } = props;
    return <div className="post-info-cards">
        <Lottie className="info-lottie" animationData={infoAnime} loop={true} />
        <h4>{heading}</h4>
        <p>{description}</p>
    </div>
}
const StepOne = (props) => {
    const { tripInfo: { source, destination, available_seats, cost }, updateChanges } = props;
    return <form className="post-form">
        <input name='source' type="text" onChange={updateChanges} placeholder="Source" value={source} required></input>
        <input type="text" name='destination' onChange={updateChanges} placeholder="Destination" value={destination} required></input>
        <input type="number" name="available_seats" onChange={updateChanges} placeholder="Available Seats" value={available_seats} required></input>
        <input type="number" name='cost' onChange={updateChanges} placeholder='Cost per person' value={cost} required></input>
    </form>
}
const StepTwo = (props) => {
    const { tripInfo: { start_time, reach_time }, updateChanges } = props;
    const [stopOver, setStopOver] = useState("");
    const [date, setDate] = useState(new Date());
    const updateStopOvers = (e) => {
        const { value } = e.target;
        setStopOver(value);
    }
    return <form className="post-form">
        {/* <div className="time-details"> */}
        {/* <label>Trip Date</label> */}
        <DatePicker selected={date} onChange={(date) => {
            setDate(date);
            updateChanges(date);
        }} />
        {/* </div> */}
        {/* <div className="time-details"> */}
        {/* <label>Start Time</label> */}
        {/* <input name="start_time" type="time" placeholder="Start Time" required onChange={updateChanges}></input> */}
        <input name="start_time" type="text" placeholder="Start Time" required onChange={updateChanges} value={start_time} style={{ color: 'black' }}></input>
        {/* </div> */}
        {/* <div className="time-details"> */}
        {/* <label>End Time</label> */}
        {/* <input name="reach_time" type="time" placeholder="Reach Time" required onChange={updateChanges}></input> */}
        <input name="reach_time" type="text" placeholder="Reach Time" required value={reach_time} onChange={updateChanges}></input>

        {/* </div> */}
        {/* <div className="time-details"> */}
        {/* <label>Stop Overs</label> */}
        <input name="stop_overs" id="stop_overs" onChange={updateStopOvers} type="text" placeholder="Enter Stop Overs"></input>
        <button style={{ backgroundColor: '#FFC915', color: 'black' }} name={stopOver} type="button" onClick={updateChanges}>Add Stop Overs</button>
        {/* </div> */}
    </form>
}
const StepThree = (props) => {
    const { tripInfo: { vehicle_color, vehicle_type, vehicle_model, vehicle_number } } = props;
    const { updateChanges, postTripDetails, spinner } = props;
    return <form className="post-form" onSubmit={postTripDetails}>
        <input name='vehicle_type' type="text" onChange={updateChanges} placeholder="Vehicle Type" value={vehicle_type} required></input>
        <input type="text" name='vehicle_color' onChange={updateChanges} placeholder="Vehicle Color" value={vehicle_color} required></input>
        <input type="text" name="vehicle_model" onChange={updateChanges} placeholder="Vehicle Model" value={vehicle_model} required></input>
        <input type="text" name='vehicle_number' onChange={updateChanges} placeholder='Vehicle Number' value={vehicle_number} required></input>
        <button type="submit">{spinner ? <Lottie className="loading-spinner" animationData={LoadingSpinner} loop={true} /> : "Submit"}</button>
    </form >
}

const PostTrips = () => {
    const [loader, setLoader] = useState(false);
    const { notify } = useContext(notificationContext);
    const [selectOne, setSelectOne] = useState({
        src: null,
        blur: null
    });
    var [tripInfo, setTripInfo] = useState({
        source: "",
        destination: "",
        available_seats: "",
        cost: "",
        start_time: "",
        reach_time: "",
        trip_date: "",
        vehicle_type: "",
        vehicle_color: "",
        vehicle_model: "",
        vehicle_number: "",
        stop_overs: []
    });

    function setIndex() {
        const index = Math.floor((Math.random() * 8));
        setSelectOne({
            src: SearchImages[index].image,
            blur: SearchImages[index].blurHash
        });
    }

    function updateChanges(event) {
        if (event.target) {
            const { name, value, type } = event.target;
            if (type === 'button') {
                const inputElement = document.querySelector("#stop_overs");
                inputElement.value = '';
                console.log(name);
                if (name) {
                    setTripInfo((prevValue) => {
                        return { ...prevValue, stop_overs: [...prevValue.stop_overs, name] }
                    })
                    notify("Added Stop Over...");
                }
                else {
                    notify("Please enter a stop over...")
                }
            }
            else {
                setTripInfo((prevValue) => {
                    return { ...prevValue, [name]: value }
                })
            }
        }
        else {
            const d = new Date(event).toLocaleDateString();
            setTripInfo((prevValue) => {
                return { ...prevValue, trip_date: d }
            })
        }
    }

    async function postTripDetails(event) {
        event.preventDefault();
        let verification = true;
        for (const key in tripInfo) {
            if (tripInfo[key] === "" || tripInfo[key] === null || tripInfo[key] === undefined) {
                notify(`Please fill the ${key} field. `);
                verification = false;
                break;
            }
        }
        if (verification === true) {
            const formElement = document.querySelector(".post-form");
            setLoader(true);
            const token = localStorage.getItem("token");
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json"
            }
            const response = await axios.post(process.env.REACT_APP_DATABASE_URL + "/trips/startTrip", { details: tripInfo }, { headers });
            setLoader(false);
            formElement.reset();
            const data = await response.data;
            notify(data.message);
        }
    }
    useEffect(() => {
        setIndex();
    }, []);

    return <div id="post-trips-section">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} theme="dark" />
        <div id="post-trips-heading">
            {selectOne.src && selectOne.blur && <ImageComponent src={selectOne.src} blur={selectOne.blur} />}
            <h1>Shared Costs, endless memories.</h1>
            <p>"Embark on a transformative journey."</p>
            <MultiStep activeStep={0}>
                <StepOne updateChanges={updateChanges} tripInfo={tripInfo} />
                <StepTwo updateChanges={updateChanges} tripInfo={tripInfo} />
                <StepThree updateChanges={updateChanges} tripInfo={tripInfo} postTripDetails={postTripDetails} spinner={loader} />
            </MultiStep>
        </div>
        <div id="post-trips-informative">
            <InfoCard heading="Trip Details" infoAnime={stopOversLottie} description='"Provide essential information about your trip,including departure and destination locations,as well as the date and time.This helps co-travelers understand the basic outline of your journey.' />
            <InfoCard heading="Origin and Stopovers" infoAnime={stopOversLottie} description='Share the specific starting location, any planned stopovers, and the estimated duration of your trip. This helps co-travelers gauge the route and anticipate any breaks during the journey.' />
            <InfoCard heading="Travel and Costs" infoAnime={stopOversLottie} description="Specify the mode of transportation you'll be using for the trip, whether it's a car or bike.Outline the total cost of the trip and how the expenses will be divided among co-travelers." />
            <InfoCard heading="TripTogther" infoAnime={stopOversLottie} description='"Trip Together" is an innovative online platform designed to connect individuals facing urgent travel needs. By bringing together people who are looking to travel quickly and efficiently.' />
        </div>
        <Footer />
    </div>
}
export default PostTrips; 