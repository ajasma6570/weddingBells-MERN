import React from 'react'
import BusinessLogin from '../../Components/businessComponent/BusinessLogin'
import BusinessFooter from '../../Components/businessComponent/BusinessFooter'

export default function BusinessLoginPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
    {/* Navbar at the top */}
    <h1 className='text-3xl text-white font-sans dark:bg-gray-800 text-center '>Business Account</h1>

    {/* Content */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <BusinessLogin />
      </div>
  

    {/* Footer at the bottom */}
   <BusinessFooter />
  </div>

  )
}
