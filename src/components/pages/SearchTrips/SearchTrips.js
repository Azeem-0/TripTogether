import React, { useState, useEffect, useContext } from "react";
import Lottie from "lottie-react";
import LoadingSpinner from "../../../assests/imageSpinner.json";
import preLoader from "../../../assests/preLoader.json";
import ReactPaginate from "react-paginate";
import Trips from "./Trips";
import ImageComponent from "../../utilities/ImageComponent";
import { SearchImages } from "../../utilities/ImagesnBlurHashes";
import Footer from "../Footer/Footer";
import axios from "axios";
import "./SearchTrips.css";
import { notificationContext } from "../../ContextApi/NotificationApi";
import { ToastContainer } from "react-toastify";
const SearchTrips = () => {
    const { notify } = useContext(notificationContext);
    const [loader, setLoader] = useState(true);
    const [spinner, setSpinner] = useState(false);
    const [selectOne, setSelectOne] = useState({
        src: null,
        blur: null,
    });
    var [trips, setTrips] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState();
    const screenWidth = window.innerWidth;
    const tripsPerPage = screenWidth < 1000 ? 1 : 4;
    const pagesVisited = pageNumber * tripsPerPage;
    const displayTrips = trips ? trips.slice(pagesVisited, pagesVisited + tripsPerPage).map((ele, ind) => {
        return <Trips tripInfo={ele} imageIndex={ind} key={ind} />
    }) : null;
    var [search, setSearch] = useState({
        source: "",
        destination: "",
        seats: null,
        type: ""
    });
    function setIndex() {
        const index = Math.floor((Math.random() * 8));
        setSelectOne({
            src: SearchImages[index].image,
            blur: SearchImages[index].blurHash
        });
    }
    async function populate() {
        setLoader(true);
        const response = await axios.get(process.env.REACT_APP_DATABASE_URL + "/trips/findTrip",
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        setLoader(false);
        const data = response.data;
        if (data.status === true) {
            setTrips(data.tripDetails);
            if (data.tripDetails) {
                setPageCount(Math.ceil(data.tripDetails.length / tripsPerPage));
            }
        }
        else {
            notify(data.message);
        }
        return data.tripDetails;
    }
    function updateChanges(event) {
        const { name, value } = event.target;
        setSearch((prevValue) => {
            return { ...prevValue, [name]: value }
        })
    }
    async function searchTrips(event) {
        event.preventDefault();
        setSpinner(true);
        const response = await axios.post(process.env.REACT_APP_DATABASE_URL + "/trips/findTripBySD", { search },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const data = await response.data;
        if (data.status === true) {
            setTrips(data.trips);
            if (data.trips) {
                setPageCount(Math.ceil(data.trips.length / tripsPerPage));
            }
            const targetTrips = document.querySelector("#trips-section");
            if (targetTrips) {
                targetTrips.scrollIntoView({ behavior: 'smooth' });
            }
        }
        else {
            notify(data.message);
        }
        setSpinner(false);
    }
    useEffect(() => {
        setIndex();
        populate();
    }, []);
    return <div id="search-trips-section">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} theme="dark" />
        {loader ? <Lottie className="loader-lottie" animationData={preLoader} loop={true} /> :
            <>
                <div id="search-heading">
                    {selectOne.src && selectOne.blur && <ImageComponent src={selectOne.src} blur={selectOne.blur} />}
                    <h1>Find Delightful Journeys</h1>
                    <p>"Journey Together, Create Memories Forever"</p>
                    <form onSubmit={searchTrips}>
                        <input name="source" onChange={updateChanges} placeholder="Enter Source" required></input>
                        <input name="destination" onChange={updateChanges} placeholder="Enter Destination" required></input>
                        <input name="seats" onChange={updateChanges} placeholder="Enter No of Seats" required></input>
                        <input name="type" onChange={updateChanges} placeholder="Enter Vehicle Type" required></input>
                        <button name="find" type="submit">{spinner ? <Lottie className="loading-spinner" animationData={LoadingSpinner} loop={true} /> : "Search"}</button>
                    </form>
                </div>
                <div id="trips-section">
                    {trips && trips.length !== 0 ? displayTrips : <p>No trips available at the moment, but stay tuned for the future's magnificent destinations</p>}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    previousLabel='<'
                    nextLabel='>'
                    pageCount={pageCount}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    onPageChange={({ selected }) => {
                        setPageNumber(selected)
                    }}
                    previousClassName="previousButton"
                    nextClassName="nextButton"
                    containerClassName="containerButtons" />
                <Footer />
            </>
        }
    </div>
}
export default SearchTrips;