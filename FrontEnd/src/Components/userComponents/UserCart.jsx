import React, { useEffect, useState } from 'react'
import { useCartDetialsMutation } from '../../Redux/user/userApiSlice'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';

export default function UserCart() {

  const [CartDetials] = useCartDetialsMutation()
  const userData = useSelector((state)=>state.rootReducer.user)
  const [cart,setCart] = useState([])

  useEffect(()=>{
    const fetchData = async() => {
      const userId = userData._id
      console.log(userId);
      const  res = await CartDetials({userId})
      console.log(res);
      if(res.data.status === 200){
        const cartData = res.data.cartDetails
        setCart(cartData)
      }else{
        console.log("error");
      }
    
    }
    fetchData()
  },[CartDetials,userData])

  console.log(cart);
  return (
    <>


    <div className='relative w-11/12 flex flex-col mb-12 mx-auto'>

        <div className="flex flex-wrap items-center">
            <div className="relatve w-full px-4 max-w-full">
                <h3 className="font-semibold text-2xl p-2 m-4">Cart</h3>
            </div>
        </div>

    {cart ? (
      <>
      <div className='border border-black '>  
   
   <div className='block bg-transparent m-4 p-2 w-9/12 mx-auto overflow-x-auto  '>
   <table className="">
     <thead className=''>
       <tr className='border border-solid border-l-0 bottom-0 '>
         <th className="text-md px-20 py-3">Image</th>
         <th className="text-md px-20 py-3">Name</th>
         <th className="text-md px-20 py-3">Place</th>
         <th className="text-md px-20 py-3">Date</th>  
         <th className="text-md px-5 py-3">Action</th>  
    
       </tr>
     </thead>
     
     <tbody className=''>
      {cart.venues  && cart.venues.length > 0 &&
      <>
       <h1 className='text-xl font-semibold text text-gray-800'>Venue</h1>
       {cart.venues.map((obj, index)=>(
       <tr className="" >
         <td className="text-md px-20 py-3">
          <img src={`/Pictures/${obj.venueId.image[0]}`} alt="" />
         </td>
         <td className="text-md px-10 py-3">{obj.venueId.name}</td>
         <td className="text-md px-20 py-3">{obj.venueId.city}</td>
         <td className="text-md px-18 py-3">
            <p>from : {obj.from}</p>
            <p>to : {obj.to}</p>
         </td>
         <td className="text-md px-5 py-3 cursor-pointer"><FontAwesomeIcon icon={faTrash} /></td>
       </tr>
       ))}
       </>
      }
    
      {cart.Vehicle  && cart.Vehicle.length > 0 &&
      <>
       <h1 className='text-xl font-semibold text text-gray-800'>Vehicle</h1>
       {cart.Vehicle.map((obj, index)=>(
       <tr className="" >
         <td className="text-md px-20 py-3"> 
         <img src={`/Pictures/${obj.vehicleId.image[0]}`} alt="" />
         </td>
         <td className="text-md px-12 py-3">{obj.vehicleId.name}</td>
         <td className="text-md px-20 py-3">{obj.vehicleId.city}</td>
         <td className="text-md px-18 py-3">
            <p>from : {obj.from}</p>
            <p>to : {obj.to}</p>
         </td>
         <td className="text-md px-5 py-3 cursor-pointer"><FontAwesomeIcon icon={faTrash} /></td>
       </tr>
       ))}
      </>
      }
      
      {cart.Catering && cart.Catering.length > 0 &&
      <>
       <h1 className='text-xl font-semibold text text-gray-800'>Catering</h1>
       {cart.Catering.map((obj, index) => (
       <tr className="" >
         <td className="text-md px-20 py-3"> 
         <img src={`/Pictures/${obj.cateringId.image[0]}`} alt="" />

         </td>
         <td className="text-md px-10 py-3">{obj.cateringId.name}</td>
         <td className="text-md px-20 py-3">{obj.cateringId.city}</td>
       
         <td className="text-md px-18 py-3">
            <p>from : {obj.from}</p>
            <p>to : {obj.to}</p>
         </td>
         <td className="text-md px-5 py-3 cursor-pointer"><FontAwesomeIcon icon={faTrash} /></td>
       </tr>
       ))}
      </>}
      


     </tbody>
   </table>
 </div>

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
</>
    ) : (
      <div className='h-screen w-full'>
      <h1 className='text-3xl font-semibold text-gray-500 py-20 text-center'>No records found</h1>

      </div>

    )}

    



</div>
    </>
  )
}
