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
        {/* <aside
            id="sidebar"
            className={`${
                sidebarOpen ? "w-[240px]" : "w-[60px]"
            } h-[calc(100vh-120px)] fixed shadow overflow-hidden transition-all duration-500 ease-in-out bg-[#E5E7EB] z-30`}
            >
            <div className="flex flex-col justify-between h-full">
                <ul className="flex flex-col gap-1 mt-2">
                {[
                    { icon: <IoHomeOutline />, label: "Dashboard" },
                    { icon: <FaRegFile />, label: "Reports" },
                ].map((item, index) => (
                    <li key={index} className="text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                    <a className="w-full flex items-center py-3 px-3" href="#">
                        <span className="text-xl px-2">{item.icon}</span>
                        {sidebarOpen && <span className="pl-2">{item.label}</span>}
                    </a>
                    </li>
                ))}
                </ul>

                <ul className="flex flex-col gap-1 mt-2">
                <li className="text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                    <a className="w-full flex items-center py-3 px-3" href="#">
                    <span className="text-xl px-2"><IoIosLogOut /></span>
                    {sidebarOpen && <span className="pl-2">Logout</span>}
                    </a>
                </li>
                </ul>
            </div>
        </aside> */}
        <AsideBar
          sidebarOpen={sidebarOpen}
        />

        {/* Main Content */}
        <section
          className={`w-full transition-all duration-500 ease-in-out ${
            sidebarOpen ? "ml-[240px]" : "ml-[60px]"
          } p-5`}
        >    
          {/* User Summary */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Total Users", count: 100, color: "gray" },
              { title: "Total Active Users", count: 65, color: "green" },
              { title: "Total Inactive Users", count: 30, color: "yellow" },
              { title: "Deleted Users", count: 5, color: "red" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-50 p-5 rounded-md flex justify-between items-center shadow"
              >
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-gray-500">{item.count}</p>
                </div>
                <i
                  className={`fa-solid fa-users p-4 bg-${item.color}-200 rounded-md`}
                ></i>
              </div>
            ))}
          </div> */}

          {/* <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                <div className="m-2 shadow-md p-40 bg-amber-300">
                    <h2 className="text-xl p-2">Bar Chart</h2>
                    <div id="chart" className="w-full "></div>
                </div>
                <div className="overflow-x-auto m-2 shadow-md">
                    
                </div>
          </div> */}

          {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              
                <div className="m-2 lg:col-span-1 shadow-md p-40">
                    <h2 className="text-xl p-2">Pie Chart</h2>
                    <div id="pie_chart" className="w-full"></div>
                </div>

                <div className="m-2 lg:col-span-2 shadow-md">
                    <h2 className="text-xl p-2">Candle Stick Chart</h2>
                    <div id="candle_chart" className="w-full"></div>
                </div>
            </div> */}

            {/* <div className="grid grid-cols-1">
                
                <div className="m-2 shadow-md p-40">
                    <h2 className="text-xl p-2">Heatmap Chart</h2>
                    <div id="heatmap_chart" className="w-full"></div>
                </div>
            </div> */}
            <div>
            <Outlet/>
            </div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-50 p-5 bottom-0 fixed w-full z-40">
        <p className="text-center">Copyright @2023</p>
      </footer> */}
      <Footer/>
    </div>
    </>
  )
}

export default Main
