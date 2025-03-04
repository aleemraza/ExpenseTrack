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
    <header className="h-14 bg-[#FFFFFF] top-0 w-full fixed shadow flex justify-between items-center px-10 z-40">
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
                  
                  <div className="absolute  right-0 mt-2 p-5 lg:w-80 md:w-60 sm:w-40 bg-white rounded-lg shadow-lg overflow-hidden  drop-shadow-xl divide-y divide-gray-200">
                   <div aria-label="header" class="flex space-x-4 items-center p-4">
      <div aria-label="avatar" class="flex mr-auto items-center space-x-4">
        <img
          src="https://avatars.githubusercontent.com/u/499550?v=4"
          alt="avatar Evan You"
          class="w-16 h-16 shrink-0 rounded-full"
        />
        <div class="space-y-2 flex flex-col flex-1 truncate">
          <div class="font-medium relative text-xl leading-tight text-gray-900">
            <span class="flex">
              <span class="truncate relative pr-8">
                Evan You
                <span
                  aria-label="verified"
                  class="absolute top-1/2 -translate-y-1/2 right-0 inline-block rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="w-6 h-6 ml-1 text-cyan-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                      stroke-width="0"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </span>
            </span>
          </div>
          <p class="font-normal text-base leading-tight text-gray-500 truncate">
            evanyou@gmail.com
          </p>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="w-6 h-6 text-gray-400 shrink-0"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 9l4 -4l4 4"></path>
        <path d="M16 15l-4 4l-4 -4"></path>
      </svg>
                  </div>
                  <div aria-label="navigation" class="py-2">
                          {menuItems.map((item, index)=>{
                            return(
                          <nav class="grid gap-1" key={index}>
                              <Link to={item.path}  
                              class="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md">
                              {item.icon}
                              <span>{item.label}</span>
                            </Link>
                          </nav>
                            )
                        })} 
                  </div>

                <div aria-label="footer" class="pt-2">
                        <button
                          type="button"
                          class="flex items-center space-x-3 py-3 px-4 w-full leading-6 text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
                        >
                          {/* <MdLogout size={30}/> */}
                          <span>Logout</span>
                        </button>
              </div>
                   
                 </div>
                )}
              </li>
            </ul>
          </header>
    </>
  )
}

export default Header
