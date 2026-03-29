import { NavLink } from "react-router-dom";
import facebook from "../../assets/images/facebook.jpeg";
import twitter from "../../assets/images/twitter.png";
import instagram from "../../assets/images/instagram.jpeg";
import { useState } from "react";
export default function Footer() {
     const [isOn, setIsOn] = useState(false);
  return (
    <>
      <div className="">
        <section className="grid grid-cols-4 gap-4">
          <div>
          <div className="flex">
              <NavLink>
              <img src={facebook} alt="facebook logo" className="w-10" />
            </NavLink>
            <NavLink>
              <img src={twitter} alt="twitter logo" className="w-10" />
            </NavLink>
            <NavLink>
              <img src={instagram} alt="instagram logo" className="w-10"/>
            </NavLink>
          </div>
            
            <div className="flex items-center space-x-4">
  {/* Label */}
  <span className="text-gray-800 font-medium">Dark Mode</span>

  {/* Toggle */}
  <button
    onClick={() => setIsOn(!isOn)}
    className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
      isOn ? "bg-green-500" : "bg-gray-300"
    }`}
  >
    {/* Sliding circle */}
    <span
      className="absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 top-1 left-1"
      style={{ transform: isOn ? "translateX(100%)" : "translateX(0)" }}
    ></span>

    {/* Optional icons */}
    <svg
      className={`absolute right-1 top-2 w-4 h-4 text-gray-500 transition-opacity duration-300 ${
        isOn ? "opacity-0" : "opacity-100"
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
    <svg
      className={`absolute right-1 w-4 h-4 text-blue-500 transition-opacity duration-300 ${
        isOn ? "opacity-100" : "opacity-0"
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  </button>
</div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="flex justify-center">Product</h1>
            <div className="flex flex-col text-gray-400 gap-3">
            <button className="hover:underline">Elite Member</button>
            <button className="hover:underline"> Coach</button>
            <button className="hover:underline">Signup</button>
            <button className="hover:underline">Login</button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="flex justify-center">Resources</h1>
             <div className="flex flex-col  text-gray-400 gap-3">
                <button className="hover:underline">Workout Plans</button>
            <button className="hover:underline">Exercise Database</button>
            <button className="hover:underline">Community</button>
             </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="flex justify-center">Support</h1>
             <div className="flex flex-col text-gray-400 gap-3">
            <button className="hover:underline">ABOUT US</button>
            <button className="hover:underline">Contact US </button>
            <button className="hover:underline">FAQ</button>
            <button className="hover:underline">BLOG</button>
             </div>
          </div>
         
        </section>
        <p className="fixed let-1 bottom-2">&copy; at 2026 PEFIT inc all wright reserved </p>
      </div>
    </>
  );
}
