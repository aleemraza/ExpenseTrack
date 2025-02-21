import React from 'react'

const UserHome = () => {
  return (
    <>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 transition duration-150 ease-in-out">
            {[
              { title: "Total Users", count: 100, color: "gray" },
              { title: "Total Active Users", count: 65, color: "green" },
              { title: "Total Inactive Users", count: 30, color: "yellow" },
              { title: "Deleted Users", count: 5, color: "red" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-50 p-5 rounded-md flex justify-between items-center shadow transition duration-150 ease-in-out"
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
          </div>

         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-3'>
 <div className='bg-[#FFFFFF] p-8 flex justify-between items-center hover:shadow-lg hover:bg-[#FFFFFF] hover:scale-105 transition-transform duration-300 rounded-sm border-1 border-[#F3F4F6]'>
 hellohellohellohellohellohellohellohello
 hellohellohellohellohellohellohellohello
 hellohellohellohellohellohellohellohello
</div>        
 
  
  <div className='bg-amber-300 p-5 rounded-4xl flex justify-between items-center hover:shadow-lg hover:bg-amber-400 hover:scale-105 transition-transform duration-300'>
    hello
    <div className='bg-amber-300 p-4'>

    </div>
  </div>
  <div className='bg-amber-300 p-5 rounded-4xl flex justify-between items-center hover:shadow-lg hover:bg-amber-400 hover:scale-105 transition-transform duration-300'>
    hello
  </div>
  <div className='bg-amber-300 p-5 rounded-4xl flex justify-between items-center hover:shadow-lg hover:bg-amber-400 hover:scale-105 transition-transform duration-300'>
    hello
  </div>
</div>


    </>
  )
}

export default UserHome
