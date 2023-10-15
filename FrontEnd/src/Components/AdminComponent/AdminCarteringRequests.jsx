import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useAdminCateringRequestHandleMutation, useAdminCateringRequestListMutation } from '../../Redux/Admin/adminApiSlice';
import { toastError, toastSuccess } from '../toast';


export default function AdminCarteringRequests() {

  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [statusChange,setStatusChange] = useState(false)

  const [AdminCarteringRequests] = useAdminCateringRequestListMutation()
  const [AdminCateringRequestHandle] = useAdminCateringRequestHandleMutation()
  const handleSelect = (index) => {
    setSelectedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((prevIndex) => prevIndex !== index)
        : [...prevIndexes, index]
    );
  };

  const handleRequest = async(id,value) =>{
    const res =  await AdminCateringRequestHandle({id, value})
      if(res.data.status === 200){
        toastSuccess(res.data.message)
        setStatusChange(!statusChange)
      }else{
        toastError(res.data.message)
      }
  }

  useEffect(()=>{
    const fetchData = async() => {
      setLoading(true); 
      const res = await AdminCarteringRequests()
        if(res.data.status === 200){
          setData(res.data.cateringRequestList)
        }else{
          toastError(res.data.message)
        }
        setLoading(false); 
    }

    fetchData()
  },[AdminCarteringRequests,statusChange])

  const handleView = (id) =>{
    console.log(id);
  }



  // const handleReject = (id) =>{
  //   console.log(id);
  // }

  return (
    <>
        {/* Catering Request Table */}
<div className='block bg-transparent m-4 p-2 overflow-x-auto shadow-stone-600 shadow-lg h-screen'>
        <h1 className='text-xl font-semibold text-gray-800'>Catering Requests</h1>
        <table>
            <thead>
                <tr className='border border-stone border-1-0 bottom-0'>
                    <th className='text-md px-5 py-3'>SL:No</th>
                    <th className='text-md px-10 py-3'>Name</th>
                    <th className='text-md px-10 py-3'>City</th>
                    <th className='text-md px-10 py-3'>Phone</th>
                    <th className='text-md px-10 py-3'>Min Amount</th>
                    <th className='text-md px-10 py-3'>Max Amount</th>
                    <th className='text-md px-10 py-3'>Created Date</th>
                    <th className='text-md px-10 py-3'>Action</th>
                </tr>
            </thead>
            <tbody>
            
            {loading ? ( // Check loading state
              <tr>
                <td colSpan="8" className="text-center">
                  <h1 className="text-3xl py-10 font-semibold text-gray-400">Loading...</h1>
                </td>
              </tr>
            ) : 
            data.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <h1 className='text-3xl py-10 font-semibold text-gray-400'>No User Found</h1>
                </td>
              </tr>
            ) : (
            data.map((obj, index)=>(
                <tr>
                <td className='text-md pl-8 py-3'>{index+1}</td>
                <td className='text-md pl-8 py-3'>{obj.name}</td>
                <td className='text-md pl-4 py-3'>{obj.city}</td>
                <td className='text-md pl-5 py-3'>{obj.phone}</td>
                <td className='text-md pl-16 py-3'>{obj.minAmount}</td>
                <td className='text-md pl-11 py-3'>{obj.maxAmount}</td>
                <td className="text-md pl-8 py-3">{`${new Date(obj.createdAt).getDate().toString().padStart(2, '0')}/${(new Date(obj.createdAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(obj.createdAt).getFullYear()}`}</td>
                <td className='text-md pl-8 py-3'>
                <div class="relative inline-block text-left">
                  <div>
                    <button
                      class="inline-flex justify-center w-full px-4 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-500 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      onClick={() => handleSelect(index)}
                    >
                      Select
                      <svg
                        class="w-5 h-5 ml-2 -mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  {selectedIndexes.includes(index) && (
                    <div class="absolute right-0 w-36 mt-2 origin-top-right bg-gray-100 border border-gray-400 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                      <div
                        class=""
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <Link class="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 rounded-md"
                         onClick={()=>handleView(obj._id)}
                        >
                          View
                        </Link>
                        <hr className="bg-gray-400 h-1" />
                        <Link class="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 rounded-md"
                         data-action="accept" 
                         onClick={(e)=>handleRequest(obj._id, e.target.dataset.action)}
                        >
                          Accept
                        </Link>
                        <hr className="bg-gray-400 h-1" />
                        <Link class="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 rounded-md"
                        data-action="reject" 
                        onClick={(e)=>handleRequest(obj._id, e.target.dataset.action)}
                        >
                          Reject
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                    
                    </td> 
                </tr>
                  ))
            )}
            </tbody>
        </table>
    </div>

{/* Catering Request Table END*/}
    </>
  )
}
