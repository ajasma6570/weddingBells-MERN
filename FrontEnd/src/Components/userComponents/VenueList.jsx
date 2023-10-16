import React, { useEffect, useState } from 'react';
import { useVenueListsMutation } from '../../Redux/user/userApiSlice';
import { Link } from 'react-router-dom';

export default function VenueList() {
  const [venueLists] = useVenueListsMutation();
  const [venueList, setVenueList] = useState([]);

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
            <div>
              <span>Filter: </span>
              <input className="border border-black rounded-md" type='text' placeholder="enter search.." />
            </div>
            <div>
              <span>Search: </span>
              <input className="border border-black rounded-md" type='text' placeholder="enter search.." />
            </div>
            <div>
              <span>SortBy: </span>
              <input className="border border-black rounded-md" type='text' placeholder="enter search.." />
            </div>
          </div>

          {venueList.length <= 0 ? ( 
            <div className=''>
              <h1 className="text-4xl text-gray-600 font-semibold text-center py-28">No venues Found</h1>
              </div>
        
          ) : ( 
            venueList.map((venue, index) => (
              <Link to={`venueDetail/${venue._id}`}>
              <div className="flex justify-between p-10 gap-8 cursor-pointer" key={index}>
                <div className="bg-black h-64 w-3/6"
                  style={{
                    background: `url('/Pictures/${venue.image[0]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Your content here */}
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
