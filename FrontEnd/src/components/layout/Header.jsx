import { NavLink } from "react-router-dom";
import { useState } from "react";
import seeMore from "../../assets/images/seeMore.png";
import jim from "../../assets/images/jim.png"
export default function Header() {
  const [product, showProduct] = useState(false);
  const [workOut, showWorkOut] = useState(false);
  const [more, showMore] = useState(false);

  return (
    <nav className="fixed top-0 right-0 w-full flex justify-end gap-5 px-10 py-4 bg-white shadow z-50">
      <div className="fixed top-0 left-0 flex">
        <img
          src={jim}
          alt="company logo"
          className="w-30"
        />
        <h1 className="fixed top-10 left-25">PEFIT</h1>
      </div>

      <NavLink to="/">Home</NavLink>

      <div className="relative">
        <button
          className="flex gap-1"
          onClick={() =>{
             showProduct(!product)
             showMore(false)
             showWorkOut(false)
            }}
          aria-haspopup="true"
          aria-expanded={product}
        >
          <p className="hover:underline cursor-pointer">Products</p>
          <img
            className="w-5"
            src={seeMore}
            alt="more icon"
          />
        </button>
        {product && (
          <div className="absolute top-full mt-2 bg-white shadow-md p-4 flex flex-col gap-2 z-50 w-50">
            <NavLink to="/products">AI WorkOut Tracker</NavLink>
            <NavLink to="/products">Use Case</NavLink>
            <NavLink to="/products">Watch App</NavLink>
            <NavLink to="/products">Elite</NavLink>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => {
            showWorkOut(!workOut)
           showMore(false)
           showProduct(false)
          }}
          className="flex gap-1"
          aria-haspopup="true"
          aria-expanded={workOut}
        >
          <span className="hover:underline">WorkOut</span>
          <img
            className="w-5"
            src={seeMore}
            alt="more icon"
          />
        </button>
        {workOut && (
          <div className="absolute top-full mt-2 bg-white shadow-md p-4 flex flex-col gap-2 z-50 w-40">
            <NavLink to="/workout">Routine Database</NavLink>
            <NavLink to="/workout">Routine Builder</NavLink>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => 
            {showMore(!more)
              showWorkOut(false)
              showProduct(false)
            }
          }
          className="flex gap-1"
          aria-haspopup="true"
          aria-expanded={more}
        >
         <span className="hover:underline"> More</span>
          <img
            className="w-5"
            src={seeMore}
            alt="more icon"
          />
        </button>
        {more && (
          <div className="absolute top-full mt-2 bg-white shadow-md p-4 flex flex-col gap-3 z-50 w-40">
            <NavLink to="/more">About us</NavLink>
            <NavLink to="/more">Our Story</NavLink>
            <NavLink to="/more">Contact Us</NavLink>
            <NavLink to="/more">FAV</NavLink>
            <NavLink to="/more">Blog</NavLink>
          </div>
        )}
      </div>

      <button className="hover:underline">Exercise</button>
      <button className="hover:underline">Sign In</button>
      <button className="hover:underline">Login In</button>
    </nav>
  );
}