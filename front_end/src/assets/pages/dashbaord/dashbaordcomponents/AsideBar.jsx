import React,{useState,useEffect} from 'react'
import {user_Menu, admin_Menu,PageNotFoundMenu} from './Asidebar_MenuItems'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { IoIosLogOut } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegFile } from "react-icons/fa";
import {Logout_API} from '../../../../redux/API/api'
import {ToastContainer , toast} from 'react-toastify'
const AsideBar = ({sidebarOpen}) => {
    const dispatch = useDispatch()
    const { role } = useSelector((state) => state.auth);
    let menuItems = [];
    switch (role) {
        case 'user':
          menuItems = user_Menu;
          break;
        case 'admin':
          menuItems = admin_Menu;
          break;
        default :
        menuItems = PageNotFoundMenu
      }
      // Logout API 
    const User_Logout = async()=>{
      try{
        const res_results  = await dispatch(Logout_API())
        if(Logout_API.fulfilled.match(res_results)){
            toast.success('User Logout Successfully',{
                position:'top-right'
            })
            setTimeout(() => {
              navigate('/');
            }, 3000);
        }else{
            toast.error(res_results.payload || "Logout failed", { position: "top-right" });
            console.log('Failed: ' + res_results.error.message);
        }
        }catch(error){
              console.error("Error", error.message)
              toast.error("Something went wrong. Please try again.", { position: "top-right" });
          }
        }
  return (
    <>
    <aside
                id="sidebar"
                className={`${
                    sidebarOpen ? "w-[240px]" : "w-[60px]"
                } h-[calc(100vh-120px)] fixed shadow overflow-hidden transition-all duration-500 ease-in-out bg-[#FFFFFF] z-30`}
                >
                <div className="flex flex-col justify-between h-full">
                    <ul className="flex flex-col gap-1 mt-2">
                    {menuItems.map((item, index) => (
                    <li key={index} className="text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                        <Link  className="w-full flex items-center py-3 px-3" to={item.path}>
                            <span className="text-xl px-2">{item.icon}</span>
                            {sidebarOpen && <span className="pl-2">{item.label}</span>}
                        </Link>
                    </li>
                ))}
                    </ul>
                    <div className="mt-auto mb-2">
                        <ul className="flex flex-col gap-1">
                          <li className="text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                            <button className="w-full  flex items-center py-3 px-3" onClick={User_Logout}>
                              <span className="text-xl px-2"><IoIosLogOut size={30} /></span>
                              {sidebarOpen && <span className="pl-2">Logout</span>}
                            </button>
                          </li>
                        </ul>
                    </div>
                    <ToastContainer/>
                </div>
    </aside>
    
    </>
  )
}

export default AsideBar
