import React from "react";
import Footer from "../../Components/Footer";
import Signup from "../../Components/userComponents/Signup";
import UseNavbar from "../../Components/userComponents/UseNavbar";


export default function SignUpPage() {
  return (
    <>
     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
   <UseNavbar />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Signup />
      </div>

      <Footer />
      </div>
    </>
  );
}
