import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
export default function BusinessDashboard() {
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);

  const business = useSelector((state) => state.rootReducer.business);

  const toggleSidebar = () => {
    setSidebarMinimized(!isSidebarMinimized);
  };

  const sidebarClass = isSidebarMinimized ? 'w-16' : 'w-64'; // Adjust width as needed
  const textClass = isSidebarMinimized ? 'hidden' : '';

  return (
    <>
         <div className='flex h-screen'>
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
              <NavLink to="/business/dashboard/businessAccountDetails" className={`text-white flex font-sans my-2 cursor-pointer hover:text-slate-500`} activeClassName="active">
                <div className="icon"> <FontAwesomeIcon icon={faUser} size="lg" /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>Account Details</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
            <li>
              <NavLink to={`/business/dashboard/businessAddService/${business.id}`} className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`} activeClassName="active">
                <div className="icon"><FontAwesomeIcon icon={faCartShopping} size='lg' /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>Add Services</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
            <li>
              <NavLink to="" className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`} activeClassName="active">
                <div className="icon"><FontAwesomeIcon icon={faCartShopping} size='lg' /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>Requests</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
          </ul>
        </div>
      </div>
      <div className='bg-gray-200 h-screen w-full pl-5  overflow-scroll overflow-x-hidden'>
        <Outlet /> {/* This will render the content for the matching route */}
      </div>
    </div>
    </>
  );
}
