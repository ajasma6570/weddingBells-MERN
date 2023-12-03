import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useViewOrderDetailsMutation } from "../../Redux/Admin/adminApiSlice";
import { toastError } from "../toast";


export default function AdminOrderView() {
  const { userId } = useParams();
  const [orderDetail] = useViewOrderDetailsMutation();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await orderDetail({ userId });
      if (res.data.status === 200) {
        const cartData = res.data.orderDetails;
        console.log(cartData);
        setCart(cartData);
      } else {
        toastError("internal server error...");
      }
      setLoading(false);
    };
    fetchData();
  }, [orderDetail, userId]);

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
                  <select className="bg-grey-500 rounded-md">
                    <option value="Processing">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancelled">Cancelled by admin</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="border border-black ">
                <div className="block bg-transparent m-4 p-2 w-11/12 mx-auto overflow-x-auto ">
                  <table className="">
                    <thead className="">
                      <tr className="border border-solid border-transparent border-1-0 bottom-0 ">
                        <th className="text-md px-5 py-3   ">Image</th>
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
