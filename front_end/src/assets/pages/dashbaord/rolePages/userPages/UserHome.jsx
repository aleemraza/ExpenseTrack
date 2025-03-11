import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Create_Group_Api,View_Group_Api} from '../../../../../redux/API/groupApi'
import {ToastContainer , toast} from 'react-toastify'
import front from '../../../../image/front.png'
import { MdGroupAdd } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const form_Value ={
  Groupname: '',
  totalBudget: '',
}
const UserHome = () => {
  const dispatch = useDispatch()
  const [userData , setUserData] = useState(form_Value);
  const [viewUserGroup , setviewUserGroup] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false)

  const get_user_form_data = (e)=>{
    setUserData({...userData , [e.target.name] : e.target.value })
  }

  const isFormValid = ()=>{
      const {Groupname,totalBudget} = userData;
      return !! Groupname && !!totalBudget; 
  };

  const User_Create_Group = async(e)=>{
          e.preventDefault();
          if(!isFormValid()){
              toast.error('Please fill in all required fields.',{
                  position:'top-left'
              })
          }
          try{
              const {Groupname,totalBudget} = userData;
              const res_results  = await dispatch(Create_Group_Api({Groupname,totalBudget}))
              if(Create_Group_Api.fulfilled.match(res_results)){
                  toast.success('User Create Group Successfully',{
                      position:'top-right'
                  })
                  View_user_Group();    
              }else{
                  toast.error(res_results.payload || "Group Create   failed", { position: "top-right" });
                  console.log('Failed: ' + res_results.error.message);
              }
          }catch(error){
              console.error("Error", error.message)
          }
      }
      // Fetech Data 
      const View_user_Group = async(e)=>{
        try{
            const res_results  = await dispatch(View_Group_Api())
            if(View_Group_Api.fulfilled.match(res_results)){
              console.log(res_results)
              setviewUserGroup(res_results.payload.data.groupData)
            }else{
                console.log('Failed: ' + res_results.error.message);
            }
        }catch(error){
            console.error("Error", error.message)
        }
    }
    useEffect(()=>{
      View_user_Group();
    },[])



  return (
    
    <>
<section className='p-5 rounded-md'>
<div className='flex justify-end  p-3 m-1'>
<div class="flex -mx-2 mb-4">
 <div className='w-1/2 px-2'>
 <button  onClick={openModal}
   className="tracking-wide  w-[200px]  py-3 flex items-center justify-center  bg-gray-200 text-gray-800  font-bold rounded-xl hover:bg-gray-300
    transition-transform duration-300 hover:scale-105
    dark:bg-blue-600 dark:hover:bg-gray-600">
            <MdGroupAdd  size={20} />
            <span className="ml-3">
            Create a Expense
            </span>
  </button>
 
 </div>
                    
                </div>

</div>
<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5">
  
   {viewUserGroup.map((group,index)=>{
    return(
    <Link to={`/userdashbaord/expenses_deatils/${group.groupId}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl transition-transform duration-300 ease-in-out hover:scale-105">
    {/* <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={front} alt=""/> */}
    <div class="relative"><a href="#">
                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    src={front}
                    alt="Sunset in the mountains"/>
                <div
                    class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                </div>
            </a>
            <a href="#!">
                <div
                    class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                    Cooking
                </div>
            </a>
    </div>
    <div className="flex flex-col justify-center p-4 leading-normal">
    
      <h5 className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
        {group.groupName}
      </h5>
      <p className="text-gray-500 text-sm">
        {group.totalMembers}
      </p>
      {group.grouptotalBudget}
    </div>
  </Link> 
    )
   })}       
</div> 
</section>

{/* Drop Down */}
{isOpen && (
  <div
    className="fixed inset-0 flex items-center justify-center backdrop-blur-xs backdrop-opacity-50"
    onClick={closeModal}
  >
    <div
      className="bg-[#E5E7EB] rounded-lg shadow-2xl sm:w-[200px] md:w-[300px] lg:w-[500px]   p-6" 
      onClick={(e) => e.stopPropagation()}  
    >
      {/* Modal Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-lg font-semibold"> Create a Expense</h3>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 bg-white"
        >
          <IoClose size={30} color='black' className='bg-[#E5E7EB]'/>
          {/* <VscEyeClosed  size={30} color='blue'/> */}
        </button>
      </div>

      {/* Modal Body */}
      <div className="mt-4 space-y-4">
        <form method="post" >
          <div className="grid sm:grid-cols-1 p-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-400">
              Group Name
              </label>
              <input
               name='Groupname' 
               onChange={(e)=> get_user_form_data(e)}
                type="text"
                className="bg-[#E5E7EB] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your  Group name"
              />
            </div>
            {/* <div className='mt-2'>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-400">
              Amount
              </label>
              <input
               name='totalBudget' 
               onChange={(e)=> get_user_form_data(e)}
               type="number"
                className="bg-[#E5E7EB] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your  amount"
              />
            </div> */}
          </div>
         
          <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="inline-flex items-center justify-center rounded-xl bg-gray-400 py-3 px-6 font-dm text-base font-medium text-black shadow-xl transition-transform duration-200 ease-in-out hover:scale-[1.02] w-full sm:w-auto text-center"
              >
                Close
              </button>
              <button
             onClick={User_Create_Group}
              className="inline-flex items-center justify-center rounded-xl bg-gray-400 py-3 px-6 font-dm text-base font-medium text-black shadow-xl transition-transform duration-200 ease-in-out hover:scale-[1.02] w-full sm:w-auto text-center"
            >
              Create a Expense
            </button>
            </div>
        </form>
      </div>
    </div>
  </div>
)}


    </>
  )
}

export default UserHome
