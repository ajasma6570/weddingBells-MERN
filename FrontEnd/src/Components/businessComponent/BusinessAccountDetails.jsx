import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BusinessAccountDetails() {

  const business = useSelector((state) => state.rootReducer.business);
  const navigate = useNavigate();

  return (
    <div>
      <div className="lg:flex py-8">
        {/* Profile Image and Edit Button */}
        <div className="lg:w-3/6 w-full lg:order-1 order-2 flex flex-col items-center justify-center">
          <div className="h-20 w-20 lg:w-20 lg:h-20 bg-red-700 rounded-full"></div>
          <span className="block mt-2 bg-gray-800 hover:bg-gray-500 text-white rounded-md px-2 cursor-pointer">
            Change Image
          </span>
          {false && <input type="file" className="block" />}
        </div>
        <div className="lg:w-16 w-full lg:mt-0 mt-4 lg:order-2 order-1 flex justify-center items-center">
          <div
            className="px-3 editbutton border border-black rounded-md cursor-pointer bg-gray-800 text-white hover:bg-gray-500"
            onClick={() =>
              navigate(`/business/dashboard/businessAccontUpdate/${business._id}`)
            }
          >
            Edit
          </div>
        </div>
      </div>

      <div className="">
        {/* User Details */}
        <div className="">
          <div className="my-5">
            <label>Name</label>
            <span className="pl-10 pr-5">:</span>
            <input
              value={business.name}
              className="border border-black rounded-md pl-3 cursor-pointer "
              readOnly
            />
          </div>
          <div className="my-5">
            <label>E-mail</label>
            <span className="pl-10 pr-5">:</span>
            <input
              value={business.email}
              className="border border-black rounded-md pl-3 cursor-pointer "
              readOnly
            />
          </div>
          <div className="my-5">
            <label>Phone</label>
            <span className="pl-10 pr-5">:</span>
            <input
              value={business.phone}
              className="border border-black rounded-md pl-3 cursor-pointer "
              readOnly
            />
          </div>
          <div className="my-5">
            <label>Address</label>
            <span className="pl-6 pr-6">:</span>
            <input
              value={business.address}
              className="border border-black rounded-md pl-3 cursor-pointer "
              readOnly
            />
          </div>
          <div className="my-5">
            <label>State</label>
            <span className="pl-12 pr-5">:</span>
            <input
              value={business.state}
              className="border border-black rounded-md pl-3 cursor-pointer "
              readOnly
            />
          </div>
          <div className="my-5">
            <label>City</label>
            <span className="pl-14 pr-5">:</span>
            <input
              value={business.city}
              className="border border-black rounded-md pl-3 cursor-pointer "
              readOnly
            />
          </div>
          <div className="my-5">
            <label>Pin</label>
            <span className="pl-16 pr-5">:</span>
            <input
              value={business.pincode}
              className="border border-black rounded-md pl-3 cursor-pointer"
              readOnly
            />
          </div>
          <div className="my-5">
            <label>Password</label>
            <span className="m-5">:</span>
            <input
              type="password"
              value="12345678"
              readOnly
              className="border border-black rounded-md pl-3 cursor-pointer "
            />
            <button
              type="button"
              className="btn mt-3 ml-0 lg:ml-3 border border-black rounded-md bg-gray-800 hover:bg-gray-500 text-white px-2 cursor-pointer"
              onClick={() =>
                navigate(`/business/dashboard/businessAccPasswordChange/${business.phone}`)
              }
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
