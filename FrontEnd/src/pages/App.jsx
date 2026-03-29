import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "../App.css";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
// ✅ Import all images correctly
import feature5 from "../assets/images/feature5.png";
import feature6 from "../assets/images/feature6.png";
import feature7 from "../assets/images/feature7.png";

import article1 from "../assets/images/handsome-man-is-engaged-gym-1-1024x683.webp";
import article2 from "../assets/images/tense-muscles-hands-load-man-doing-exercise-biceps-gym-work-tell-muscles-simulator-photos-sporting-magazines-posters-websites-1024x683.webp";
import article3 from "../assets/images/exercising-biceps-with-barbell-white-bricks-background-1024x683.webp";

function App() {
  return (
    <>
      <Header />

      <div className="flex flex-col gap-20 pt-20 pb-10 pl-10 pr-10">
        <div className="flex flex-col gap-10 m-20">

          {/* SECTION 1 */}
          <section className="grid grid-cols-2 gap-10">
            <div className="mt-10 ml-10 flex flex-col gap-3">
              <h1 className="text-bold text-2xl">Track and plans Workouts</h1>
              <p className="text-gray-600">
                Plan workouts, access elite plans, use personalized metrics,
                <br /> and connect with a supportive community
              </p>

              <NavLink to="/start">
                <button className="bg-blue-500 px-4 py-1 rounded-md text-white flex justify-between gap-2 hover:bg-blue-400 shadow-lg">
                  Get started
                <div className="flex items-center">
                         <svg className="  text-white " width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7"/>
               </svg>
                </div>
                </button>
              </NavLink>
            </div>

            {/* ✅ FIXED */}
            <img src={feature5} alt="feature" />
          </section>

          {/* SECTION 2 */}
          <section className="grid grid-cols-2">
            <div className="flex flex-col gap-3 m-30">
              <h2 className="text-bold text-2xl">Create Personalized</h2>
              <h3>Workout plan</h3>
              <p className="text-gray-500">
                Personalize your training by building plans with your preferred
                exercises, rest time, supersets, equipment, or frequency
              </p>

              <NavLink to="/try">
                <button className="bg-blue-500 px-4 py-1 rounded-md text-white hover:bg-blue-400">
                  try it for free
                </button>
              </NavLink>
            </div>

            {/* ✅ FIXED */}
            <img src={feature5} alt="phone logo" />
          </section>

          {/* SECTION 3 */}
          <section className="grid grid-cols-2 gap-10">
            {/* ✅ FIXED */}
            <img src={feature6} alt="logo phone" />

            <div className="flex flex-col gap-4 m-30">
              <h2 className="font-bold text-2xl">Log fitness journey</h2>
              <p className="text-gray-500">
                Stay consistent by logging your progress from your mobile or
                watch. Follow exercise instructions to perfect your form, and
                take notes to remind yourself of important details
              </p>

              <NavLink to="/start" className="flex justify-center">
                <button className="text-white bg-blue-500 px-2 rounded-md hover:bg-blue-400">
                  Start Now
                </button>
              </NavLink>
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3 m-20">
              <h2 className="text-bold text-2xl">
                Optimize training with
              </h2>
              <h3 className="text-bold text-2xl">
                personalized metrics
              </h3>
              <p className="text-gray-500">
                Train smarter with muscle recovery breakdown and visualize your
                progress with 1RM, workout time, and weightlifting charts
              </p>

              <NavLink to="/start">
                <button className="bg-blue-500 px-2 rounded-md text-white hover:bg-blue-400 ">
                  try it for free
                </button>
              </NavLink>
            </div>

            {/* ✅ FIXED */}
            <img src={feature7} alt="feature 7" />
          </section>
        </div>

        {/* ARTICLES */}
        <section className="flex flex-col gap-5">
          <div className="flex justify-center">
            <h1 className="text-bold text-2xl">Exercise Tips</h1>
          </div>

          <div className="grid grid-cols-3 gap-10">

            {/* CARD 1 */}
            <div className="rounded-md hover:scale-105 transition bg-white p-3 outline outline-2 outline-gray-200 flex flex-col gap-5 shadow-lg">
              <img src={article1} alt="article" />
              <h2>DO Cluster Sets Build More Strength And Muscle</h2>
              <p>
                Learn how to use clusters in your workout to build strength,
                maintain power, and improve training...
              </p>

              <button className="flex justify-between text-blue-500">
                <span className="hover:underline">Read Article</span>
                 <svg className="bg-blue-500 text-white rounded-full" width="20" height="20" viewBox="0 0 24 24 " fill="none" stroke="currentColor" strokeWidth='2'>
                <path d="M5 12h14M13 5l7 7-7 7"/>
                 </svg>
              </button>
            </div>

            {/* CARD 2 */}
            <div className="rounded-md hover:scale-105 transition outline shadow outline-gray-200 outline-2 flex flex-col gap-5 shadow-lg">
              <img src={article2} alt="article" />

              <h2>Do Cluster Sets Build More Strength And Muscle</h2>
              <p>
                Learn how to use clusters in your workout to build strength...
              </p>

              <button className="flex justify-between text-blue-500">
                <span className="hover:underline">Read Article</span>
               <svg className="bg-blue-500 text-white rounded-full" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7"/>
               </svg>
              </button>
            </div>

            {/* CARD 3 */}
            <div className="rounded-md hover:scale-105 transition outline outline-2 outline-gray-200 flex flex-col gap-5 p-4 shadow-lg">
              <img src={article3} alt="article" />

              <h2 className="text-2xl">
                Do Cluster Sets Build More Strength And Muscle
              </h2>

              <p className="text-gray-500">
                Learn how to use clusters in your workout to build strength...
              </p>

              <button className="flex justify-between text-blue-500">
                <span className="hover:underline">Read Article</span>
                 <svg className="bg-blue-500 text-white rounded-full" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7"/>
               </svg>
              </button>
            </div>

          </div>
        </section>
       <Footer/>
      </div>
    </>
  );
}

export default App;
