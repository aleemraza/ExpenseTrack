import React,{ useState } from 'react'
import { useParams } from 'react-router-dom'

// call pages 
import Group_Display from './groupPage/Group_Display'
import Add_Memeber from './groupPage/Add_Memeber'
import Add_Daily_Expenses from './groupPage/Add_Daily_Expenses'
import Add_Fund_of_Member from './groupPage/Add_Fund_of_Member'
import GenrateReport from './groupPage/GenrateReport'


import { BsHouseDashFill } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { RiFundsFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
const ExpenseDeatils = () => {
    const  { groupId  } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("Add Member");

    const renderContent = () => {
      switch (selectedMenu) {
        case "Group_Display":
          return <Group_Display />;
        case "Add_Memeber":
          return <Add_Memeber />;
        case "Add_Daily_Expenses":
          return <Add_Daily_Expenses />;
        case "Add_Fund_of_Member":
          return <Add_Fund_of_Member />;
        case "GenrateReport":
          return <GenrateReport />;
        default:
          return <Group_Display />;
      }
    };

  return (
   <>
   
<section className='bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg border border-white/30 p-5 rounded-2xl shadow-2xl'>
  <div className='px-4 md:px-4 '>
    <div className='flex flex-col lg:flex-row lg:items-center  max-lg:gap-4 justify-between w-full '>
    <ul class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
                      <li class={`flex items-center cursor-pointer outline-none group ${selectedMenu === 'Group_Display'}`}
                    onClick={() => setSelectedMenu('Group_Display')}>
                      <span className='text-indigo-600'>
                        <BsHouseDashFill size={24} />
                      </span>
                        <span
                            class="font-normal text-lg leading-8 text-indigo-600 ml-2 mr-3 transition-all duration-500 group-hover:text-indigo-600">Main</span>
                    </li>

                    <li class={`flex items-center cursor-pointer outline-none group ${selectedMenu === 'Add_Memeber'}`}
                    onClick={() => setSelectedMenu('Add_Memeber')}>
                        <span className='stroke-black group-hover:text-indigo-600'>
                        <IoPersonAddSharp size={24} />
                        </span>
                        <span
                            class="font-normal text-lg leading-8 text-black pl-2 pr-3 transition-all duration-500 group-hover:text-indigo-600">Add Memeber</span>
                    </li>
                    
                    <li class={`flex items-center cursor-pointer outline-none group ${selectedMenu === 'Add_Daily_Expenses'}`}
                    onClick={() => setSelectedMenu('Add_Daily_Expenses')}
                    >
                        <span className='stroke-black group-hover:text-indigo-600'>
                        <RiMoneyDollarCircleFill size={24} />
                        </span>
                        <span
                            class="font-normal text-lg leading-8 text-black pl-2 pr-3 transition-all duration-500 group-hover:text-indigo-600">Add Daily Expenses</span>
                    </li>


                    <li class={`flex items-center cursor-pointer outline-none group ${selectedMenu === 'Add_Fund_of_Member'}`}
                    onClick={() => setSelectedMenu('Add_Fund_of_Member')}
                    >
                        <span className='stroke-black group-hover:text-indigo-600'>
                        <RiFundsFill size={24} />
                        </span>
                        <span
                            class="font-normal text-lg leading-8 text-black pl-2 pr-3 transition-all duration-500 group-hover:text-indigo-600">Add Fund of Member</span>
                    </li>


                    <li class={`flex items-center cursor-pointer outline-none group ${selectedMenu === 'GenrateReport'}`}
                    onClick={() => setSelectedMenu('GenrateReport')}
                    >
                        <span className='stroke-black group-hover:text-indigo-600'>
                        <BiSolidReport size={24} />
                        </span>
                        <span
                            class="font-normal text-lg leading-8 text-black pl-2 pr-3 transition-all duration-500 group-hover:text-indigo-600">Generate Report</span>
                    </li>
                </ul>
    </div>
    <hr className="border-t border-gray-300 my-4" />

  </div>
</section>
<section className='min-h-screen bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg border border-white/30 p-5 rounded-2xl shadow-2xl mt-5'>
<div className="p-5 rounded-md">{renderContent()}</div>
</section>



   



    
    


  

    
   </>
  )
}

export default ExpenseDeatils
