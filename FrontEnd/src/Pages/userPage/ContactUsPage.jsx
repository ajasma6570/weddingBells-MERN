import React from "react";
import Footer from "../../Components/userComponents/Footer";
import UseNavbar from "../../Components/userComponents/UseNavbar";
import { Link } from "react-router-dom";

export default function ContactUsPage() {
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <UseNavbar />

        <div
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
          className="bg-stone-200"
        >
          <div className="w-9/12 mx-auto pt-10 flex flex-col justify-center items-center">
            <h1 className="font-sans font-semibold text-center text-3xl">
              Feel free to contact us at your convenience and we’ll be happy to
              get in touch with you.{" "}
            </h1>

            <Link to="tel:9995559990" className="text-blue-500 text-2xl mt-5 cursor-pointer">+91 9995559990</Link>

            <div className="flex items-center p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12L12 5l-8 7 8 7 8-7zm0 0v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7"
                />
              </svg>
              <Link to="mailto:weddingbells@gmail.com" className="text-2xl mt-3 underline text-blue-500 cursor-pointer">weddingbells@gmail.com</Link>
              
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
