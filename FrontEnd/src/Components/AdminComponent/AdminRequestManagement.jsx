import React from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import AdminVenueRequest from "./AdminVenueRequest";
import AdminVehicleRequests from "./AdminVehicleRequests";
import AdminCarteringRequests from "./AdminCarteringRequests";

export default function AdminRequestManagement() {
  const location = useLocation();

  const pathSegments = location.pathname.split("/"); // Split the pathname by '/'
  const lastSegment = pathSegments[pathSegments.length - 1]; // Get the last element

  function isActiveRoute(pathToMatch) {
    return lastSegment === pathToMatch;
  }

  return (
    <>
      <div className="relative w-12/12 flex flex-col mb-10">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full">
            <h1 className="font-semibold text-2xl p-2 m-4">
              Services Request Management
            </h1>
          </div>
        </div>

        <div class="inline-flex gap-5">
          <Link
            to="" // <-- Corrected path
            className={`text-gray-800 hover:bg-gray-200 font-bold py-2 px-4 rounded-md ${
              isActiveRoute("requestManagement") ? "bg-gray-500" : "bg-gray-300"
            }`}
          >
            Venue
          </Link>

          <Link
            to="vehicles"
            className={`text-gray-800 hover:bg-gray-200 font-bold py-2 px-4 rounded-md ${
              isActiveRoute("vehicles") ? "bg-gray-500" : "bg-gray-300"
            }`}
          >
            Vehicle
          </Link>

          <Link
            to="caterings"
            className={`text-gray-800 hover:bg-gray-200 font-bold py-2 px-4 rounded-md ${
              isActiveRoute("caterings") ? "bg-gray-500" : "bg-gray-300"
            }`}
          >
            Catering
          </Link>
        </div>

        <Routes>
         
          <Route path="" element={<AdminVenueRequest />} />
          <Route path="vehicles" element={<AdminVehicleRequests />} />
          <Route path="caterings" element={<AdminCarteringRequests />} />
        </Routes>
      </div>
    </>
  );
}
