import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
function App() {
  const [product, showProduct] = useState(false);
  const [WorkOut, showWorkOut] = useState(false);
  const [More, showMore] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-10 pt-20 pb-10 pl-10 pr-10">
        <header className="flex gap-10">
          <nav className="fixed top-0 right-0 w-full flex justify-end gap-5 px-10 py-4 bg-white shadow z-50">
            <div className="fixed top-3 left-3">
              <img
                src="https://www.hevyapp.com/wp-content/uploads/logo-hevy-black.svg"
                alt="conmpany alt"
                className="w-20 "
              />
            </div>
            <NavLink to="/">Home</NavLink>
            <div className="relative">
              <button
                className="flex gap-1"
                onClick={() => showProduct(!product)}
              >
                <p className="hover:underline">Products</p>{" "}
                <img
                  className="w-5"
                  src="src/images/seeMore.png"
                  alt="more icon"
                />
              </button>
              {product && (
                <div className="absolute top-full mt-2 bg-white shadow-md p-4 flex flex-col gap-2 z-50 w-50">
                  <NavLink to="/products">AI WorkOut Tracker </NavLink>
                  <NavLink to="/products">Use Case</NavLink>
                  <NavLink to="/products">Watch App </NavLink>
                  <NavLink to="/products">Elite </NavLink>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => showWorkOut(!WorkOut)}
                className="flex gap-1"
              >
                WorkOut{" "}
                <img
                  className="w-5"
                  src="src/images/seeMore.png"
                  alt="more icon"
                />
              </button>
              {WorkOut && (
                <div className="absolute top-full mt-2 bg-white shadow-md p-4 flex flex-col gap-2 z-50 w-40">
                  <NavLink to="/workout">Routine Database</NavLink>
                  <NavLink to="/workout">Routine Builder</NavLink>
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => showMore(!More)} className="flex gap-1">
                More{" "}
                <img
                  className="w-5"
                  src="src/images/seeMore.png"
                  alt="more icon"
                />
              </button>
              {More && (
                <div className="absolute top-full mt-2 bg-white shadow-md p-4 flex flex-col gap-3 z-50 w-40">
                  <NavLink to="more">About us</NavLink>
                  <NavLink to="more">Our Story</NavLink>
                  <NavLink t="more">Contact Us</NavLink>
                  <NavLink to="more">FAV</NavLink>
                  <NavLink to="more">Blog</NavLink>
                </div>
              )}
            </div>
            <button>Exercise</button>

            <button>Sign In</button>
            <button>Login In</button>
          </nav>
        </header>
        <div className="flex flex-col gap-10 m-20">
          <section className=" grid grid-cols-2 gap-10">
            <div className="mt-10 ml-10 flex flex-col gap-3">
              <h1 className="text-bold text-2xl">Track and plans Workouts</h1>
              <p className="text-gray-600">
                Plan workouts, access elite plans, use personalized metrics,
                <br /> and connect with a supportive community
              </p>
              <NavLink to="/start">
                <button className="bg-blue-400 px-4 py-1 rounded-md text-white flex gap-2">
                  Get started{" "}
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZQ-l_nx86IuxGqlWLuoE8wMBZ-g89KYeFwA&s"
                    alt="next-icon"
                    className="w-5 h-5 bg-blue-500"
                  />
                </button>
              </NavLink>
            </div>
            <img src="src/images/appdemo.webp" alt="log" />
          </section>

          <section className="grid grid-cols-2">
            <div className="flex flex-col gap-3 m-30">
              {" "}
              <h2 className="text-bold text-2xl">Create Personalized</h2>
              <h3>Workout plan</h3>
              <p className="text-gray-500">
                Personalize your training by building plans with your preferred
                exercises, rest time, supersets, equipment, or frequency
              </p>
              <NavLink to="/try it">
                <button className="bg-blue-500 px-4 py-1 rounded-md ">
                  try it for free
                </button>
              </NavLink>
            </div>
            <img className="" src="src/images/feature5.png" alt="phone logo" />
          </section>
          <section className="grid grid-cols-2 gap-10">
            <img src="src/images/feature6.png" alt="logo phone" />
            <div className="flex flex-col gap-4 m-30">
              <h2 className="font-bold text-2xl">Log fitness journey</h2>
              <p className="text-gray-500">
                Stay consistent by logging your progress from your mobile or
                watch. Follow exercise instructions to perfect your form, and
                take notes to remind yourself of important details
              </p>
              <NavLink to="/start" className="flex justify-center">
                <button className="text-white bg-blue-500 px-2 rounded-md">
                  Start Now
                </button>
              </NavLink>
            </div>
          </section>
          <section className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3 m-20">
              <h2 className="text-bold text-2xl">Optimize training with</h2>
              <h3 className="text-bold text-2xl">personalized metrics</h3>
              <p className="text-gray-500">
                Train smarter with muscle recovery breakdown and visualize your
                progress with 1RM, workout time, and weightlifting charts
              </p>
              <NavLink to="/start">
                <button className="bg-blue-500 px-2 rounded-md text-white">
                  try it for free
                </button>
              </NavLink>
            </div>
            <img src="src/images/feature7.png" alt="" />
          </section>
         </div>
          <section className="flex flex-col gap-5">
           <div className="flex justify-center">
             <h1 className="flex justify-center  text-bold text-2xl">
              Exercise Tips
            </h1>
           </div>
          <div className="grid grid-cols-3 gap-10">
            <div className="rounded-md cursor-pointer transform transition duration-3 hover:scale-103 bg-white p-3 outline outline-gray-500 flex flex-col gap-10">
              
                <img
                  className=""
                  src="src/images/handsome-man-is-engaged-gym-1-1024x683.webp"
                  alt="tense-muscle logo"
                />
                <h2>DO Clusters Sets Build More Strength And Muscle</h2>
                <p>
                  learn how to use clusters in your JEFIT Workout to build
                  strength ,maintain power and ,improve training...{" "}
                </p>
                <button className="flex relative text-blue-500">
                  <span className="hover:underline">Read Article</span>{" "}
                  <span className="absolute right-10">
                    <img
                    className="w-5 text-blue"
                    src="src/images/arrow right.png"
                    alt="next icon"
                  />
                  </span>
                </button>
              
            </div>
          
            <div className="rounded-md cursor-pointer transform transition duration-3 hover:scale-103 outline shadow outline-gray-400 flex flex-col gap-11">
             
                <img
                  className="rounded-md cursor-pointer "
                  src="src/images/tense-muscles-hands-load-man-doing-exercise-biceps-gym-work-tell-muscles-simulator-photos-sporting-magazines-posters-websites-1024x683.webp"
                  alt="hands-load man"
                />

                <h2>Do Clusters Sets Build More Strength And Muscle</h2>
                <p>
                  learn how to use clusters in your JEFIT Workout to build
                  strength ,maintain power and ,improve training...{" "}
                </p>
                <button className="flex relative">
                  <span className="text-blue-500">Read Article</span>{" "}
                 <span className="absolute right-10">
                   <img
                    className="w-5"
                    src="src/images/arrow right.png"
                    alt="next icon"
                  />
                 </span>
                </button>
              
            </div>
            <div className="rounded-md cursor-pointer transform transition duration-3 hover:scale-103 outline outline-gray-400 flex flex-col gap-8">
              
                <img
                  className="rounded-md cursor-pointer "
                  src="src/images/exercising-biceps-with-barbell-white-bricks-background-1024x683.webp"
                  alt="exercising-biceps"
                />
                <h2 className="text-bold text-2xl ml-10">Do Clusters Sets Build More Strength And Muscle</h2>
                <p className="text-gray-500"> 
                  learn how to use clusters in your JEFIT Workout to build
                  strength ,maintain power and ,improve training...{" "}
                </p>
                <button className="flex relative">
                  <span className=" text-blue-500 ">Read Article</span>{" "}
                 <span className="flex absolute right-10"> <img 
                    className="w-5 "
                    src="src/images/arrow right.png"
                    alt="next icon"
                  /></span>
                </button>
            
            </div>
          </div>
          </section>
       
      </div>
    </>
  );
}

export default App;
