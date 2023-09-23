import React from "react";

export default function ClientReviews() {
  return (
    <>
      <div className="card border rounded-lg  ml-5 bg-white md:grid-cols-1">
        <div className="flex items-center m-5">
          <div className="bg-black rounded-full m-5  "></div>
          <span>Client Name</span>
        </div>
        <h1 className="pl-16">Star Ratings</h1>
        <p className="pl-16">Description</p>
      </div>
    </>
  );
}
