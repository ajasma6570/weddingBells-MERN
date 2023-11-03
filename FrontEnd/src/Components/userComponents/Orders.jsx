import React, { useEffect, useState } from 'react'
import { useCartDetialsMutation, useCartItemRemoveMutation } from '../../Redux/user/userApiSlice'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import {toastError, toastSuccess} from "../toast"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const [CartDetials] = useCartDetialsMutation()
  const userData = useSelector((state)=>state.rootReducer.user)
  const [cart,setCart] = useState([])
  const [tick,setTick] = useState(false)
  const [CartItemRemove] = useCartItemRemoveMutation()
  const [remove,setRemove] = useState(false)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const handleCheckboxChange = (e) => {
    setTick(e.target.checked);
  };

const handleRemove =async(itemId,service) =>{
  const userId = userData._id
  const res= await CartItemRemove({userId,itemId,service})
  if(res.data.status === 200){
    toastSuccess(res.data.message)
    setRemove(!remove)
  }
}


  useEffect(()=>{
    const fetchData = async() => {
      setLoading(true); 
      const userId = userData._id
      const  res = await CartDetials({userId})
      if(res.data.status === 200){
        const cartData = res.data.cartDetails
        setCart(cartData)
      }else{
        toastError("internal server error...")
      }
      setLoading(false); 
    }
    fetchData()  
  },[CartDetials,userData,remove])

  const handleDisableButton =() => {
    toastError("Please read & tick above condition")
  }

  const book = {
		name: "Wedding Bells",
		author: "Wedding Bells",
		img: "/Assets/RazorPayImg.jpg",
		price: 5000,
	};

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_SiqHdWQEZYyY3R",
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description: "Test Transaction",
      image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const userId = userData._id
          const verifyUrl = "http://localhost:4000/user/UserPaymentVerify";
          const { data } = await axios.post(verifyUrl, { response ,userId});
          toastSuccess(data.message)
        
          const bookId = data.detail;
          navigate(`/userBookingCompleted/${bookId}`)
        } catch (error) {
          toastError(error)
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    // Initialize Razorpay outside of the window.onload function
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };  
      
  const handlePayNow = async() => {
    try {
			const orderUrl = "http://localhost:4000/user/UserPaymentOrders";
			const { data } = await axios.post(orderUrl, { amount: book.price });
			initPayment(data.data);
		} catch (error) {
		  toastError(error)
		} 
  }   

  return (
    <>

    <div className=''>
        <div className='relative  flex flex-col mb-12 mx-auto  '>
    
            <div className="flex flex-wrap items-center">
                <div className="relatve w-full px-4 max-w-full">
                    <h3 className="font-semibold text-2xl p-2 m-4">Orders</h3>
                </div>
            </div>
    
            {loading ? ( // Check loading state
              <div className='h-screen w-full'>
                <h1 className='text-3xl font-semibold text-gray-500 py-20 text-center'>Loading...</h1>
              </div>
                ) :
                  cart ? (
          <>
          <div className='border border-black '>  
       
       <div className='block bg-transparent m-4 p-2 w-11/12 mx-auto overflow-x-auto  '>
       <table className="">
         <thead className=''>
           <tr className='border border-solid border-white border-1-0 bottom-0 '>
           <th className="text-md pr-10 py-3">Image</th>
             <th className="text-md px-5 py-3">Name</th>
             <th className="text-md px- py-3">Booked Date</th>
             <th className="text-md px-10 py-3 ">Status</th>  
             <th className="text-md px-5 py-3">Cancel</th>  
        
           </tr>
         </thead>
         
         <tbody className=''>
          {cart.venues  && cart.venues.length > 0 &&
          <>
           <h1 className='text-xl font-semibold text text-gray-800'>Venue</h1>
           {cart.venues.map((obj, index)=>(
           <tr className="" >
             <td className="text-md px-28 py-3">
              <img src={`/Pictures/${obj.venueId.image[0]}`} alt="" style={{height:"5rem",width:"10rem"}} />
             </td>
             <td className="text-md px-10 py-3">{obj.venueId.name}</td>
             <td className="text-md px-18  py-3">
             <p>
                {obj.bookedDates.map((date, index) => (
                  <>
                  <span key={index}>{date}</span>
                  <br />
                  </>
                ))}
              </p>
             </td>
             <td className='px-6'>completed</td>
             <td className="text-md px-5 py-3 cursor-pointer"><FontAwesomeIcon icon={faTrash} className="text-gray-800 hover:text-red-500" 
             onClick={()=>handleRemove(obj._id,"venues")}
             /></td>
             
           </tr>
           ))}
           </>
          }
        
          {cart.Vehicle  && cart.Vehicle.length > 0 &&
          <>
           <h1 className='text-xl font-semibold text text-gray-800'>Vehicle</h1>
           {cart.Vehicle.map((obj, index)=>(
           <tr className="" >
             <td className="text-md px-28 py-3"> 
             <img src={`/Pictures/${obj.vehicleId.image[0]}`} alt="" style={{height:"5rem",width:"10rem"}}/>
             </td>
             <td className="text-md px-10 py-3">{obj.vehicleId.name}</td>
             <td className="text-md px-18 py-3">
             <p>
                {obj.bookedDates.map((date, index) => (
                  <>
                  <span key={index}>{date}</span>
                  <br />
                  </>
                ))}
              </p>
             </td>
             <td className='px-6'>completed</td>
             <td className="text-md px-5 py-3 cursor-pointer"><FontAwesomeIcon icon={faTrash} className="text-gray-800 hover:text-red-500" 
               onClick={()=>handleRemove(obj._id,"Vehicle")}
             /></td>
             
           </tr>
           ))}
          </>
          }
          
          {cart.Catering && cart.Catering.length > 0 &&
          <>
           <h1 className='text-xl font-semibold text text-gray-800'>Catering</h1>
           {cart.Catering.map((obj, index) => (
           <tr className="" >
             <td className="text-md px-28 py-3"> 
             <img src={`/Pictures/${obj.cateringId.image[0]}`} alt="" style={{height:"5rem",width:"10rem"}}/>
    
             </td>
             <td className="text-md px-10 py-3">{obj.cateringId.name}</td>
           
             <td className="text-md px-18 py-3">
             <p>
                {obj.bookedDates.map((date, index) => (
                  <>
                  <span key={index}>{date}</span>
                  <br />
                  </>
                ))}
              </p>
             </td>
             <td className='px-6'>completed</td>
             <td className="text-md px-5  py-3 cursor-pointer"><FontAwesomeIcon icon={faTrash} className="text-gray-800 hover:text-red-500"
               onClick={()=>handleRemove(obj._id,"Catering")}
             /></td> 
        
           </tr>
           ))}
          </>}
          
    
    
         </tbody>
       </table>
     </div>
    
    </div>
    
    
    </>
        ) : (
          <div className='h-screen w-full'>
          <h1 className='text-3xl font-semibold text-gray-500 py-20 text-center'>No records found</h1>
    
          </div>
    
        )}
    
    </div>
    </div>
</>

  )
}
