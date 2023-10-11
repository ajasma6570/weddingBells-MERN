import React, { useEffect, useState } from 'react'
import { useUserProfileAuthMutation } from '../Redux/user/userApiSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toastError } from '../Components/toast'
import {  logoutUser } from '../Redux/user/userSlice'
import SideBar from '../Pages/userPage/SideBar'

export default function UserRoleAuth() {

    const [role,setRole] = useState("")
    const [userProfileAuth] = useUserProfileAuthMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    useEffect(()=>{

        const fetchData = async() => {
            const res= await userProfileAuth()
            const getRole = res.data.role
            if(res.data.status === 200 && getRole === "user"){
                setRole(getRole)
            }else{
                toastError(res.data.message)
                dispatch(logoutUser())
                navigate('/user/login')
            }
        }
        fetchData()
    },[userProfileAuth,navigate,dispatch])

    return (
    <>
      {role === "user" && 
        <SideBar/>
      }  
    </>
  )
}
