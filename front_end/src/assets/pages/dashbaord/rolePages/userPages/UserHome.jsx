import React from 'react'

const UserHome = () => {
  return (
    <>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
          </div>
    </>
  )
}

export default UserHome
