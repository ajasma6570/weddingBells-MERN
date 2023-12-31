import React from 'react'
import UseNavbar from '../../Components/userComponents/UseNavbar'
import Footer from '../../Components/userComponents/Footer'
import UserBookingCompleted from '../../Components/userComponents/UserBookingCompleted'

export default function UserBookingCompletedPage() {
  return (
    <div>
        <UseNavbar/>
        <UserBookingCompleted/>
        <Footer/>
    </div>
  )
}
