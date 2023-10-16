import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';


export default function VenueDetail() {

  const currentDate = new Date();

  // Format the Date object as "YYYY-MM-DD"
  const minDate = currentDate.toISOString().split('T')[0];


    const slides = [
        {
          url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
        },
        {
          url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
        },
        {
          url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
        },
    
        {
          url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
        },
        {
          url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
        },
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
      };
    
      const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };
    
      const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
      };

  return (

    <div>

        <h1 className='text-3xl font-bold py-3 px-20'>Azeezia Convention Centre</h1>



   
        <div className='max-w-screen h-fit w-full m-auto py-16 px-4 relative group '>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-6/12 h-80 rounded-2xl bg-center bg-cover duration-500 m-auto'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[45%] -translate-x-[-400%] translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[45%] -translate-x-[400%] translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
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
  

    <div className="px-4 md:px-24 pb-20 grid grid-flow-col gap-4 md:gap-4">
      <div className="w-full">
        <h1 className='text-2xl font-bold'>About</h1>
        <p>
          Located on Civil Line Road in Padivattom, Ernakulam, our venue offers Banquet Halls, a Wedding Auditorium, Party Halls, a Restaurant, and a spacious car parking area for 200 cars. The meeting and dining spaces can be easily adjusted to accommodate 50 to 500 people.
        </p>
        <p className='text-md font-medium'>Location : Edapally, Kerala</p>
        <p className='text-md font-medium'>Capacity</p>
        <p className='text-md font-medium'>Starting from 49,999 Rs</p>
      </div>


      <div className="w-full md:w-1/2">
        <div className="border border-black w-96 h-60 rounded-lg">
            <p className='p-2 text-2xl font-medium'>Resereve Your Venue</p>
            <span className='pl-5  block'>From : <input type='date' className='border border-black rounded-lg' min={minDate}/> </span>
            <span className='pl-10 py-5 block'>To : <input type='date' className='border border-black rounded-lg' min={minDate}/> </span>

            <p className='text-sm font-semibold pl-5'>Rent amount vary on holidays please ask to our Advisor</p>
            <div className='ml-36 py-5'>
            <button class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 border border-yellow-700 rounded">
            Add to Basket
                </button>
            </div>
           
        </div>
      </div>
    </div>

    </div>
  )
}
