import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { useNavigate, useParams } from 'react-router-dom';
import { useVenueAddTOCartMutation, useVenueDetailsMutation } from '../../Redux/user/userApiSlice';
import { toastError, toastSuccess } from '../toast';
import { useSelector } from 'react-redux';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Default styles
import 'react-date-range/dist/theme/default.css'; // Default theme styles
import './custom_style.css';

export default function VenueDetail() {


  const {venueId} = useParams()
  const userData = useSelector((state)=>state.rootReducer.user)
  const [VenueDetail] = useVenueDetailsMutation()
  const [detail,setDetail] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [bookedDates, setBookedDates] = useState(null)

  useEffect(()=>{
    const fetchData = async() => {
      setLoading(true); 
      const res = await VenueDetail({venueId})
      if(res.data.status === 200){
        const details = res.data.venueDetail
        const bookedDates = res.data.bookedDates
        setDetail(details)
        setBookedDates(bookedDates)
      }else{
        toastError(res.data.message)
      }
      setLoading(false); 
    }
  
    fetchData()
  },[VenueDetail,venueId])

  const disabledDates = bookedDates ? bookedDates.map(bookedDates => new Date(bookedDates)) : [];

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




      const [selection, setSelection] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      });
    
      const handleSelect = (ranges) => {
        setSelection(ranges.selection);
      };
      const datesWithinRange = [];

      (() => {
        const { startDate, endDate } = selection;
        // const datesWithinRange = [];
        let currentDate = new Date(startDate);
      
        while (currentDate <= endDate) {
          const year = currentDate.getFullYear();
          const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
          const day = currentDate.getDate().toString().padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;
          datesWithinRange.push(formattedDate);
      
          currentDate.setDate(currentDate.getDate() + 1);
        }
      
      })();
      

      const [venueAddtoCart] = useVenueAddTOCartMutation()

      const handleAddtoCart = async(venueId) => {
    
        const userId = userData._id
        if(userId){
          const res = await venueAddtoCart({venueId,userId,datesWithinRange})
          if(res.data.status === 200){
            toastSuccess(res.data.message)
            navigate('/venueList')
          }else{
            toastError(res.data.error)
          }
        }else{
          toastError("please Login")
          navigate('/user/login')
        }
      
      }

  return (
    <div className='bg-gradient-to-br from-white to-gray-400'>
      {loading ? (
        <div className='h-screen'>
          <h1 className='text-3xl font-bold text-center text-gray-500 px-20 py-20'>Loading....</h1>
        </div>
      ) : detail ? (
        <section >
      
            <div >
              <h1 className='text-3xl font-bold py-3 px-20 xxs:text-sm'>{detail.name}</h1>
              <div className='max-w-screen h-fit w-full m-auto py-16 px-4 xxs:p-3 relative group '>
                <div
                  style={{ backgroundImage: `url(/Pictures/${detail.image[currentIndex]})` }}
                  className='w-6/12 h-80  rounded-2xl xxs:min-w-full bg-center bg-cover duration-500 m-auto'
                ></div>
                <div className='hidden group-hover:block absolute top-[45%] -translate-x-[-400%] translate-y-[-50%] xxs:absolute xxs:-translate-x-[-10%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                  <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>
                <div className='hidden group-hover:block absolute top-[45%] -translate-x-[400%] xxs:absolute xxs:-translate-x-[10%] translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
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
              <div className='px-4 md:px-24 pb-20 md:grid md:grid-flow-col gap-4 md:gap-4'>
                <div className='w-full'>
                  <h1 className='text-2xl font-bold'>About</h1>
                  <p className='py-3'>{detail.description}</p>
                  <p className='text-md font-medium'>Location : {detail.city}, Kerala</p>
                  <p className='text-md font-medium'>Capacity : {detail.capacity}</p>
                  <p className='text-md font-medium'>Starting from ₹{detail.amount}<small> Per Day</small></p>
                </div>
                <div className='w-full md:w-1/2'>
                  <div className='border box-border  border-black  xxs:mx-auto  rounded-lg'>
                    <p className='p-2 text-2xl font-medium'>Reserve Your Venue</p>
                    
                    <div className='ml-5 xxs:mx-auto p-1'>
                
                      <DateRange
                        ranges={[selection]}
                        onChange={handleSelect}
                        showSelectionPreview={false}
                        minDate={new Date()}
                        disabledDates={disabledDates}
                      /></div>
                 
                    <p className='text-sm font-semibold pl-5 xxs:text-xs'>Rent amount varies on holidays, please ask our advisor.</p>
                    <div className='ml-36 xxs:ml-24 py-5 '>
                      <button className="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 border border-gray-900 rounded"
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
