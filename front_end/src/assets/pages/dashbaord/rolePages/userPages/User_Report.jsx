import React from 'react'

const User_Report = () => {
  return (
    <>
    <section className='p-5 rounded-md shadow bg-amber-300'>
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                <div className="m-2 shadow-md p-40 bg-amber-300">
                    <h2 className="text-xl p-2">Bar Chart</h2>
                    <div id="chart" className="w-full "></div>
                </div>
                <div className="overflow-x-auto m-2 shadow-md"> 
                </div>
    </div>

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                <div className="m-2 shadow-md p-40 bg-amber-300">
                    <h2 className="text-xl p-2">Bar Chart</h2>
                    <div id="chart" className="w-full "></div>
                </div>
                <div className="overflow-x-auto m-2 shadow-md">
                    
                </div>
          </div>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                <div className="m-2 shadow-md p-40 bg-amber-300">
                    <h2 className="text-xl p-2">Bar Chart</h2>
                    <div id="chart" className="w-full "></div>
                </div>
                <div className="overflow-x-auto m-2 shadow-md">
                    
                </div>
          </div>

    </section>
    
    </>
  )
}

export default User_Report
