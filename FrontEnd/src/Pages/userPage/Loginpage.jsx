import React from "react";
import Footer from "../../Components/Footer";
import Login from "../../Components/userComponents/Login";
import UseNavbar from "../../Components/userComponents/UseNavbar";

export default function Loginpage() {
  return (
    <>
     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <UseNavbar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Login />
      </div>

      <Footer />
      </div>
    </>
  );
}
