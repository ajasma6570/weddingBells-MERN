import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AccountDetails() {
  const user = useSelector((state) => state.rootReducer.user);
  const navigate =useNavigate()

  return (
    <div> 
      <div className="lg:flex py-8">
  {/* Profile Image and Edit Button */}
  <div className="lg:w-3/6 w-full lg:order-1 order-2 flex flex-col ">
    <div className="h-20 w-20 lg:w-20 lg:h-20 bg-red-700 rounded-full" style={{ background: `url('/Assets/usernoprofile.webp')`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
    <span className="block mt-2 w-32  hover:border border-white text-white rounded-md px-2 cursor-pointer">Change Image</span>
    {false &&  <input type="file" className="block" />}
   
  </div>
 
</div>

      <div className="">
        {/* User Details */}
        <div className="">
          <div className="my-5">
            <label className="font-medium">Name</label>
            <span className="pl-10 pr-5 ">:</span>
            <input value={user.name} className=" rounded-md pl-3 cursor-pointer " readOnly />
          </div>
          <div className="my-5">
            <label className="font-medium">E-mail</label>
            <span className="pl-10 pr-5">:</span>
            <input value={user.email} className=" rounded-md pl-3 cursor-pointer " readOnly />
          </div>
          <div className="my-5">
            <label className="font-medium">Phone</label>
            <span className="pl-10 pr-5">:</span>
            <input value={user.phone} className=" rounded-md pl-3 cursor-pointer " readOnly />
          </div>
          <div className="my-5">
            <label className="font-medium">Address</label>
            <span className="pl-6 pr-6">:</span>
            <input value={user.address} className=" rounded-md pl-3 cursor-pointer " readOnly />
          </div>
          <div className="my-5">
            <label className="font-medium">State</label>
            <span className="pl-12 pr-5">:</span>
            <input value={user.state} className=" rounded-md pl-3 cursor-pointer " readOnly />
          </div>
          <div className="my-5">
            <label className="font-medium">City</label>
            <span className="pl-14 pr-5">:</span>
            <input value={user.city} className=" rounded-md pl-3 cursor-pointer "
            readOnly />
          </div>
          <div className="my-5">
            <label className="font-medium">Pin</label>
            <span className="pl-16 pr-5">:</span>
            <input value={user.pincode} className=" rounded-md pl-3 cursor-pointer" readOnly />          
            </div>
          <div className="my-5">
            <label className="font-medium">Password</label>
            <span className="m-5">:</span>
            <input
              type="password"
              value="12345678"
              readOnly
              className=" rounded-md pl-3 cursor-pointer "
            />
            <button
              type="button"
              className="btn mt-3 ml-0 lg:ml-3  rounded-md  hover:border border-white text-white px-2 cursor-pointer"
              onClick={()=>navigate(`/user/userProfile/passwordChange/${user.phone}`)}
           >
              Change Password
            </button>
          </div>
          <div className="lg:w-16 w-full lg:mt-0 mt-4 lg:order-2 order-1 flex justify-center items-center px-40 ">
            <div className="px-3 editbutton rounded-md cursor-pointer font-medium text-xl text-white hover:border border-white"
            onClick={()=>navigate(`/user/userProfile/accountUpdate/${user._id}`)}
            >Edit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
