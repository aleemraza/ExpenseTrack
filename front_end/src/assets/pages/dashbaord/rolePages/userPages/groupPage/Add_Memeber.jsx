import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {All_User_Group_Status_Api} from '../../../../../../../src/redux/API/userDeatilsAPI'
import {ADD_MEMBER_API,Invite_User_Jion_Group} from '../../../../../../../src/redux/API/groupApi'
import {ToastContainer , toast} from 'react-toastify'
import { IoClose } from "react-icons/io5";
const Add_Memeber = () => {
  const dispatch = useDispatch()
  const {groupId} = useParams()

  const [email, setEmail] = useState('');
  const [Inviteemail, setInvitEmail] = useState('');
  const [members, setMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false)



  const invite_memeber_jion_group = async(e)=>{
    e.preventDefault();
    try{
      const res_results = await dispatch(Invite_User_Jion_Group({email:Inviteemail,groupId}))
      console.log(res_results)
      if(Invite_User_Jion_Group.fulfilled.match(res_results)){
        toast.success( res_results.payload || 'User Invite Successfully',{
          position:'top-right'
        })
      }else{
        toast.error(res_results.payload || "Inivite failed", { position: "top-right" });
        console.log('Failed: ' + res_results.error.message);
      }
    }catch(error){
      console.error("Error", error.message)
    }
  }



  const user_Deatils_GroupID = async(groupId)=>{
    try{
      const res_results  = await dispatch(All_User_Group_Status_Api({groupId}))
      if(All_User_Group_Status_Api.fulfilled.match(res_results)){
        setMembers(res_results.payload.data);
      }else{
          console.log('Failed: ' + res_results.error.message);
      }
    }catch(error){
      console.error("Error", error.message)
    }
  }
  useEffect(() => {
    if (groupId) {
      user_Deatils_GroupID(groupId)
    }
  }, [groupId]);

  const add_memeber_in_group = async(userId)=>{
    try{
      const res_results = await dispatch(ADD_MEMBER_API({groupId,userId}))
      if(ADD_MEMBER_API.fulfilled.match(res_results)){
        console.log(res_results)
      }else{
        console.log('Failed: ' + res_results.error.message);
      }

    }catch(error){
      console.error("Error", error.message)
    }
  }
  const User_Deatils_Email = async(e)=>{
        e.preventDefault();
        try{
            const res_results  = await dispatch(All_User_Group_Status_Api({email,groupId}))
            if(All_User_Group_Status_Api.fulfilled.match(res_results)){
            if (res_results.payload.data && !Array.isArray(res_results.payload.data)) {
                setMembers([res_results.payload.data]);
            } else {
                setMembers(res_results.payload.data);
            }
            }else{
                console.log('Failed: ' + res_results.error.message);
            }
        }catch(error){
            console.error("Error", error.message)
        }
      }
  const reset = ()=>{
    setEmail('')
    if (groupId) {
      user_Deatils_GroupID(groupId)
    }
  }  
  return (
    <>
<div class="relative bg-gray-100">
    <div class="bg-white rounded-xl shadow-md overflow-hidden">

      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Add Group Members</h2>
            <p class="text-gray-500 mt-1">Manage your team members and their account permissions here.</p>
          </div>
          <div class="mt-4 md:mt-0">
            <button onClick={openModal} class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
              Invite Member
            </button>
          </div>
        </div>
        <div class="mt-6 flex flex-col sm:flex-row gap-4">
          <div class="relative flex-grow">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} name='email' class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full " placeholder="Search members..."/>
          </div>
          <div>
          <button onClick={User_Deatils_Email}  class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
              Find Member
          </button>
          <button onClick={reset} class=" bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
              Reset
          </button>
          </div>
        </div>
      </div>
      
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              {/* <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th> */}
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Data  */}
          <tbody class="bg-white divide-y divide-gray-200">

            {members.length > 0 ? (
              members.map((member)=>(
                <tr key={member.id} class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <img class="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{member.name.toUpperCase()}</div>
                    <div class="text-sm text-gray-500">{member.email}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{member.role.toUpperCase()}</div>
              </td>
              {/* <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Engineering</div>
              </td> */}
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {member.userStatus}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={()=>add_memeber_in_group(member._id)} class="text-indigo-600 hover:text-indigo-900 mr-3">Add</button>
                <a href="#" class="text-red-600 hover:text-red-900">Delete</a>
              </td>
              </tr>
              ))
            ):(
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No members found
              </td>
            </tr>
            )
          }          
          </tbody>
        </table>
      </div>
      
    
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between flex-col sm:flex-row">
          <div class="mb-4 sm:mb-0">
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">1</span> to <span class="font-medium">5</span> of <span class="font-medium">24</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100">
                1
              </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </a>
              <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                8
              </a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                9
              </a>
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer/>
  </div>


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
          <h3 className="text-lg font-semibold">Invite User</h3>
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
          <form>
            <div className="grid sm:grid-cols-1 p-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-400">
                Email
                </label>
                <input
                 name='email' 
                 onChange={(e) => setInvitEmail(e.target.value)}
                 type="email"
                  className="bg-[#E5E7EB] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your Email"
                />
              </div>
             
            </div>
           
            <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="inline-flex items-center justify-center rounded-xl bg-gray-400 py-3 px-6 font-dm text-base font-medium text-black shadow-xl transition-transform duration-200 ease-in-out hover:scale-[1.02] w-full sm:w-auto text-center"
                >
                  Close
                </button>
                <button onClick={invite_memeber_jion_group}
                className="inline-flex items-center justify-center rounded-xl bg-gray-400 py-3 px-6 font-dm text-base font-medium text-black shadow-xl transition-transform duration-200 ease-in-out hover:scale-[1.02] w-full sm:w-auto text-center"
              >
                Invite Member
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

export default Add_Memeber
