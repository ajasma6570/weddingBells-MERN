import React, { useEffect, useState } from 'react';
import { useVenueListsMutation } from '../../Redux/user/userApiSlice';
import { Link } from 'react-router-dom';

export default function VenueList() {
  const [venueLists] = useVenueListsMutation();
  const [venueList, setVenueList] = useState([]);
  const [search,setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("lowToHigh")

  useEffect(() => {
    const fetchData = async () => {
      const res = await venueLists();
      const venue = res.data.venueLists;
      setVenueList(venue);
    };
    fetchData();
  }, [venueLists]);

  return (
    <>
      <div className='h-fill'>
        <div>
          <h1 className='text-3xl font-bold pl-10 p-5 py-3'>Venue</h1>

          <div className='flex justify-around py-3'>
            {/* <div>
              <span>Filter: </span>
              <input className="border border-black rounded-md" type='text' placeholder="enter search.." />
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

          {venueList.length <= 0 ? ( 
            <div className=''>
              <h1 className="text-4xl text-gray-600 font-semibold text-center py-28">No venues Found</h1>
              </div>
        
          ) : ( 
            venueList.filter((item) => {
              return search.toLowerCase() === "" ?
              item : item.name.toLowerCase().includes(search) || item.city.toLowerCase().includes(search) || item.capacity.toString().includes(search)
            }).sort((venueA, venueB) => {
              if (sortOrder === 'lowToHigh') {
                return venueA.amount - venueB.amount;
              } else {
                return venueB.amount - venueA.amount;
              }
            }).map((venue, index) => (
              <Link to={`venueDetail/${venue._id}`}>
              <div className="flex justify-between p-10 gap-8 cursor-pointer" key={index}>
              <div className="bg-black h-64 w-3/6 relative">
                    <img
                      src={`/Pictures/${venue.image[0]}`}
                      alt="Vehicle"
                      className="w-full h-full object-cover"
                    />
                  </div>
                <div className="w-6/12">
                  <h1 className='text-xl font-semibold'>{venue.name}</h1>
                  <p className='text-gray-500'>{venue.city}, kerala</p>
                  <p className='text-gray-500'>Capacity: {venue.capacity}</p>
                  <p>{venue.description}</p>
                  <p className='text-gray-500'>From ₹{venue.amount} <small> per day</small></p>
                </div>
              </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
