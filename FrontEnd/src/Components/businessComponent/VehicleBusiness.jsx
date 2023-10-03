import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBusinessVehicleAddMutation } from '../../Redux/Business/businessApiSlice'
import { toastError, toastSuccess } from '../toast'
import { useDispatch } from 'react-redux'
import { logoutBusinessAccount } from '../../Redux/Business/businessSlice'


export default function VehicleBusiness() {

const [name, setName] = useState("")
const [city, setCity] = useState("")
const [seatCapacity, setSeatCapacity] = useState("")
const [model, setModel] = useState("")
const [phone,setPhone] = useState("")
const [pincode, setPincode] = useState("")
const [description, setDescription] = useState("")
const [rentAmount, setRentAmount] = useState("")
const [freeKms, setFreeKms] = useState("")
const [extraKmsCharge, setExtraKmsCharge] = useState("")
const [images, setImages] = useState([]);
const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

const {userId} = useParams()
const [BusinessVehicleAdd] = useBusinessVehicleAddMutation()
const navigate = useNavigate()
const dispatch = useDispatch()

const handleCheckboxChange = () => {
  setIsCheckboxChecked(!isCheckboxChecked);

}


const handleImage = (e) => {
  const selectedFiles = e.target.files;
  const newImages = [...images]; // Create a new array to avoid mutating state directly

  for (let i = 0; i < selectedFiles.length; i++) {
    newImages.push(selectedFiles[i]); // Push each selected file to the newImages array
  }
  
  setImages(newImages); // Update the state
};

const handleSubmit = async() => {

  const formData = new FormData()

  formData.append('name',name)
  formData.append('city',city)
  formData.append('seatCapacity',seatCapacity)
  formData.append('model',model)
  formData.append('phone',phone)
  formData.append('pincode',pincode)
  formData.append('description',description)
  formData.append('rentAmount',rentAmount)
  formData.append('freeKms',freeKms)
  formData.append('extraKmsCharge',extraKmsCharge)
  formData.append('userId',userId)

  // Append each image from the selectedImages array
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }

  try{
    const res= await BusinessVehicleAdd(formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

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
    <section id="vehicle" className="mt-6 sm:flex sm:flex-wrap sm:-mx-2 w-full">
    <div className="w-full sm:w-1/2 sm:px-2">
      <h1 className="text-3xl text-gray-700 font-bold font-sans">Vehicle Management</h1>

      <label htmlFor="name" className="block mt-4">Name</label>
      <input type="text" id="name" placeholder="Enter name" className="w-full"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />

      <label htmlFor="city" className="block mt-4">City</label>
      <input type="text" id="city" placeholder="Enter city" className="w-full" 
      value={city}
      onChange={(e)=>setCity(e.target.value)}
      />

      <label htmlFor="capacity" className="block mt-4">seat Capacity</label>
      <input type="text" id="capacity" placeholder="Enter seat capacity" className="w-full" 
      value={seatCapacity}
      onChange={(e)=>setSeatCapacity(e.target.value)}
      />
 
      <label htmlFor="capacity" className="block mt-4">Model</label>
      <input type="text" id="capacity" placeholder="Enter vehicle model" className="w-full" 
      value={model}
      onChange={(e)=>setModel(e.target.value)}
      />


      <label htmlFor="phone" className="block mt-4">Phone</label>
      <input type="text" id="phone" placeholder="Enter phone number" className="w-full"
      value={phone}
      onChange={(e)=>setPhone(e.target.value)}
      />

      <label htmlFor="pincode" className="block mt-4">Pincode</label>
      <input type="text" id="pincode" placeholder="Enter pincode" className="w-full" 
      value={pincode}
      onChange={(e)=>setPincode(e.target.value)}
      />

      <label htmlFor="description" className="block mt-4">Description</label>
      <textarea id="description"  maxLength={200} placeholder="Write a description about vehicle" className="w-full pl-2"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      ></textarea>

      <label htmlFor="amount" className="block mt-4">Rent Amount per day</label>
      <input type="text" id="amount" placeholder="Enter charge per day" className="w-full" 
      value={rentAmount}
      onChange={(e)=>setRentAmount(e.target.value)}
      />

      <label htmlFor="amount" className="block mt-4">Free kilometer</label>
      <input type="text" id="amount" placeholder="Enter Kms" className="w-full" 
      value={freeKms}
      onChange={(e)=>setFreeKms(e.target.value)}
      />

      <label htmlFor="amount" className="block mt-4">Extra kilometer charge</label>
      <input type="text" id="amount" placeholder="Enter Kms" className="w-full" 
      value={extraKmsCharge}
      onChange={(e)=>setExtraKmsCharge(e.target.value)}
      />

      <label htmlFor="image" className="block mt-4">Image</label>
      <input type="file" id="images" accept='image/*' multiple onChange={handleImage}  className="w-full" />


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
