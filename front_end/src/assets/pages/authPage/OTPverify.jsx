import React, {useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {OTP_verify_API} from '../../../redux/API/api'
import {ToastContainer , toast} from 'react-toastify'
const OTPverify = () => {
    const dispatch = useDispatch()
    const inputRefs = useRef([]);
    const navigate = useNavigate()
    const [userOTP , setUserOTP] = useState(new Array(6).fill(''));

    const User_Otp_Verify = async(e)=>{
        e.preventDefault();
        const enteredOtp = userOTP.join("");
        if (enteredOtp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP",{
                position:'top-right'
            });
            return;
        }

        try{
        const res_results  = await dispatch(OTP_verify_API({otp:enteredOtp}))
        if(OTP_verify_API.fulfilled.match(res_results)){
            toast.success('Your email has been successfully verified!',{
                position:'top-right'
            })
            setTimeout(()=>{
                navigate('/login')
            }, 5000)
        }else{
            toast.error(res_results.payload || "OTP Verify failed", { position: "top-right" });
            console.log('Failed: ' + res_results.error.message);
        }    
        }catch(error){
            console.error("Error", error.message)
             toast.error("Something went wrong. Please try again.", { position: "top-right" });
        }
    }

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === "") {
            const newOtp = [...userOTP];
            newOtp[index] = value;
            setUserOTP(newOtp);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1].focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if (e.key === "Backspace" && index > 0 && !otp[index]) {
            inputRefs.current[index - 1].focus();
        }
    };
  return (
    <>
<section className='bg-gray-100 from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center p-4'>
    <div class="bg-white dark:bg-gray-700 shadow-2xl rounded-3xl w-full max-w-md overflow-hidden grid md:grid-cols-1 transform transition-transform duration-300 hover:scale-105">
        <div class="p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="mx-auto mb-6 w-48 h-48 animate-pulse">
                <circle cx="200" cy="200" r="150" fill="#3B82F6" />
                <circle cx="200" cy="200" r="120" fill="#FFFFFF" />
                <circle cx="200" cy="200" r="90" fill="#3B82F6" />
                <circle cx="200" cy="200" r="60" fill="#FFFFFF" />
                <text x="200" y="200" text-anchor="middle" fill="#2563EB" font-size="40" font-weight="bold" dy=".3em" class="text-center">OTP</text>
         </svg>
            <h2 class="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Verify OTP</h2>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">Enter the 6-digit code sent to Email</p>
            <div className='flex justify-center space-x-4 mb-6'>
            {/* OTP Input Fields */}
            <form onSubmit={User_Otp_Verify} className="flex justify-center space-x-4 mb-6">
                {userOTP.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-blue-400 transition-transform duration-300 hover:scale-110"
                    />
                ))}
            </form>    
            
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Didn't receive code?
                <a href="#" class="text-blue-500 hover:underline dark:text-blue-400 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-500">Resend OTP</a>
            </div>
            <Link to="/login">
            <button onClick={User_Otp_Verify} class="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600
                    transition-transform duration-300 hover:scale-105
                    dark:bg-blue-600 dark:hover:bg-blue-700">
                        Verify OTP
            </button>
            </Link>  
        </div>
    </div>
    <ToastContainer/>
</section>
    </>
  )
}

export default OTPverify
