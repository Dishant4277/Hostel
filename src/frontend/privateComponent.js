import React from "react"; 
import {Navigate, Outlet} from "react-router-dom"

const privateComponent=()=> {
    const auth = localStorage.getItem('user')
    return auth?<Outlet/>:<Navigate to="/Home"/>;
}

export default privateComponent