import React from "react";
import SignUpCard from "../components/PortalComponents/SignUpCard";
import LoginCard from "../components/PortalComponents/LoginCard";
import LakeLand from "../assets/houses/lake-land.png";
import { Link, useParams } from "react-router-dom";

function AccountPortal() {
  const { type } = useParams();

  return (
    <div className="relative">
      <Link to="/">
        <div
          className="font-ubuntu font-bold text-white text-2xl py-2 px-6 
          top-8 left-12 bg-purple-500 absolute cursor-pointer"
        >
          <div className="hover:scale-110 active:scale-90 duration-300">
            FF-Land
          </div>
        </div>
      </Link>

      <div
        className="sm:grid grid-cols-2 bg-purple-900 min-h-screen text-center
        py-36 overflow-hidden"
      >
        <div className="lg:pl-52 md:pl-20 sm:pl-10 px-4 relative z-10">
          <div className="font-ubuntu text-white font-bold text-5xl py-7">
            <div className="">Reach your</div>
            <div
              className="text-transparent bg-clip-text 
              bg-gradient-to-tr from-orange to-purple-300 "
            >
              Passive Income Goal
            </div>
          </div>
          <div className="font-ubuntu font-regular text-lg text-white">
            Whilst having fun and socialising with other players at the same
            time!
          </div>

          <img src={LakeLand} alt="LakeLand" className="sm:absolute  
           md:max-w-2xl sm:max-w-xl sm:right-0 translate-x-72 sm:mt-6  
          max-w-md px-4 sm:block hidden"/>
        </div>
        <div className="sm:mt-0 mt-16 z-10">
          {/* Add Error Page */}
          {type === "signup" ? (
            <SignUpCard />
          ) : type === "login" ? (
            <LoginCard />
          ) : (
            "Insert Error Page"
          )}
        </div>
        <img
          src={LakeLand}
          alt="LakeLand"
          className="sm:hidden block mt-10"
        />
      </div>
    </div>
  );
}
export default AccountPortal;
