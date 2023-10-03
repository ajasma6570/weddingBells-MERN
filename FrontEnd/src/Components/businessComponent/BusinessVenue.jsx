import React, { useState } from 'react'
import { useBusinessVenueAddMutation } from '../../Redux/Business/businessApiSlice'
import {useNavigate, useParams} from 'react-router-dom'
import { toastError, toastSuccess } from '../toast'
import { useDispatch } from 'react-redux'
import { logoutBusinessAccount } from '../../Redux/Business/businessSlice'
export default function BusinessVenue() {

  const [name,setName] = useState("")
  const [city, setCity] = useState("")
  const [capacity, setCapacity] = useState("")
  const [phone, setPhone] = useState("")
  const [pincode, setPincode] = useState("")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [images, setImages] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {userId} = useParams()

  const [BusinessVenueAdd] = useBusinessVenueAddMutation();
  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };



  const handleImage = (e) => {
    const selectedFiles = e.target.files;
    const newImages = [...images]; // Create a new array to avoid mutating state directly
  
    for (let i = 0; i < selectedFiles.length; i++) {
      newImages.push(selectedFiles[i]); // Push each selected file to the newImages array
    }
    
    setImages(newImages); // Update the state
  };
  
  const handleSubmit = async() => {

    const formData = new FormData();

    formData.append('name', name);
    formData.append('city', city);
    formData.append('capacity', capacity);
    formData.append('phone', phone);
    formData.append('pincode', pincode);
    formData.append('description', description);
    formData.append('amount', amount);
    formData.append('userId',userId)


    // Append each image from the selectedImages array
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try{
      const res= await BusinessVenueAdd(formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        console.log(res.data.status);
      if(res.data.status === 200){
        toastSuccess(res.data.message)
        navigate('/business/dashboard/businessAccountDetails')
      }else if(res.data.status === 401){
        toastError(res.data.message)
        dispatch(logoutBusinessAccount())
        navigate('/business/login')
      }else{
        toastError(res.data.message)
      }

    }catch(error){
      console.log(error);
    }

  }

  return (
    <section id="venue" className="mt-6 sm:flex sm:flex-wrap sm:-mx-2 w-full">
        <div className="w-full sm:w-1/2 sm:px-2">
          <h1 className="text-3xl text-gray-700 font-bold font-sans">Venue Management</h1>

          <label htmlFor="name" className="block mt-4">Name</label>
          <input type="text" id="name" placeholder="Enter venue name" className="w-full" 
          onChange={(e)=>setName(e.target.value)}
          />

          <label htmlFor="city" className="block mt-4">City</label>
          <input type="text" id="city" placeholder="Enter city" className="w-full" 
          onChange={(e)=>setCity(e.target.value)}
          />

          <label htmlFor="capacity" className="block mt-4">Capacity</label>
          <input type="text" id="capacity" placeholder="Enter venue seat capacity" className="w-full" 
          onChange={(e)=>setCapacity(e.target.value)}
          />
     
          <label htmlFor="phone" className="block mt-4">Phone</label>
          <input type="text" id="phone" placeholder="Enter venue phone number" className="w-full" 
          onChange={(e)=>setPhone(e.target.value)}
          />

          <label htmlFor="pincode" className="block mt-4">Pincode</label>
          <input type="text" id="pincode" placeholder="Enter pincode" className="w-full" 
          onChange={(e)=>setPincode(e.target.value)}
          />

          <label htmlFor="description" className="block mt-4">Description</label>
          <textarea id="description"  maxLength={200} placeholder="Write a description your venue" className="w-full pl-3"
          onChange={(e)=>setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="amount" className="block mt-4">Amount</label>
          <input type="text" id="amount" placeholder="Enter amount" className="w-full" 
          onChange={(e)=>setAmount(e.target.value)}
          />

          <label htmlFor="image" className="block mt-4">Image</label>
          <input type="file" name="images" accept="image/*" multiple onChange={handleImage} className="w-full" />

          <div className=" my-6 flex items-center">
            <input type="checkbox" className="mr-2 cursor-pointer" 
             checked={isCheckboxChecked}
             onChange={handleCheckboxChange}
             />
            <span htmlFor="">Tick box, confirm above details are correct</span>
          </div>

          <div className="my-5">
          <button
          type="button"
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
            !isCheckboxChecked && 'opacity-50 cursor-not-allowed'
          }`}
          onClick={handleSubmit}
          disabled={!isCheckboxChecked}
        >
          Send Request
        </button>    

        </div>
        </div>
      </section>
  )
}
