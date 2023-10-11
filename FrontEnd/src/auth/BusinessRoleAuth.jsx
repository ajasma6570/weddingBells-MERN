import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutBusinessAccount } from '../Redux/Business/businessSlice'
import BusinessDashBoardPage from '../Pages/businessPage/BusinessDashBoardPage'
import { toastError } from '../Components/toast'
import { useBusinessProfileAuthMutation } from '../Redux/Business/businessApiSlice'

export default function BusinessRoleAuth() {
    const [role,setRole] = useState("")
    const [BusinessProfileAuth] = useBusinessProfileAuthMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    useEffect(()=>{

        const fetchData = async() => {
            const res= await BusinessProfileAuth()
            const getRole = res.data.role
            if(res.data.status === 200 && getRole === "business"){
                setRole(getRole)
            }else{
                toastError(res.data.message)
                dispatch(logoutBusinessAccount())
                navigate('/business/login')
            }
        }
        fetchData()
    },[BusinessProfileAuth,navigate,dispatch])

    return (
    <>
      {role === "business" && 
        <BusinessDashBoardPage/>
      }  
    </>
  )
}