import React,{useState,useEffect} from 'react'
import Header from './dashbaordcomponents/Header'
import AsideBar from './dashbaordcomponents/AsideBar';
import Footer from './dashbaordcomponents/Footer';
import {Outlet} from 'react-router-dom'
const Main = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false); // Close sidebar on small screens
      } else {
        setSidebarOpen(true); // Open sidebar on large screens
      }
    };

    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
    };
  }, []);
  return (
    <>
    <div className="h-screen">
      {/* Header */}
      {/* <header className="h-14 bg-gray-100 top-0 w-full fixed shadow flex justify-between items-center px-10 z-40">
        <div className="flex items-center gap-x-14">
          <div className="w-40">
            <h2 className="text-md font-bold">Aleem Raza </h2>
            <p className="text-gray-400 text-sm">Web Developer</p>
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
          <li className="relative">
            <img
              className="h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              onClick={() => setUserDropdown(!userDropdown)}
            />
            {userDropdown && (
              <ul className="absolute bg-white right-0 top-12 w-28 rounded shadow-md z-50">
                <li className="hover:bg-gray-50 text-gray-700 px-5 py-2 cursor-pointer">
                  Profile
                </li>
                <li className="hover:bg-gray-50 text-gray-700 px-5 py-2 cursor-pointer">
                  Settings
                </li>
                <li className="hover:bg-gray-50 text-gray-700 px-5 py-2 cursor-pointer">
                  Logout
                </li>
              </ul>
            )}
          </li>
        </ul>
      </header> */}
      <Header
      setSidebarOpen={setSidebarOpen} 
      sidebarOpen={sidebarOpen} 
      userDropdown={userDropdown}
      setUserDropdown={setUserDropdown}
      />

      {/* Main Section */}
      <main className="min-h-screen w-full absolute top-14 flex bg-[#E5E7EB] overflow-y-auto">
        {/* Sidebar */}
        <AsideBar
          sidebarOpen={sidebarOpen}
        />

        {/* Main Content */}
        <section
          className={`w-full transition-all duration-500 ease-in-out bg-[#F3F4F6] ${
            sidebarOpen ? "ml-[240px]" : "ml-[60px]"
          } p-3`}
        >   
            <div>
            <Outlet/>
            </div>
        </section>
      </main>
      <Footer/>
    </div>
    </>
  )
}

export default Main
