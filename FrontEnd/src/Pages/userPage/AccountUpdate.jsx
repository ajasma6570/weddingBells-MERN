import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {validateEmail} from "../../utils/validation"
import { useUpdateDetailsMutation } from "../../Redux/user/userApiSlice";
import { toastError, toastSuccess } from "../../Components/toast";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Redux/user/userSlice";

export default function AccountUpdate() {
  
    const user = useSelector((state) => state.rootReducer.user);
   
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [address, setAddress] = useState(user.address)
    const [state, setState] = useState(user.state)
    const [city, setCity] = useState(user.city)
    const [pincode, setPincode] = useState(user.pincode)
    const userId = user.id;
    const navigate = useNavigate()
    const [updateDetails] = useUpdateDetailsMutation();
    const dispatch = useDispatch()

    const handleUpdate = async() => {
      if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !state ||
        !pincode
      ) {
        toastError("Please fill in all fields.");
        return;
      }

      if(!validateEmail(email)){
        toastError("Please enter a valid email address.");
        return;
      }

      const res= await updateDetails({name, email, phone, address, state, city, pincode, userId})
      if (res.data.status === 200) {
        toastSuccess(res.data.message);
        dispatch(loginUser(res.data.userdetails))
        navigate('/user/userProfile')
      } else {
        toastError(res.data.message);
        return;
      }

    }

  return (
    <div> 
      
      <div className="">
        <div className="">
          <div className="my-5">
            <label>Name</label>
            <span className="pl-10 pr-5">:</span>
            <input value={name} className="border border-black rounded-md pl-3"
            onChange={(e)=>setName(e.target.value)} 
            />
          </div>
          <div className="my-5">
            <label>E-mail</label>
            <span className="pl-10 pr-5">:</span>
            <input value={email} className="border border-black rounded-md pl-3" 
            onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label>Phone</label>
            <span className="pl-10 pr-5">:</span>
            <input value={phone} className="border border-black rounded-md pl-3"
            onChange={(e)=>setPhone(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label>Address</label>
            <span className="pl-6 pr-6">:</span>
            <input value={address} className="border border-black rounded-md pl-3" 
            onChange={(e)=>setAddress(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label>State</label>
            <span className="pl-12 pr-5">:</span>
            <input value={state} className="border border-black rounded-md pl-3" 
            onChange={(e)=>setState(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label>City</label>
            <span className="pl-14 pr-5">:</span>
            <input value={city} className="border border-black rounded-md pl-3" 
            onChange={(e)=>setCity(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label>Pin</label>
            <span className="pl-16 pr-5">:</span>
            <input value={pincode} className="border border-black rounded-md pl-3" 
            onChange={(e)=>setPincode(e.target.value)}
            />
          </div>
          <div className="px-28">
          <div type="sumbit" className="w-20 cursor-pointer border border-black rounded-md px-2 bg-gray-800 hover:bg-gray-500 text-white"
          onClick={handleUpdate}
          >Update</div>

          </div>
        </div>
      </div>
    </div>
  )
}
