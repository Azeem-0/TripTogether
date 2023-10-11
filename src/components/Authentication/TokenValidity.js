import axios from "axios";
async function TokenValidity() {
    const token = localStorage.getItem("token");
    if (token !== 'undefined' && token !== null) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json"
        }
        const response = await axios.post(process.env.REACT_APP_DATABASE_URL + "/auth/authorize", {}, { headers });
        const data = await response.data;
        return data.status;
    }
    else {
        return false;
    }
}

export default TokenValidity;