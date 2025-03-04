import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-[#FFFFFF] p-5 bottom-0 fixed w-full z-40">
        <p className="text-center">© {new Date().getFullYear()} ExpenseTrack. All rights reserved.</p>
    </footer>
    </>
  )
}

export default Footer
