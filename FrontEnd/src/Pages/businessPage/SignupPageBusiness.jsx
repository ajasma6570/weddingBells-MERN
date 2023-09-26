import React from 'react'
import BusinessSignUp from '../../Components/businessComponent/BusinessSignUp'
import BusinessFooter from '../../Components/businessComponent/BusinessFooter'

export default function SignupPageBusiness() {
  return (
    <>
       <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

    <h1 className='text-3xl font-sans bg-gray-800 text-center text-white  '>Business Account</h1>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <BusinessSignUp />
    </div>
    <BusinessFooter />
    </div>
    </>
    
  )
}
