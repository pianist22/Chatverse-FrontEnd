
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectRoute = ({children,user,redirect = "/login"}) => {
    if(!user){
        // this means user doesnt exists then redirect to login page
        return <Navigate to={redirect}/>;
    }
    return children? children: <Outlet/>;
}
