import React from "react";
import AdminDashBoard from "../../Components/AdminComponent/AdminDashBoard";
import AdminFooter from "./AdminFooter";

export default function AdminDashBoardPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <h1 className="bg-gray-800 text-white text-center">Welcome Admin</h1>
      
      {/* Content area (Admin Dashboard) */}
      <div className="flex-grow">
        <AdminDashBoard />
      </div>

      {/* Footer at the bottom */}
      <div className="flex-shrink-0">
        <AdminFooter />
      </div>
    </div>
  );
}
