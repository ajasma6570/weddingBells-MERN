import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BUsinessCatering() {

const [name, setName] = useState("")
const [city, setCity] = useState("")
const [phone, setPhone] = useState("")
const [pincode, setPincode] = useState("")
const [description, setDescription] = useState("")
const [minAmount , setMinAmount] = useState("")
const [maxAmount, setMaxAmount] = useState("")
const [images, setImages] = useState([]);
const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

const {userId} = useParams()

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

const handleSubmit = () => {
  console.log(name, city, phone, pincode, description, minAmount, maxAmount);
  console.log(images);
}

  return (
    <section id="catering" className="mt-6 sm:flex sm:flex-wrap sm:-mx-2 w-full">
        <div className="w-full sm:w-1/2 sm:px-2">
          <h1 className="text-3xl text-gray-700 font-bold font-sans">Catering Management</h1>

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
          <textarea id="description"  maxLength={200} placeholder="Write a description about your services" className="w-full"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="amount" className="block mt-4">Min Amount</label>
          <input type="text" id="amount" placeholder="Enter min amount per head" className="w-full" 
          value={minAmount}
          onChange={(e)=>setMinAmount(e.target.value)}
          />

          <label htmlFor="amount" className="block mt-4">Max Amount</label>
          <input type="text" id="amount" placeholder="Enter max amount per head" className="w-full" 
          value={maxAmount}
          onChange={(e)=>setMaxAmount(e.target.value)}
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
