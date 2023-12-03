import React, { useEffect, useState } from "react";
import {
  useOrderCancelMutation,
  useOrderDetailMutation,
} from "../../Redux/user/userApiSlice";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toastError, toastSuccess } from "../toast";
import Swal from "sweetalert2";


export default function Orders() {
  const [orderDetail] = useOrderDetailMutation();
  const [orderCancel] = useOrderCancelMutation();
  const userData = useSelector((state) => state.rootReducer.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh,setRefresh] = useState(false);
  const handleRemove = async (itemId, service) => {
    Swal.fire({
      title: "Are you sure you want to cancel this order?",
      html:"Please note that canceling this order will affect other orders created at the same time. You may need to re-order if necessary.",
      showDenyButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#dd1607", 
      denyButtonColor: "#357F65", 
      input: "text",
      inputPlaceholder: "Enter your Registered Gpay number",
      inputAttributes: {
      autocapitalize: "off",
  },
  inputValidator: (value) => {
    if (!/^\d{10}$/.test(value)) {
      return "Please enter a valid 10-digit number";
    }
  },
  preConfirm: (GpayNumber) => {

    // Validate or process the inputs if needed
    return { GpayNumber };
  },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { GpayNumber } = result.value;

        try {
          const res = await orderCancel({itemId, GpayNumber})
          if (res.data.status === 200) {
           toastSuccess("order cancelled successfully")
            setRefresh(!refresh)
          } else {
            toastError("Error cancelling item. Please try again.");
          }
        } catch (error) {
          toastError("An unexpected error occurred. Please try again later.");
        }
      } else if (result.isDenied) {
       
      }
    });
  };
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userId = userData._id;
      const res = await orderDetail({ userId });
      if (res.data.status === 200) {
        const Data = res.data.combinedOrders;
        setData(Data);
      } else {
        toastError("internal server error...");
      }
      setLoading(false);
    };
    fetchData();
  }, [orderDetail, userData._id,refresh]);

  return (
    <>
      <div className="">
        <div className="relative  flex flex-col mb-12 mx-auto  ">
          <div className="flex flex-wrap items-center">
            <div className="relatve w-full px-4 max-w-full">
              <h3 className="font-semibold text-2xl p-2 m-4">Orders</h3>
            </div>
          </div>

          {loading ? ( // Check loading state
            <div className="h-screen w-full">
              <h1 className="text-3xl font-semibold text-gray-500 py-20 text-center">
                Loading...
              </h1>
            </div>
          ) : data && (data.Venues.length > 0 || data.Vehicle.length > 0 || data.Catering.length > 0) ? (
            <>
              <div className="border border-black ">
                <div className="block bg-transparent m-4 p-2 w-11/12 mx-auto overflow-x-auto  ">
                  <table className="">
                    <thead className="">
                      <tr className="border border-solid border-transparent border-1-0 bottom-0 ">
                        <th className="text-md pr-5 py-3">Booking ID</th>
                        <th className="text-md px-5 py-3">Image</th>
                        <th className="text-md px-5 py-3">Name</th>
                        <th className="text-md px-5 py-3">Order Date</th>
                        <th className="text-md px-5 py-3">Booking Date</th>
                        <th className="text-md px-10 py-3 ">Status</th>
                        <th className="text-md px-5 py-3">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.Venues.map((order, index) => (
                        <tr className="" key={index}>
                          <td className="text-md  py-3">
                            <p className="font-bold">#{order.bookingId}</p>
                          </td>

                          <td className="text-md text-center  py-3">
                            {order.venues[0].image.length > 0 && (
                              <img
                                src={`/Pictures/${order.venues[0].image[0]}`}
                                alt=""
                                style={{ height: "5rem", width: "10rem" }}
                              />
                            )}
                          </td>

                          <td className="text-md text-center px-3 py-3">
                            {order.venues.map((venue, vIndex) => (
                              <span className="mx-6" key={vIndex}>
                                {venue.name}
                              </span>
                            ))}
                          </td>

                          <td className="text-md text-center px-5 py-3">
                            <p>
                              {new Date(order.orderdate).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </td>

                          <td className="text-md text-center px-5 py-3">
                          {order.venues.map((venue, vIndex) => (
                            <p key={vIndex}>
                              {venue.bookedDates.map((date, dIndex) => (
                                <span key={dIndex}>
                                  {new Date(date).toLocaleDateString("en-GB")}
                                  <br />
                                </span>
                              ))}
                            </p>
                               ))}
                          </td>

                          <td className="px-10 text-center">{order.orderStatus}</td>

                          <td className="text-md text-center px-8 py-3 cursor-pointer">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-gray-800 hover:text-red-500"
                              onClick={() => handleRemove(order._id, "venues")}
                            />
                          </td>
                        </tr>
                      ))}

                      {data.Vehicle.map((order, index) => (
                        <tr className="" key={index}>
                          <td className="text-md  py-3">
                            <p className="font-bold">#{order.bookingId}</p>
                          </td>

                          <td className="text-md text-center  py-3">
                            {order.Vehicle[0].image.length > 0 && (
                              <img
                                src={`/Pictures/${order.Vehicle[0].image[0]}`}
                                alt=""
                                style={{ height: "5rem", width: "10rem" }}
                              />
                            )}
                          </td>

                          <td className="text-md text-center px-3 py-3">
                            {order.Vehicle.map((vehicle, vIndex) => (
                              <span className="mx-6" key={vIndex}>
                                {vehicle.name}
                              </span>
                            ))}
                          </td>

                          <td className="text-md text-center px-5 py-3">
                            <p>
                              {new Date(order.orderdate).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </td>

                          <td className="text-md text-center px-5 py-3">
                            <p>
                            {order.Vehicle.map((vehicle, vIndex) => (
                              <p>
                              {new Date(vehicle.bookedDates).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                            ))}
                            </p>
                          </td>

                          <td className="px-10 text-center">{order.orderStatus}</td>

                          <td className="text-md text-center px-8 py-3 cursor-pointer">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-gray-800 hover:text-red-500"
                              onClick={() => handleRemove(order._id, "venues")}
                            />
                          </td>
                        </tr>
                      ))}

                      {data.Catering.map((order, index) => (
                        <tr className="" key={index}>
                          <td className="text-md  py-3">
                            <p className="font-bold">#{order.bookingId}</p>
                          </td>

                          <td className="text-md text-center py-3">
                            {order.Catering[0].image.length > 0 && (
                              <img
                                src={`/Pictures/${order.Catering[0].image[0]}`}
                                alt=""
                                style={{ height: "5rem", width: "10rem" }}
                              />
                            )}
                          </td>

                          <td className="text-md text-center px-3 py-3">
                            {order.Catering.map((catering, vIndex) => (
                              <span className="mx-6" key={vIndex}>
                                {catering.name}
                              </span>
                            ))}
                          </td>

                          <td className="text-md text-center px-5 py-3">
                            <p>
                              {new Date(order.orderdate).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </td>

                          <td className="text-md text-center px-5 py-3">
                            <p>
                            {order.Catering.map((catering, vIndex) => (
                              <p>
                              {new Date(catering.bookedDates).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                            ))}
                            </p>
                          </td>

                          <td className="px-10 text-center">{order.orderStatus}</td>

                          <td className="text-md text-center px-8 py-3 cursor-pointer">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-gray-800 hover:text-red-500"
                              onClick={() => handleRemove(order._id, "venues")}
                            />
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
    </>
  );
}
