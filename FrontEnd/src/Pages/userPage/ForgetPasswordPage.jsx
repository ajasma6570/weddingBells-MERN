import React from 'react'
import ForgetPassword from '../../Components/userComponents/ForgetPassword'
import UseNavbar from '../../Components/userComponents/UseNavbar'
import Footer from '../../Components/userComponents/Footer'

export default function ForgetPasswordPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <UseNavbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ForgetPassword />
        </div>

        <Footer />
    </div>
  )
}
