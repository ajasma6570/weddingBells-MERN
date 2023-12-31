import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChangeOrderStatusMutation, useViewOrderDetailsMutation } from "../../Redux/Admin/adminApiSlice";
import { toastError, toastSuccess } from "../toast";
import Swal from 'sweetalert2';

export default function AdminOrderView() {
  const { userId } = useParams();
  const [orderDetail] = useViewOrderDetailsMutation();
  const [changeOrderStatus] = useChangeOrderStatusMutation();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await orderDetail({ userId });
      if (res.data.status === 200) {
        const cartData = res.data.orderDetails;
        setCart(cartData);
      } else {
        toastError("internal server error...");
      }
      setLoading(false);
    };
    fetchData();
  }, [orderDetail, userId,refresh]);

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    const itemId = cart._id
    Swal.fire({
      title: `Are you sure you want to change the status to ${selectedValue}?"`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#dd1607", 
      denyButtonColor: "#357F65", 
  }
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
       const res = await changeOrderStatus({itemId,selectedValue})
        if(res.data.success){
          toastSuccess("Status updated successfully")
          if(selectedValue ==="Cancelled by admin"){
            navigate('/admin/dash/booking')
          }
          setRefresh(!refresh);
        }else{
          toastError("An unexpected error occurred. Please try again later.");
        }
         
        } catch (error) {
          toastError("An unexpected error occurred. Please try again later.");
        }
      } else if (result.isDenied) {
       
      }
    });


  };

  const statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Processing', value: 'Processing' },
    { label: 'Cancelled by admin', value: 'Cancelled by admin' },
    { label: 'Completed', value: 'Completed' },
  ];
  
  return (
    <>
      <div className="">
        <div className="relative w-11/12 flex flex-col mb-12 mx-auto  ">
          <div className="flex flex-wrap items-center">
            <div className="relatve w-full px-4 max-w-full">
              <h3 className="font-semibold text-2xl p-2 m-4">Order Details</h3>
            </div>
          </div>

          {loading ? ( // Check loading state
            <div className="h-screen w-full">
              <h1 className="text-3xl font-semibold text-gray-500 py-20 text-center">
                Loading...
              </h1>
            </div>
          ) : cart ? (
            <>
              <div className="flex justify-between mb-5">
                <div>
                  <span>Booking Id : #{cart.bookingId}</span>

                  <>
                    <br />
                    <span>Name : {cart.userId.name}</span>
                    <br />
                    <span>E-mail : {cart.userId.email}</span>
                    <br />
                    <span>Phone : {cart.userId.phone}</span>
                    <br />
                    <span>city : {cart.userId.city}</span>
                    <br />
                    <span>address : {cart.userId.address}</span>
                    <br />
                    <span>pin : {cart.userId.pincode}</span>
                  </>
                </div>

                <div>
                  <span>Status : </span>
                  <select className="bg-grey-500 rounded-md" onChange={handleStatusChange} value={cart.status}>
                  <option disabled> {cart.status} </option>
                  {statusOptions.map((option) => (
                    cart.status !== option.value && (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    )
                  ))}
                  </select>
                </div>
              </div>
              <div className="border border-black ">
                <div className="block bg-transparent m-4 p-2 w-11/12 mx-auto overflow-x-auto ">
                  <table className="">
                    <thead className="">
                      <tr className="border border-solid border-transparent border-1-0 bottom-0 ">
                        <th className="text-md px-5 py-3 ">Image</th>
                        <th className="text-md px-5 py-3 ">Name</th>
                        <th className="text-md px-5 py-3 ">Place</th>
                        <th className="text-md px-5 py-3  ">Booking Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cart.venues.map((order, index) => (
                        <>
                          <tr className="" key={index}>
                            <td className="text-md text-center py-5">
                              <img
                                src={`/Pictures/${order.venueId.image[0]}`}
                                alt=""
                                style={{ height: "5rem", width: "10rem" }}
                              />
                            </td>
                            <td className="text-md text-center px-20 py-5">
                              {order.venueId.name}
                            </td>
                            <td className="text-md text-center py-5">
                              {order.venueId.city}
                            </td>
                            <td className="text-md text-center px-20 py-5">
                              <p>
                                {order.bookedDates.map((date, vIndex) => (
                                  <p>
                                    {new Date(date).toLocaleDateString("en-GB")}
                                  </p>
                                ))}
                              </p>
                            </td>
                          </tr>
                        </>
                      ))}

                      {cart.Vehicle.map((order, index) => (
                        <>
                          <tr className="" key={index}>
                            <td className="text-md text-center py-5">
                              <img
                                src={`/Pictures/${order.vehicleId.image[0]}`}
                                alt=""
                                style={{ height: "5rem", width: "10rem" }}
                              />
                            </td>
                            <td className="text-md text-center px-20 py-5">
                              {order.vehicleId.name}
                            </td>
                            <td className="text-md text-center py-5">
                              {order.vehicleId.city}
                            </td>
                            <td className="text-md text-center px-20 py-5">
                              <p>
                                {order.bookedDates.map((date, vIndex) => (
                                  <p>
                                    {new Date(date).toLocaleDateString("en-GB")}
                                  </p>
                                ))}
                              </p>
                            </td>
                          </tr>
                        </>
                      ))}

                      {cart.Catering.map((order, index) => (
                        <>
                          <tr className="" key={index}>
                            <td className="text-md text-center py-5 ">
                              <img
                                src={`/Pictures/${order.cateringId.image[0]}`}
                                alt=""
                                style={{ height: "5rem", width: "10rem" }}
                              />
                            </td>
                            <td className="text-md text-center px-20 py-5">
                              {order.cateringId.name}
                            </td>
                            <td className="text-md text-center py-5">
                              {order.cateringId.city}
                            </td>
                            <td className="text-md text-center px-20 py-5">
                              <p>
                                {order.bookedDates.map((date, vIndex) => (
                                  <p>
                                    {new Date(date).toLocaleDateString("en-GB")}
                                  </p>
                                ))}
                              </p>
                            </td>
                          </tr>
                        </>
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
    </>
  );
}
