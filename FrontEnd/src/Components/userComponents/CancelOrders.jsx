import React, { useEffect, useState } from "react";
import {
    useGetCancelOrdersMutation,
  useOrderCancelMutation
} from "../../Redux/user/userApiSlice";
import { useSelector } from "react-redux";
import { toastError, toastSuccess } from "../toast";
import Swal from "sweetalert2";


export default function CancelOrders() {
  const [orderCancel] = useGetCancelOrdersMutation();
  const userData = useSelector((state) => state.rootReducer.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh,setRefresh] = useState(false);
  
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userId = userData._id;
      console.log("frntend start canecl");
      console.log(userId);
      const res = await orderCancel({ userId });
      console.log(res.data.cancelOrders);
      if (res.data.status === 200) {
        const Data = res.data.cancelOrders;
        setData(Data);
      } else {
        toastError("internal server error...");
      }
      setLoading(false);
    };
    fetchData();
  }, [orderCancel, userData._id,refresh]);

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
                        <th className="text-md px-5 py-3">Cancelled Date</th>
                        <th className="text-md px-10 py-3 ">Status</th>
                        <th className="text-md px-10 py-3 ">Payment Status</th>
                       
                      </tr>
                    </thead>

                    <tbody>
                      {data.Venues.map((order, index) => (
                        <tr className="" key={index}>
                          <td className="text-md  py-3">
                            <p className="font-bold">#{order.bookingId}</p>
                          </td>

                          <td className="text-md text-center py-3">
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
                            <p>
                              {new Date(order.updateDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </td>

                          <td className="px-10 text-center">{order.isCancelled}</td>

                          <td className="px-10 text-center">{order.cancelPaymentStatus}</td>
                        </tr>
                      ))}

                      {data.Vehicle.map((order, index) => (
                        <tr className="" key={index}>
                          <td className="text-md  py-3">
                            <p className="font-bold">#{order.bookingId}</p>
                          </td>

                          <td className="text-md text-center py-3">
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
                              {new Date(order.updateDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </td>

                          <td className="px-10 text-center">{order.isCancelled? "Order Cancelled" : ""}</td>

                          <td className="px-10 text-center">{order.cancelPaymentStatus === "Processing"? order.cancelPaymentStatus : ` ${order.cancelPaymentStatus } REF ID :` }</td>

                        </tr>
                      ))}

                      {data.Catering.map((order, index) => (
                        <tr className="" key={index}>
                          <td className="text-md py-3">
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
                              {new Date(order.updateDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </td>

                          <td className="px-10 text-center">{order.orderStatus}</td>
                          <td className="px-10 text-center">{order.cancelPaymentStatus}</td>

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
