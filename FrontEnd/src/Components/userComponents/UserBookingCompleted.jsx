import React from 'react'
import { Link, useParams } from 'react-router-dom'


export default function UserBookingCompleted() {

  const {bookingId} = useParams()

  console.log(bookingId)
   return (
    <div className="w-full flex items-center justify-center py-8">
    <div className="w-9/12 mx-auto text-center">
      <h1 className="text-xl font-bold py-3">Booking Completed</h1>
      <p className="text-xl font-semibold py-1">Booking Id: {bookingId}</p>
      <p className="text-xl font-semibold py-1">Advance payment 5000rs done</p>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Antu_task-complete.svg/1200px-Antu_task-complete.svg.png"
        className="h-48 w-48 mx-auto"
        alt=""
      />
      <p className="py-2 font-medium">
        Thank you for using our website. Please take a moment to relax; one of our advisors will call you at the provided number within the next 12 hours.
      </p>
      <p className="py-2 font-medium">Is there any issue? You may either email it to us or call our toll-free number</p>
      <div className='py-1'>
        <Link type="button" to='/' className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Continue to HomePage
        </Link>
      </div>
    </div>
  </div>
  )
}
