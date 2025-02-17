import React, { useState, useEffect, useRef } from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaArrowRight,FaArrowLeft  } from "react-icons/fa";
import {useDispatch,useSelector} from 'react-redux'
import {user_Menu,admin_Menu} from '../dashbaordcomponents/dashbaorddropdownpages/DropDownPages'
import {Link} from 'react-router-dom'
import {Login_User_API} from '../../../../redux/API/api'
const Header = ({ setSidebarOpen, sidebarOpen, userDropdown, setUserDropdown }) => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [user, setUser] = useState([]);

  let menuItems = [];
      switch (role) {
          case 'user':
            menuItems = user_Menu;
            break;
          case 'admin':
            menuItems = admin_Menu;
            break;
    }
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setUserDropdown(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [userDropdown, setUserDropdown]); 


    const Login_current_User = async () => {
      try {
        const res_data = await dispatch(Login_User_API());
        if (Login_User_API.fulfilled.match(res_data)) {
          setUser(res_data.payload.data.user);
        }else {
          console.log('Failed: ' + res_data.error.message);
        }
      } catch (error) {
        console.error('Failed: ', error.message);
      }
    };
     useEffect(()=>{
        Login_current_User()
    },[])
  return (
    <>
    <header className="h-14 bg-gray-100 top-0 w-full fixed shadow flex justify-between items-center px-10 z-40">
            <div className="flex items-center gap-x-14">
              <div className="w-40">
                <h2 className="text-md font-bold">{user.name}</h2>
                <p className="text-gray-400 text-sm">[{user.role}]</p>
              </div>
              <button
                className="hidden lg:block bg-gray-200 rounded-full p-3"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
              </button>
            </div>
            <ul className="flex items-center gap-5">
              <li>
                <button className="bg-gray-200 px-3 py-2 rounded-sm">
                  <IoMdNotificationsOutline/>
                </button>
              </li>
              <li className="relative" ref={dropdownRef}>
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  onClick={() => setUserDropdown(!userDropdown)}
                />
                {userDropdown && (
                   <ul className="absolute right-0 top-12 w-40 bg-white rounded-lg shadow-lg z-50">
                   {menuItems.map((item, index) => (
                     <li key={index} className="hover:bg-gray-100 text-gray-700 px-4 py-2 cursor-pointer">
                       <Link to={item.path} className="flex items-center gap-2">
                         {item.icon} <span>{item.label}</span>
                       </Link>
                     </li>
                   ))}
                 </ul>
                )}
              </li>
            </ul>
          </header>
    </>
  )
}

export default Header
