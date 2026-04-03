import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    // Check for 'adminToken' on initial load
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (adminToken) {
            // Use 'adminToken' as the key to avoid clashing with the regular user app
            localStorage.setItem('adminToken', adminToken);
        } else {
            localStorage.removeItem('adminToken');
        }
    }, [adminToken]);

    const value = {
        adminToken,
        setAdminToken,
        backendUrl
    };

    return (
        <AdminContext.Provider value={value}>
            {/* Must be lowercase 'children' */}
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider