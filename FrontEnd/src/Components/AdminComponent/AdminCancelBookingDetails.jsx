import React, { useEffect, useState } from "react";
import { useGetCancelOrderUserDetailsMutation} from '../../Redux/Admin/adminApiSlice'
import { useSelector } from "react-redux";
import { toastError } from "../toast";
import { Link,Routes, Route, } from 'react-router-dom';
import AdminOrderView from "./AdminOrderView";

export default function AdminCancelBookingDetails() {
    
  const [OrderCancelUserDetails] = useGetCancelOrderUserDetailsMutation()
  const userData = useSelector((state) => state.rootReducer.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await OrderCancelUserDetails();
      if (res.data.status === 200) {
        const Data = res.data.userData;
        setData(Data);
      } else {
        toastError("internal server error...");
      }
      setLoading(false);
    };
    fetchData();
  }, [OrderCancelUserDetails, userData._id]);

  return (
    <>
    <div className="">
        <div className="relative  flex flex-col mb-12 mx-auto  ">
          <div className="flex flex-wrap items-center">
            <div className="relatve w-full px-4 max-w-full">
              <h3 className="font-semibold text-2xl p-2 m-4">Cancel Bookings</h3>
            </div>
          </div>

          {loading ? ( // Check loading state
            <div className="h-screen w-full">
              <h1 className="text-3xl font-semibold text-gray-500 py-20 text-center">
                Loading...
              </h1>
            </div>
          ) : data ? (
            <>
    <div className="border border-black ">
                <div className="block bg-transparent m-4 p-2 w-11/12 mx-auto overflow-x-auto  ">
                  <table className="">
                    <thead className="">
                      <tr className="border border-solid border-transparent border-1-0 bottom-0 ">

                        <th className="text-md pr-5 py-3">Booking ID</th>
                        <th className="text-md px-5 py-3">Name</th>
                        <th className="text-md px-5 py-3">Phone number</th>
                        <th className="text-md px-5 py-3">Status</th>
                        <th className="text-md px-5 py-3">Order Date</th>
                        <th className="text-md px-10 py-3 ">Refund Status</th>
                        <th className="text-md px-10 py-3 ">Action</th>
                
                      </tr>
                    </thead>

                    <tbody>
                    {data.map((order, index) => (
                        <tr className="" >
                          <td className="text-md  py-3">
                            <p className="font-bold">#{order.bookingId}</p>
                          </td>
                         

                          <td className="text-md text-center py-3">
                            {order.userId.name}
                          </td>

                          <td className="text-md text-center px-3 py-3">
                           
                              <span className="mx-6">
                              {order.userId.phone}
                              </span>
                          
                          </td>
                         
                         
                          <td className="text-md text-center px-5 py-3">
                          <td className="px-10 text-center">{order.status}</td>
                          </td>

                          <td className="text-md text-center px-5 py-3">
                          <p>
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </td>

                          <td className="px-10 text-center">{order.cancelPaymentStatus}</td>

                          <td className="px-10 text-center underline text-blue-700 cursor-pointer">
                            
                            <Link to={`viewCancelOrderDetails/${order._id}`}>view Details</Link>
                            </td>
                        </tr>
                        ))}        
                    </tbody>
                  </table>
                  
                </div>
              </div>
        </>
        ) : (
          <div className="h-screen w-full">
            <h1 className="text-3xl font-semibold text-gray-500 py-20 text-center">
              No records found
            </h1>
          </div>
        )}
      </div>
    </div>
        <Routes>
          <Route path="viewCancelOrderDetails" element={<AdminOrderView/>} />
        </Routes>
    </>
  )
  
}
