import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import AdminOrderView from "./AdminOrderView";
import AdminBookingDetails from "./AdminBookingDetails";

export default function AdmminBooking() {
  return (
    <>
      <Link to=""></Link>
      <br />
      <Link to="viewOrderDetails"></Link>

      <Routes>
        <Route path="" element={<AdminBookingDetails />} />
        <Route path="viewOrderDetails/:userId" element={<AdminOrderView />} />
      </Routes>
    </>
  );
}
