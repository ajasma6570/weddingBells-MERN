import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <>
    <Link to={props.link}>
      <div className="card p-5">
        <img
          alt={props.service}
          src={props.image}
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height:"15rem"
          }}
          className="rounded-3xl cursor-pointer"
        />
        <div className="text-center">
          <span as={Link} to="/aboutus" className=" text-2xl font-bold cursor-pointer">{props.service}</span>
        </div>
      </div>
      </Link>
    </>
  );
}

export default Card;
