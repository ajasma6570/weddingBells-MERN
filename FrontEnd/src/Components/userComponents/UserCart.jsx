import React from 'react'

export default function UserCart() {
  return (
    <>


    <div className='relative w-11/12 flex flex-col mb-12 mx-auto'>

        <div className="flex flex-wrap items-center">
            <div className="relatve w-full px-4 max-w-full">
                <h3 className="font-semibold text-2xl p-2 m-4">Cart</h3>
            </div>
        </div>

    <div className='border border-black '>    {/* Venue table */}
   
       <div className='block bg-transparent m-4 p-2 w-9/12 mx-auto overflow-x-auto  '>
       <table className="">
         <thead className=''>
           <tr className='border border-solid border-l-0 bottom-0 '>
             <th className="text-md px-20 py-3">Image</th>
             <th className="text-md px-20 py-3">Name</th>
             <th className="text-md px-20 py-3">Place</th>
             <th className="text-md px-20 py-3">Date</th>      
           </tr>
         </thead>
         
         <tbody className=''>
         <h1 className='text-xl font-semibold text text-gray-800'>Venue</h1>
           <tr className="" >
             <td className="text-md px-20 py-3">index </td>
             <td className="text-md px-20 py-3">obj.name</td>
             <td className="text-md px-20 py-3">obj.place</td>
             <td className="text-md px-20 py-3">
                <p>from</p>
                <p>to</p>
             </td>
           </tr>

           <h1 className='text-xl font-semibold text text-gray-800'>Vehicle</h1>
           <tr className="" >
             <td className="text-md px-20 py-3">index </td>
             <td className="text-md px-20 py-3">obj.name</td>
             <td className="text-md px-20 py-3">obj.place</td>
             <td className="text-md px-20 py-3">
                <p>from</p>
                <p>to</p>
             </td>
           </tr>

           <h1 className='text-xl font-semibold text text-gray-800'>Catering</h1>
           <tr className="" >
             <td className="text-md px-20 py-3">index </td>
             <td className="text-md px-20 py-3">obj.name</td>
             <td className="text-md px-20 py-3">obj.place</td>
           
             <td className="text-md px-20 py-3">
                <p>from</p>
                <p>to</p>
             </td>
           </tr>

   
         </tbody>
       </table>
     </div>
    
     
    {/* {!venue.length > 0 && !vehicle.length > 0 && !catering.length > 0 && 
    <>
    <h1 className='text-3xl text-gray-600 text-center py-20 font-semibold'>No Request Found</h1>
    </>
    } */}


</div>

<div className="flex justify-end py-5">
       <span> <input type="checkbox"/>  Tick this box to verify and confirm the above bookings, then pay 
        a caution deposit of 5000 (this will deducted from the Total amount).</span>
        
</div>

<div className="flex justify-end py-5  ">
  <div className=' h-48 w-60 border border-black p-5 rounded-lg'>
        <p className='tex-md font-semibold'>Payment method</p>
        <p className='font-semibold pl-5 py-1'>Amount : 5000rs</p>
        <p className='pl-5 py-1'><input type='radio'/> Razorpay</p>
        <div className='pl-16 py-2'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-full">
        Pay Now
        </button>
</div>
  </div>
</div>



</div>
    </>
  )
}
