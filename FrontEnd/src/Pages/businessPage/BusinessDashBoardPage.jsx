import React from 'react'
import BusinessDashboard from '../../Components/businessComponent/BusinessDashboard'
import { useDispatch, useSelector } from 'react-redux'
import { logoutBusinessAccount } from '../../Redux/Business/businessSlice'
import { useNavigate } from 'react-router-dom'
import BusinessFooter from '../../Components/businessComponent/BusinessFooter'

export default function BusinessDashBoardPage() {

const  dispatch = useDispatch()
const navigate = useNavigate()
const Login = useSelector((state)=>state.rootReducer.business)

  const handleLogout = () => {
    dispatch(logoutBusinessAccount())
    navigate('/business/login')
  }
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

    <div className='flex bg-gray-800'>
      <ul className='flex'>
        <li className='ml-10 text-white font-kaushan'>Wedding Bells</li>
      </ul>

      <ul className='flex ml-auto'>
        {Login.name &&
        <>
        <li className='mx-10 text-white'>Welcome {Login.name}</li>
      
        <li className='mr-10 cursor-pointer text-white' onClick={handleLogout}>
          Logout
        </li>
        </> 
     }
      </ul>
    </div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <BusinessDashboard />
    </div>

     <BusinessFooter />


    </div>
    </>
  )
}
