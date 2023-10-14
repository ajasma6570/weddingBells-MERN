import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminVehicleRequests() {
  const [isSelect, setIsSelect] = useState(false);

  const handleSelect = () => {
    setIsSelect(!isSelect);
  };

  return (
    <>
      {/* Vehicles Request Table END*/}
      <div className="block bg-transparent m-4 p-2 overflow-x-auto shadow-stone-600 shadow-lg h-screen">
        <h1 className="text-xl font-semibold text-gray-800">
          Vehicle Requests
        </h1>
        <table>
          <thead>
            <tr className="border border-stone border-1-0 bottom-0">
              <th className="text-md px-5 py-3">SL:No</th>
              <th className="text-md px-10 py-3">Name</th>
              <th className="text-md px-10 py-3">Phone</th>
              <th className="text-md px-10 py-3">Seat</th>
              <th className="text-md px-10 py-3">Model</th>
              <th className="text-md px-10 py-3">Amount</th>
              <th className="text-md px-10 py-3">Created Date</th>
              <th className="text-md px-10 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-md pl-8 py-3">1</td>
              <td className="text-md pl-8 py-3">NBF Hall</td>
              <td className="text-md pl-5 py-3">88916454560</td>
              <td className="text-md pl-12 py-3">7</td>
              <td className="text-md pl-12 py-3">2010</td>
              <td className="text-md pl-12 py-3">4999</td>
              <td className="text-md pl-11 py-3">october/10/2023</td>
              <td className="text-md pl-8 py-3">
                <div class="relative inline-block text-left">
                  <div>
                    <button
                      class="inline-flex justify-center w-full px-4 py-1 text-sm font-medium text-gray-700 bg-gray-300 border border-gray-500 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      onClick={handleSelect}
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
                  {isSelect && (
                    <div class="absolute right-0 w-36 mt-2 origin-top-right bg-gray-300 border border-gray-400 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                      <div
                        class=""
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <Link class="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md">
                          View
                        </Link>
                        <hr className="bg-gray-400 h-1" />
                        <Link class="block px-4 py-2 text-sm text-gray-700 font-semibold hover:bg-gray-100 rounded-md">
                          Accept
                        </Link>
                        <hr className="bg-gray-400 h-1" />
                        <Link class="block px-4 py-2 text-sm text-gray-700 font-semibold hover:bg-gray-100 rounded-md">
                          Reject
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Vehicles Request Table END*/}
    </>
  );
}
