import React, { useState } from "react";
import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faRightFromBracket , faDiamond, faStar} from '@fortawesome/free-solid-svg-icons';
import { LogoutAdmin } from "../../Redux/Admin/adminSlice";
import { useDispatch } from 'react-redux';
export default function AdminDashBoard() {

  const [isSidebarMinimized, setSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarMinimized(!isSidebarMinimized);
  };

  const sidebarClass = isSidebarMinimized ? 'w-16' : 'w-64'; // Adjust width as needed
  const textClass = isSidebarMinimized ? 'hidden' : '';
  const dispatch = useDispatch()

  const handleLogout = () => {
   dispatch(LogoutAdmin())
  }

  return (
    <div className="h-screen">
    <div className='flex h-full'>
      <div className={`bg-gray-800 ${sidebarClass} transition-all duration-300 ease-in-out`}>
        <div className='flex justify-between px-8'>
          <div className={`text-white text-2xl font-semibold text-center py-3 ${textClass}`}>LOGO</div>
          <div className='mt-4 cursor-pointer' onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} size='lg' color='white'/>
          </div>
        </div>
        <div className=''>
          <ul className='pl-5 pr-6 text-xl'>
            <li>
              <NavLink to="/admin/dash/dashboard" className={`text-white flex font-sans my-2 cursor-pointer hover:text-slate-500`} activeClassName="active">
                <div className="icon"> <FontAwesomeIcon icon={faUser} size="lg" /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>DashBoard</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
            <li>
              <NavLink to="/admin/dash/user" className={`text-white font-sans m cursor-pointer flex hover:text-slate-500`} activeClassName="active">
                <div className="icon"><FontAwesomeIcon icon={faDiamond} size='lg' /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>User List</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
            <li>
              <NavLink to="/admin/dash/business" className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`} activeClassName="active">
                <div className="icon"><FontAwesomeIcon icon={faDiamond} size='lg' /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>Business List</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
            <li>
              <NavLink to="/admin/dash/requestManagement" className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`} activeClassName="active">
                <div className="icon"><FontAwesomeIcon icon={faStar} size='lg' /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>Request Lists</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
            <li>
              <NavLink to="/admin/dash/service" className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`} activeClassName="active">
                <div className="icon"><FontAwesomeIcon icon={faStar} size='lg' /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>Services</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
            <li>
              <NavLink to="/admin/dash/booking" className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`} activeClassName="active">
                <div className="icon"><FontAwesomeIcon icon={faStar} size='lg' /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>Bookings</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
            <li>
              <NavLink to="/admin/dash/cancelBooking" className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`} activeClassName="active">
                <div className="icon"><FontAwesomeIcon icon={faStar} size='lg' /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`}>Cancel Bookings</div>
              </NavLink>
            </li>
            <hr className='bg-white my-2' />
            <li>
              <NavLink to="/admin/login" className={`text-white font-sans my-2 cursor-pointer flex hover:text-slate-500`} activeClassName="active" onClick={handleLogout}>
                <div className="icon"><FontAwesomeIcon icon={faRightFromBracket} size='lg' /></div>
                <div className={`link_text ml-2 sm:text-sm md:text-xl text-sm ${textClass}`
              }>Logout</div>
              </NavLink> 
            </li>
            <hr className='bg-white my-2' />

          </ul>
        </div>
      </div>
      <div className='bg-gray-200 w-full pl-5 overflow-y-auto'>
        <Outlet /> {/* This will render the content for the matching route */}
      </div>
    </div>
   
    </div>
  );
}
