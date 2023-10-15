import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {  useBusinessActiveServiceMutation } from '../../Redux/Business/businessApiSlice'

export default function BusinessServiceList() {

    const [venue,setVenue] = useState([]) 
    const [vehicle, setVehicle] = useState([])
    const [catering, setCatering] = useState([])
    const [loading, setLoading] = useState(true);


    const {userId} = useParams() 

    const [BusinessActiveService] = useBusinessActiveServiceMutation()

    useEffect(()=>{
      const fetchData = async() => {
        setLoading(true); 
        const res = await BusinessActiveService({userId})
        if(res.data.status === 200 ){
          const venues =res.data.venues
          const vehicles =res.data.vehicles
          const caterings =res.data.caterings
          setVenue(venues)
          setVehicle(vehicles)
          setCatering(caterings)
        }else{
          console.log("error!!!!");
        }
        setLoading(false); 
      }
      fetchData()
    },[BusinessActiveService,userId])

  return (
    <>


    <div className='relative w-11/12 flex flex-col  mb-12'>

        <div className="flex flex-wrap items-center">
            <div className="relatve w-full px-4 max-w-full">
                <h3 className="font-semibold text-2xl p-2 m-4 text-gray-600">Active Services</h3>
            </div>
        </div>

    {/* Venue table */}
    {venue.length > 0 && 
       <div className='block bg-transparent m-4 p-2 w-full overflow-x-auto shadow-stone-600 shadow-lg'>
       <h1 className='text-xl font-semibold text text-gray-800'>Venue</h1>
       <table className="">
         <thead className=''>
           <tr className='border border-solid border-l-0 bottom-0'>
             <th className="text-md px-12 py-3">SL :No</th>
             <th className="text-md px-12 py-3">Name</th>
             <th className="text-md px-12 py-3">City</th>
             <th className="text-md px-12 py-3">Created Date</th>
             <th className="text-md px-12 py-3">Status</th>
      
           </tr>
         </thead>
         <tbody className=''>
          {venue.map((obj,index)=>(
           <tr className="" key={index}>
             <td className="text-md px-12 py-3">{index + 1}</td>
             <td className="text-md px-12 py-3">{obj.name}</td>
             <td className="text-md px-12 py-3">{obj.city}</td>
           
             <td className="text-md px-12 py-3">{new Date(obj.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</td>
                <td className="text-md px-12 py-3">Accepted</td>
           </tr>
           ))}
         </tbody>
       </table>
     </div>
    }
     
    {/* vehicle side */}

     {vehicle.length > 0 && 
       <div className='block bg-transparent m-4 p-2 w-full overflow-x-auto shadow-stone-600 shadow-lg'>
       <h1 className='text-xl font-semibold text text-gray-800'>Vehicle</h1>
       <table className="">
         <thead className=''>
           <tr className='border border-solid border-l-0 bottom-0'>
             <th className="text-md px-12 py-3">SL :No</th>
             <th className="text-md px-12 py-3">Name</th>
             <th className="text-md px-12 py-3">City</th>
             <th className="text-md px-12 py-3">Created Date</th>
             <th className="text-md px-12 py-3">Status</th>
           </tr>
         </thead>
         <tbody className=''>
         {vehicle.map((obj,index)=>(
           <tr className="" key={index}>
             <td className="text-md px-12 py-3">{index + 1}</td>
             <td className="text-md px-12 py-3">{obj.name}</td>
             <td className="text-md px-12 py-3">{obj.city}</td>
             <td className="text-md px-12 py-3">{new Date(obj.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</td>
             <td className="text-md px-12 py-3">Pending</td>
           </tr>
           ))}
         </tbody>
       </table>
     </div>
    }

    {/* catering side */}

{catering.length > 0 && 
        <div className='block bg-transparent m-4 p-2 w-full overflow-x-auto shadow-stone-600 shadow-lg'>
        <h1 className='text-xl font-semibold text text-gray-800'>Catering</h1>
        <table className="">
          <thead className=''>
            <tr className='border border-solid border-l-0 bottom-0'>
              <th className="text-md px-5 py-3">SL:NO</th>
              <th className="text-md px-8 py-3">Name</th>
              <th className="text-md px-8 py-3">City</th>
              <th className="text-md px-8 py-3">Created Date</th>
              <th className="text-md px-8 py-3">Status</th>
            </tr>
          </thead>
          <tbody className=''>
          {catering.map((obj,index)=>(
           <tr className="" key={index}>
             <td className="text-md px-8 py-3">{index + 1}</td>
             <td className="text-md px-12 py-3">{obj.name}</td>
             <td className="text-md px-12 py-3">{obj.city}</td>
             <td className="text-md px-12 py-3">{new Date(obj.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</td>
             <td className="text-md px-12 py-3">Accepted</td>
           
            </tr>
           ))}
          </tbody>
        </table>
      </div>
    }

{loading ? (
  <h1 className='text-3xl text-gray-600 text-center py-20 font-semibold'>Loading...</h1>
) : (
  !venue.length > 0 && !vehicle.length > 0 && !catering.length > 0 ? (
    <h1 className='text-3xl text-gray-600 text-center py-20 font-semibold'>No Services Found</h1>
  ) : null
)}


</div>
    </>
  )
}
