import React, { useEffect, useState } from 'react'
import { useCateringListsMutation } from '../../Redux/user/userApiSlice';
import { Link } from 'react-router-dom';

export default function CateringList() {

  const [CateringLists] = useCateringListsMutation()
  const [cateringList,setCateringList] = useState([]) 

  useEffect(()=>{
    const fetchData = async () => {
      const res = await CateringLists();
      const catering = res.data.cateringLists;
      setCateringList(catering);
    };
    fetchData();
  },[CateringLists])

  return (
    <div className='h-fill '>
    <div>
        <h1 className='text-3xl font-bold pl-10 p-5 py-3'>Catering</h1>

        <div className='flex justify-around py-3'>
            <div>
                <span >Filter : </span>
                <input className="border border-black rounded-md" type='text' placeholder="enter search.."/>
            </div>
            <div>
                <span>search : </span>
                <input className="border border-black rounded-md" type='text' placeholder="enter search.."/>
            </div>
            <div>
                <span>SortBy : </span>
                <input className="border border-black rounded-md" type='text' placeholder="enter search.."/>
            </div>
        </div>

        {cateringList.length <= 0 ? ( 
            <div className=''>
              <h1 className="text-4xl text-gray-600 font-semibold text-center py-28">No caterings Found</h1>
              </div>
        
          ) : ( 

       cateringList.map((catering, index) => (
        <Link to={`/cateringList/cateringDetail/${catering._id}`}>
              <div className="flex justify-between p-10 gap-8 cursor-pointer" key={index}>
                <div className="bg-black h-64 w-3/6"
                  style={{
                    background: `url('/Pictures/${catering.image[0]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Your content here */}
                </div>
                <div className="w-6/12">
                  <h1 className='text-xl font-semibold'>{catering.name}</h1>
                  <p className='text-gray-500'>{catering.city}, kerala</p>
                  <p>Items : {catering.description}</p>
                  <p className='text-gray-500'>Min Amount : {catering.minAmount}<small> per head</small></p>
                  <p className='text-gray-500'>Max Amount : {catering.maxAmount}<small> per head</small></p>
                </div>
              </div>
              </Link>
            ))
          )}


    </div>
</div>
  )
}
