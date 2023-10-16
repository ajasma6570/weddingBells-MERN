import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { useNavigate, useParams } from 'react-router-dom';
import { useVenueAddTOCartMutation, useVenueDetailsMutation } from '../../Redux/user/userApiSlice';
import { toastError, toastSuccess } from '../toast';
import { useSelector } from 'react-redux';


export default function VenueDetail() {

  //its for disable previous Date
  const currentDate = new Date();
  const minDate = currentDate.toISOString().split('T')[0];
 
  const {venueId} = useParams()
  const userData = useSelector((state)=>state.rootReducer.user)
  const [VenueDetail] = useVenueDetailsMutation()
  const [detail,setDetail] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchData = async() => {
      setLoading(true); 
      const res = await VenueDetail({venueId})
      if(res.data.status === 200){
        const details = res.data.venueDetail
        setDetail(details)
      }else{
        toastError(res.data.message)
      }
      setLoading(false); 
    }
  
    fetchData()
  },[VenueDetail,venueId])

  
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? detail.image.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
      };
    
      const nextSlide = () => {
        const isLastSlide = currentIndex === detail.image.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };
    
      const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
      };

      const [from,setFrom] = useState("")
      const [to,setTo] = useState("")

      const [venueAddtoCart] = useVenueAddTOCartMutation()

      const handleAddtoCart = async(venueId) => {
        const userId = userData._id
       const res = await venueAddtoCart({venueId,userId,from,to })
        if(res.data.status === 200){
          toastSuccess(res.data.message)
          navigate('/venueList')
        }else{
          toastError(res.data.error)
        }
      }

  return (
    <div>
      {loading ? (
        <div className='h-screen'>
          <h1 className='text-3xl font-bold text-center text-gray-500 px-20 py-20'>Loading....</h1>
        </div>
      ) : detail ? (
        <section>
      
            <div >
              <h1 className='text-3xl font-bold py-3 px-20'>{detail.name}</h1>
              <div className='max-w-screen h-fit w-full m-auto py-16 px-4 relative group '>
                <div
                  style={{ backgroundImage: `url(/Pictures/${detail.image[currentIndex]})` }}
                  className='w-6/12 h-80 rounded-2xl bg-center bg-cover duration-500 m-auto'
                ></div>
                <div className='hidden group-hover:block absolute top-[45%] -translate-x-[-400%] translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                  <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>
                <div className='hidden group-hover:block absolute top-[45%] -translate-x-[400%] translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                  <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
                <div className='flex top-4 justify-center py-2'>
                  {detail.image.map((slide, slideIndex) => (
                    <div
                      key={slideIndex}
                      onClick={() => goToSlide(slideIndex)}
                      className='text-2xl cursor-pointer'
                    >
                      <RxDotFilled />
                    </div>
                  ))}
                </div>
              </div>
              <div className='px-4 md:px-24 pb-20 grid grid-flow-col gap-4 md:gap-4'>
                <div className='w-full'>
                  <h1 className='text-2xl font-bold'>About</h1>
                  <p className='py-3'>{detail.description}</p>
                  <p className='text-md font-medium'>Location : {detail.city}, Kerala</p>
                  <p className='text-md font-medium'>Capacity : {detail.capacity}</p>
                  <p className='text-md font-medium'>Starting from ₹{detail.amount}<small> Per Day</small></p>
                </div>
                <div className='w-full md:w-1/2'>
                  <div className='border border-black w-96 h-60 rounded-lg'>
                    <p className='p-2 text-2xl font-medium'>Reserve Your Venue</p>
                    <span className='pl-5 block'>From : <input type='date' className='border border-black rounded-lg' min={minDate} onChange={(e)=>setFrom(e.target.value)}/> </span>
                    <span className='pl-10 py-5 block'>To : <input type='date' className='border border-black rounded-lg' min={minDate} onChange={(e)=>setTo(e.target.value)}/> </span>
                    <p className='text-sm font-semibold pl-5'>Rent amount varies on holidays, please ask our advisor.</p>
                    <div className='ml-36 py-5'>
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 border border-yellow-700 rounded"
                      onClick={(e)=>handleAddtoCart(detail._id)}
                      >
                        Add to Basket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
       
        </section>
      ) : (
        <p>No details available.</p>
      )}
    </div>
  );
}
