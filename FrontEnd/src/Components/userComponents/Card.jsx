import React from "react";

function Card() {
  return (
    <>
      <div className="card p-5">
        <img
          alt=""
          src="/Assets/venue.jpg"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="rounded-3xl"
        />
        <div className="text-center">
          <span className=" text-2xl font-bold">Venue</span>
        </div>
      </div>
    </>
  );
}

export default Card;
