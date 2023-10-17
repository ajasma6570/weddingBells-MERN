import React, { useEffect, useState } from 'react'
import { useVehicleListsMutation } from '../../Redux/user/userApiSlice';
import { Link } from 'react-router-dom';

export default function Vehiclelist() {

  const [VehicleLists] = useVehicleListsMutation()
  const [vehicleList,setVeicleList] = useState([])
  const [search,setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("lowToHigh")

  useEffect(() => {
    const fetchData = async () => {
      const res = await VehicleLists();
      const vehicle = res.data.vehicleLists;
      setVeicleList(vehicle);
    };
    fetchData();
  }, [VehicleLists]);

  return (
    <div className='h-fill '>
    <div>
        <h1 className='text-3xl font-bold pl-10 p-5 py-3'>Vehicle</h1>

        <div className='flex justify-around py-3'>
            {/* <div>
                <span >Filter : </span>
                <input className="border border-black rounded-md" type='text' placeholder="enter search.."/>
            </div> */}
             <div>
              <span>Search : </span>
              <input className="border border-black rounded-md px-5" type='text' placeholder="enter search.." 
              onChange={(e)=>setSearch(e.target.value)}
              />
            </div>
            <div>
              <span>Sort By Price : </span>
              <select className="border border-black rounded-md" 
               value={sortOrder}
               onChange={(e) => setSortOrder(e.target.value)}
              >
                    <option value="lowToHigh">Low to High</option>
                    <option value="HighTOlow">High to Low</option>
                </select>
            </div>
        </div>
        


        {vehicleList.length <= 0 ? ( 
            <div className=''>
              <h1 className="text-4xl text-gray-600 font-semibold text-center py-28">No vehicles Found</h1>
              </div>
        
          ) : ( 
            vehicleList.filter((item) => {
              return search.toLowerCase() === "" ?
              item : item.name.toLowerCase().includes(search) || item.city.toLowerCase().includes(search) 
            }).sort((venueA, venueB) => {
              if (sortOrder === 'lowToHigh') {
                return venueA.rentAmount - venueB.rentAmount;
              } else {
                return venueB.rentAmount - venueA.rentAmount;
              }
            }).map((vehicle, index) => (
              <Link to={`vehicleDetail/${vehicle._id}`}>
              <div className="flex justify-between p-10 gap-8 cursor-pointer" key={index}>
              <div className="bg-black h-64 w-3/6 relative">
                <img
                  src={`/Pictures/${vehicle.image[0]}`}
                  alt="Vehicle"
                  className="w-full h-full object-cover"
                />
              </div>
                <div className="w-6/12">
                  <h1 className='text-xl font-semibold'>{vehicle.name}</h1>
                  <p className='text-gray-600'>{vehicle.city},kerala</p>
                  <p className='text-gray-600'>seat Capacity : {vehicle.seatCapacity}</p>
                  <p>{vehicle.description}</p>
                  <p className='text-gray-600'>Rent Amount:  ₹{vehicle.rentAmount} <small> per day</small></p>
                  <p className='text-gray-600'>Free Kilometers : {vehicle.freeKilometer}<small>kms</small></p>
                  <p className='text-gray-600'>Extra Kiolmeters : ₹{vehicle.extraKilometerAmount}<small> per km</small></p>
                </div>
              </div>
              </Link>
            ))
          )}

    </div>
</div>
  )
}
