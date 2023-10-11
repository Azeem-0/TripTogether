import React, { useEffect, useRef, useState } from "react";
import { FaLongArrowAltRight } from 'react-icons/fa';
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";
import { TripImages } from "../../utilities/ImagesnBlurHashes";
import ImageComponent from "../../utilities/ImageComponent";

const PopUp = (props) => {
    const { name, email, phNumber, cost, availableSeats, source, destination } = props.tripInfo;
    const { stopOvers, timeDetails } = props.tripInfo;
    const [sm, setSm] = useState(true);
    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1000) {
            setSm(false);
        }
    }, [])
    return <div className="pop-up-section">
        {sm && <ImageComponent src={TripImages[2].image} blur={TripImages[2].blurHash} />}
        <div className="trip-pop-up">
            <div className="single-trip-heading">
                <span>
                    <h5>{source}</h5>
                    <h6>{timeDetails?.start}</h6>
                </span>
                <FaLongArrowAltRight />
                <span>
                    <h5>{destination}</h5>
                    <h6>{timeDetails?.end}</h6>
                </span>
            </div>
            <h5 className="date" style={{ margin: 'auto' }}>{timeDetails?.tripDate}</h5>
            <h5>Stop Overs : </h5>
            <div className="trip-stop-overs">
                {stopOvers.map((ele, ind) => {
                    return <p key={ind}>{ele}{!(ind === (stopOvers.length - 1)) && ','}</p>
                })}
            </div>
            <div style={{ display: 'flex', alignItems: "center", gap: '5px' }}>
                <h5>Available Seats : </h5>
                <p>{availableSeats}</p>
            </div>
            <div style={{ display: 'flex', alignItems: "center", gap: '5px' }}>
                <h5>Cost : </h5>
                <p>{cost}</p>
            </div>
            <h5>Contact : </h5>
            <div className="host-information">
                <p>{name}</p>
                <p>{phNumber}</p>
                <p>{email}</p>
            </div>
        </div>
    </div>
}
const Trips = (props) => {
    const { tripInfo } = props;
    const [showing, setShowing] = useState(false);
    const tripRef = useRef(null);
    async function increaseScale() {
        const element = document.querySelectorAll(".single-trip-section");
        element.forEach((ele) => {
            if (ele.classList.contains("single-trip-card")) {
                ele.classList.remove("single-trip-card");
            }
        });
        setShowing(true);
        tripRef.current.classList.add('single-trip-card');
    }
    return <motion.div ref={tripRef} className="single-trip-section">
        {showing ? <RxCross1 className="cross" onClick={() => { setShowing(false); tripRef.current.classList.remove('single-trip-card'); }} /> : null}
        {!showing ?
            <React.Fragment>
                {true && <ImageComponent src={TripImages[2].image} blur={TripImages[2].blurHash} />}
                <div className="single-trip-body">
                    <div className="single-trip-heading">
                        <span>
                            <h5>{tripInfo.source.substring(0, 10)}{(tripInfo.source.length > 10) && "..."}</h5>
                            <h6>{tripInfo?.timeDetails?.start}</h6>
                        </span>
                        <FaLongArrowAltRight />
                        <span>
                            <h5>{tripInfo.destination.substring(0, 10)}{(tripInfo.source.length > 10) && "..."}</h5>
                            <h6>{tripInfo?.timeDetails?.end}</h6>
                        </span>
                    </div>
                    <h5 className="date">{tripInfo?.timeDetails?.tripDate}</h5>
                    <button onClick={increaseScale}>Get details</button>
                </div>
            </React.Fragment> :
            <PopUp tripInfo={tripInfo} />
        }
    </motion.div >
}
export default Trips;