import React from "react";
import AdminLogin from "../../Components/AdminComponent/AdminLogin";
import AdminNavBar from "./AdminNavBar";
import AdminFooter from "./AdminFooter";

export default function AdminLoginPage() {
  return (
   
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AdminNavBar />
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminLogin />
        </div>


      <AdminFooter />

      </div>
   
  );
}
