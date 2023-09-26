import React from 'react'
import { Navigate } from 'react-router-dom';


const UserPrivateRoute = () => {

    const isLoginned = true;

    if(isLoginned){
        return 
    }else{
        return <Navigate to='/business/login'  />
    }

}

export default UserPrivateRoute


