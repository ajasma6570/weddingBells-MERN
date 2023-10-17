import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useAdminUserDetailMutation, useAdminUserDetialsEditMutation } from "../../Redux/Admin/adminApiSlice";
import { toastError, toastSuccess } from "../toast";
import { validateEmail } from "../../utils/validation";
import swalFire from "../../utils/SwalFire";
import { useDispatch } from "react-redux";
import { LogoutAdmin } from "../../Redux/Admin/adminSlice";


export default function AdminUserEdit() {

    const {userId} = useParams()
    const [AdminUserDetail] = useAdminUserDetailMutation();
    const [isEdit,setIsEdit] = useState(true)
    const [AdminUserDetialsEdit] = useAdminUserDetialsEditMutation()
     
    const [name,setName] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const bgColor= isEdit? "bg-stone-300":""
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async() => {
            const res= await AdminUserDetail({userId})
         
           if(res.data.status === 200){
            const userDetails = res.data.userdetail
            setName(userDetails.name);
            setEmail(userDetails.email)
            setPhone(userDetails.phone)
            setAddress(userDetails.address)
            setCity(userDetails.city)
            setState(userDetails.state)
            setPincode(userDetails.pincode)
           }else if(res.data.status === 401){
            dispatch(LogoutAdmin())
            toastError(res.data.message)
            navigate('/admin/login')
           }
           
        }
        fetchData();
        
    },[AdminUserDetail,isEdit, userId,dispatch,navigate])

    const handleEdit = async() => {
      swalFire("Edit this User").then(async(result)=>{
        if(result.isConfirmed){
          setIsEdit(false)
        }
      })
        
    }

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
    
          swalFire("Confirm Update").then(async(result)=>{
            if(result.isConfirmed){
              const res= await AdminUserDetialsEdit({name, email, phone, address, state, city, pincode, userId})
    
              if (res.data.status === 200) {
                toastSuccess(res.data.message);
                setIsEdit(true)
              } else {
                toastError(res.data.message);
                return;
              }
            }
          })
    }

    
  return (
    <div className="w-full flex justify-center align-items-center p-10">
    
      <div className="p-5 bg-gray-300 w-80">
            <div className="form-group">
            <label htmlFor="name">Name : </label>
            <input
                type="text"
                id="name"
                className={`form-control ml-4 border rounded-md px-3 ${bgColor}`}
                placeholder=""
                onChange={(e) => setName(e.target.value)} // Update name state here
                value={name}
                readOnly={isEdit}
                
            />
            </div>
            <div className="form-group mt-3">
            <label htmlFor="email">E-mail:</label>
            <input
                type="email"
                id="email"
                className={`form-control ml-6 border rounded-md px-3 ${bgColor} `}
                placeholder=""
                onChange={(e) => setEmail(e.target.value)} // Update name state here
                value={email}
                readOnly={isEdit}
            />
            </div>
            <div className="form-group mt-3">
            <label htmlFor="phone">Phone:</label>
            <input
                type="text"
                id="phone"
                className={`form-control ml-6 border rounded-md px-3 ${bgColor}`}
                placeholder=""
                onChange={(e) => setPhone(e.target.value)} // Update name state here
                value={phone}
                readOnly={isEdit}
            />
            </div>
            <div className="form-group mt-3">
            <label htmlFor="address">Address:</label>
            <input
                type="text"
                id="address"
                className={`form-control ml-3 border rounded-md px-3 ${bgColor}`}
                placeholder=""
                onChange={(e) => setAddress(e.target.value)} // Update name state here
                value={address}
                readOnly={isEdit}
            />
            </div>
            <div className="form-group mt-3">
            <label htmlFor="city">City:</label>
            <input
                type="text"
                id="city"
                className={`form-control ml-10 border rounded-md px-3 ${bgColor}`}
                placeholder=""
                onChange={(e) => setCity(e.target.value)} // Update name state here
                value={city}
                readOnly={isEdit}
            />
            </div>
            <div className="form-group mt-3">
            <label htmlFor="state">State:</label>
            <input
                type="text"
                id="state"
                className={`form-control ml-8 border rounded-md px-3 ${bgColor}`}
                placeholder=""
                onChange={(e) => setState(e.target.value)} // Update name state here
                value={state}
                readOnly={isEdit}
            />
            </div>
            <div className="form-group mt-3">
            <label htmlFor="pincode">Pincode:</label>
            <input
                type="text"
                id="pincode"
                className={`form-control ml-3 border rounded-md px-3 ${bgColor}`} 
                placeholder=""
                onChange={(e) => setPincode(e.target.value)} // Update name state here
                value={pincode}
                readOnly={isEdit}
            />
            </div>
            <div className="mx-28 mt-5 border rounded-md px-3">
                {isEdit && 
                 <button className="btn btn-primary bg-blue-700 hover:bg-blue-500 text-white font-sans text-xl rounded-lg px-5"
                 onClick={handleEdit}
                 >Edit</button>
               }
               {!isEdit && 
                 <button className="btn btn-primary bg-green-700 hover:bg-green-500 text-white font-sans text-xl rounded-lg px-5"
                 onClick={handleUpdate}
                 >Update</button>
               }
            </div>
      </div>
         
    </div>
  );
}
