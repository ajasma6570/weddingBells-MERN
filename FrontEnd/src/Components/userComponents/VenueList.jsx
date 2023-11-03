import React, { useEffect, useState } from 'react';
import { useVenueListsMutation } from '../../Redux/user/userApiSlice';
import { Link } from 'react-router-dom';

export default function VenueList() {
  const [venueLists] = useVenueListsMutation();
  const [venueList, setVenueList] = useState([]);
  const [search,setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("lowToHigh")
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      const res = await venueLists();
      const venue = res.data.venueLists;
      setVenueList(venue);
      setLoading(false); 
    };
    fetchData();
  }, [venueLists]);

  return (
    <>
      <div className='h-fill bg-gradient-to-br from-white to-gray-400'>
        <div>
          <h1 className='text-3xl font-bold pl-10 p-5 py-3'>Venue</h1>

          <div className='flex justify-between py-3 px-10'>
            {/* <div>
              <span>Filter: </span>
              <input className="border border-black rounded-md" type='text' placeholder="enter search.." />
            </div> */}
            <div>
              <span className='xxs:text-xs xs:text-sm sm:text-md md:text-lg lg:text-2xl'>Search : </span>
              <input className=" rounded-md px-2 xxs:w-16 xs:w-20 sm:w-24 md:w-36 lg:w-48 " type='text' placeholder="search..." 
              onChange={(e)=>setSearch(e.target.value)}
              />
            </div>
            <div>
              <span className='xxs:text-xs xs:text-sm sm:text-md md:text-lg lg:text-2xl'>Sort By Price : </span>
              <select className=" rounded-md xxs:text-xs xxs:w-24 xs:tw-24 sm:w-28 md:w-36 lg:w-48 xs:text-sm sm:text-md md:text-lg lg:text-2xl" 
               value={sortOrder}
               onChange={(e) => setSortOrder(e.target.value)}
              >
                    <option className='xxs:text-xs xs:text-sm sm:text-md md:text-lg lg:text-2xl' value="lowToHigh">Low to High</option>
                    <option className='xxs:text-xs xs:text-sm sm:text-md md:text-lg lg:text-2xl' value="HighTOlow">High to Low</option>
                </select>
            </div>
          </div>


          {loading ? (
        <div className='h-screen flex flex-col justify-center items-center ' >
          <div className="animate-spin h-24 w-24">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M96 256c0-26.5-21.5-48-48-48S0 229.5 0 256s21.5 48 48 48S96 282.5 96 256zM108.9 60.89c-26.5 0-48.01 21.49-48.01 47.99S82.39 156.9 108.9 156.9s47.99-21.51 47.99-48.01S135.4 60.89 108.9 60.89zM108.9 355.1c-26.5 0-48.01 21.51-48.01 48.01S82.39 451.1 108.9 451.1s47.99-21.49 47.99-47.99S135.4 355.1 108.9 355.1zM256 416c-26.5 0-48 21.5-48 48S229.5 512 256 512s48-21.5 48-48S282.5 416 256 416zM464 208C437.5 208 416 229.5 416 256s21.5 48 48 48S512 282.5 512 256S490.5 208 464 208zM403.1 355.1c-26.5 0-47.99 21.51-47.99 48.01S376.6 451.1 403.1 451.1s48.01-21.49 48.01-47.99S429.6 355.1 403.1 355.1zM256 0C229.5 0 208 21.5 208 48S229.5 96 256 96s48-21.5 48-48S282.5 0 256 0z"/></svg>

          </div>
        <h1 className='text-3xl font-bold text-center text-gray-500 px-20 py-4'>Loading....</h1>
      </div>
      
          ) : venueList.length <= 0 ? ( 
            <div className=''>
              <h1 className="text-4xl text-gray-600 font-semibold text-center py-28">No venues Found</h1>
              </div>
        
          ) : ( 
            venueList.filter((item) => {
              return search.toLowerCase() === "" ?
              item : item.name.toLowerCase().includes(search.toLowerCase()) || item.city.toLowerCase().includes(search.toLowerCase()) || item.capacity.toString().includes(search)
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
                  <h1 className=' xxs:text-xs xs:text-sm sm:text-md md:text-lg lg:text-2xl font-semibold'>{venue.name}</h1>
                  <p className='text-gray-500 xxs:text-xs xs:text-sm sm:text-md md:text-md lg:text-xl'>{venue.city}, kerala</p>
                  <p className='text-gray-500 xxs:text-xs xs:text-sm sm:text-md md:text-md lg:text-xl'>Capacity: {venue.capacity}</p>
                  <p className='xxs:text-xs xs:text-sm sm:text-md md:text-base lg:text-xl'>{venue.description}</p>
                  <p className='text-gray-500 xxs:text-xs xs:text-sm sm:text-md md:text-md lg:text-xl'>From ₹{venue.amount} <small> per day</small></p>
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
