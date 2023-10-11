import React, { createContext } from 'react';
import { toast } from 'react-toastify';

export const notificationContext = createContext();
const NotificationApi = ({ children }) => {
    const notify = (props) => toast(props, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    return (
        <notificationContext.Provider value={{ notify }}>
            {children}
        </notificationContext.Provider>
    )
}

export default NotificationApi