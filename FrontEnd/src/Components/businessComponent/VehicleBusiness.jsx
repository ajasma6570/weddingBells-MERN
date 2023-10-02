import React from 'react'

export default function VehicleBusiness() {
  return (
    <section id="vehicle" className="mt-6 sm:flex sm:flex-wrap sm:-mx-2 w-full">
    <div className="w-full sm:w-1/2 sm:px-2">
      <h1 className="text-3xl text-gray-700 font-bold font-sans">Vehicle Management</h1>

      <label htmlFor="name" className="block mt-4">Name</label>
      <input type="text" id="name" placeholder="Enter name" className="w-full" />

      <label htmlFor="city" className="block mt-4">City</label>
      <input type="text" id="city" placeholder="Enter city" className="w-full" />

      <label htmlFor="capacity" className="block mt-4">seat Capacity</label>
      <input type="text" id="capacity" placeholder="Enter seat capacity" className="w-full" />
 
      <label htmlFor="capacity" className="block mt-4">Model</label>
      <input type="text" id="capacity" placeholder="Enter vehicle model" className="w-full" />


      <label htmlFor="phone" className="block mt-4">Phone</label>
      <input type="text" id="phone" placeholder="Enter phone number" className="w-full" />

      <label htmlFor="pincode" className="block mt-4">Pincode</label>
      <input type="text" id="pincode" placeholder="Enter pincode" className="w-full" />

      <label htmlFor="description" className="block mt-4">Description</label>
      <textarea id="description"  maxLength={200} placeholder="Write a description about vehicle" className="w-full pl-2"></textarea>

      <label htmlFor="amount" className="block mt-4">Rent Amount per day</label>
      <input type="text" id="amount" placeholder="Enter charge per day" className="w-full" />

      <label htmlFor="amount" className="block mt-4">Free kilometer</label>
      <input type="text" id="amount" placeholder="Enter Kms" className="w-full" />

      <label htmlFor="amount" className="block mt-4">Extra kilometer charge</label>
      <input type="text" id="amount" placeholder="Enter Kms" className="w-full" />

      <label htmlFor="image" className="block mt-4">Image</label>
      <input type="file" id="image" className="w-full" />

      <div className=" my-6 flex items-center">
        <input type="checkbox" className="mr-2" />
        <span htmlFor="">Tick box, confirm above details are correct</span>
      </div>

      <div className="my-5">
      <button type="button" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send Request</button>
      </div>

    </div>
  </section>
  )
}
