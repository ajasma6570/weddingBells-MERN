import React from 'react'
import { Link, Routes, Route } from "react-router-dom";
import AdminCancelBookingDetails from "../AdminComponent/AdminCancelBookingDetails"
import AdminCancelOrderView from '../AdminComponent/AdminCancelOrderView'

export default function AdminCancelBooking() {
  return (
    <>
    <Link to=""></Link>
    <br />
    <Link to="viewCancelOrderDetails"></Link>

    <Routes>
      <Route path="" element={<AdminCancelBookingDetails />} />
      <Route path="viewCancelOrderDetails/:userId" element={<AdminCancelOrderView />} />
    </Routes>
  </>
  )
}
