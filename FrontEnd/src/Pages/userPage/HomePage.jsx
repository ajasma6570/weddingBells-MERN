import React from 'react'
import Home from '../../Components/userComponents/Home'
import Card from '../../Components/userComponents/Card'
import Footer from '../../Components/Footer'
import UseNavbar from '../../Components/userComponents/UseNavbar'



export default function HomePage() {
  return (
    <>
        <div style={{backgroundImage:'url("/Assets/banner.jpg")'}} className='h-screen bg-cover ' >
        <UseNavbar />

            <Home className="w-full  mx-auto p-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"/>
        </div>
        <div className='flex items-center justify-center mt-5'>
            <h1 className='text-5xl'>Services</h1>
        </div>

       
        <div className='w-full  mx-auto p-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 '>
            <Card />
            <Card />
            <Card />
           
        </div>
        <div className="bg-gradient-to-b from-yellow-200 to-white " >
            <h2 className='ml-5 text-3xl font-semibold'>Our Clients Reviews</h2>
            <span className='text-blue-500 ml-5'>Write Comment</span>
            
            <div className=' mx-auto'>
            {/* <ClientReviews /> */}
            </div>
         
            </div>

            <div>
            <Footer />
            </div>
            
    </>
  )
}
