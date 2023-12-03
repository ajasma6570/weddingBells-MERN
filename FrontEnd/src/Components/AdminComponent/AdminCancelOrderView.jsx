import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChangeCancelOrderStatusMutation, useViewOrderDetailsMutation } from "../../Redux/Admin/adminApiSlice";
import { toastError, toastSuccess } from "../toast";
import Swal from 'sweetalert2';


export default function AdminCancelOrderView() {
  const { userId } = useParams();
  const [orderDetail] = useViewOrderDetailsMutation();
  const [changeCancelOrderStatus] = useChangeCancelOrderStatusMutation();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh,setRefresh] = useState(false);


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
      input: "text",
      inputPlaceholder: "Enter Transaction Id  ",
      inputAttributes: {
      autocapitalize: "off",
  },
  inputValidator: (value) => {
    if (!value) {
      return "Please enter the Transaction Id";
    }
  },
  preConfirm: (refId) => {

    // Validate or process the inputs if needed
    return { refId };
  },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { refId } = result.value;
        console.log(itemId, selectedValue, refId)
        try {
         const res = await changeCancelOrderStatus({itemId,selectedValue,refId})
         if(res.data.success){
          toastSuccess("Status changed and RefId updated successfully")
          setRefresh(!refresh);
         }
        } catch (error) {
          toastError("An unexpected error occurred. Please try again later.");
        }
      } else if (result.isDenied) {
       
      }
    });
  };

  const statusOptions = [
    { label: 'Processing', value: 'Processing' },
    { label: 'Refund Completed', value: 'Refund Completed' },
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
                  <span>Gpay Number : {cart.GpayNumber}</span>
                  <br/><span>Refund status : </span>
                <select className="bg-grey-500 rounded-md my-5" onChange={handleStatusChange} value={cart.cancelPaymentStatus}>
                  <option disabled> {cart.cancelPaymentStatus} </option>
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
