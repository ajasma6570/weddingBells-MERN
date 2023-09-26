import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import UseNavbar from '../../Components/userComponents/UseNavbar';
import Footer from '../../Components/userComponents/Footer';

export default function SideBar() {
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarMinimized(!isSidebarMinimized);
  };

  const sidebarClass = isSidebarMinimized ? 'w-16' : 'w-64'; // Adjust width as needed
  const textClass = isSidebarMinimized ? 'hidden' : '';

  return (
    <>
    <UseNavbar />
    <div className='flex '>
      <div className={`bg-gray-800 ${sidebarClass} min-h-screen transition-all duration-300 ease-in-out`}>
        <div className='flex justify-between px-8'>
          <div className={`text-white text-2xl font-semibold text-center py-3 ${textClass}`}>LOGO</div>
          <div className='mt-4 cursor-pointer' onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} size='lg' color='white'/>
          </div>
        </div>
        <div className=''>
          <ul className='pl-5 pr-6 text-xl'>
            <li>
              <NavLink to="/user/userProfile/accountDetails" className={`text-white flex font-sans my-2 cursor-pointer hover:text-slate-500`} activeClassName="active">
                <div className="icon"> <FontAwesomeIcon icon={faUser} size="lg" /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>Account Details</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
            <li>
              <NavLink to="/user/userProfile/orders" className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`} activeClassName="active">
                <div className="icon"><FontAwesomeIcon icon={faCartShopping} size='lg' /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>Orders</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
          </ul>
        </div>
      </div>
      <div className='bg-gray-200 h-screen w-full pl-5'>
        <Outlet /> {/* This will render the content for the matching route */}
      </div>
    </div>
    <Footer/>
    </>
  );
}
