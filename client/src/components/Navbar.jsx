import React, { useState } from "react";

import A_Logo from "../assets/A_Logo.png";

const Navbar = () => {
  const [collapseToggle, setCollapseToggle] = useState(false);

  return (
    <div className="w-full h-[60px] md:h-full bg-slate-900 pt-2.5 sticky pb-2.5">
      <div
        className="flex justify-around text-white"
        style={{ fontFamily: "montserrat" }}
      >
        <div>
          <a href="/" className="flex items-center">
            <img
              src={A_Logo}
              alt="Logo"
              className="w-16 h-16 rounded-lg hidden lg:flex"
            />
            <h1 className="text-2xl font-mono ml-2.5">Commerce</h1>
          </a>
        </div>
        <div className="hidden lg:flex space-x-8 items-center justify-center">
          <a href="/products">Products</a>
          <a href="/costumers">Costumers</a>
          <a href="/transactions">Transactions</a>
          <a href="/events">Events</a>
        </div>
        <div className="items-center space-x-8 mx-2 hidden lg:flex">
          <a href="/" className="text-lg hover:opacity-50">
            Contact
          </a>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="text-lg px-6 py-2 bg-blue-900 bg-opacity-50 rounded-3xl text-blue-500 hover:opacity-80"
          >
            About
          </button>
        </div>
      </div>
      {collapseToggle ? (
        <>
          <div className="flex lg:hidden absolute top-3 ml-2 text-white">
            <button
              className="p-2"
              onClick={() => setCollapseToggle(!collapseToggle)}
            >
              <div className="space-y-2">
                <div className="w-8 h-0.5 bg-gray-600"></div>
                <div className="w-8 h-0.5 bg-gray-600"></div>
                <div className="w-8 h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>
          <div
            className="lg:hidden flex space-x-10 p-8 items-center justify-center text-white bg-slate-900 h-12 mt-4"
            onClick={() => setCollapseToggle(!collapseToggle)}
          >
            <a href="/login" className="text-lg hover:opacity-50">
              Login
            </a>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="text-lg px-6 py-2 bg-blue-900 bg-opacity-50 rounded-3xl text-blue-500 hover:opacity-80"
            >
              Sign Up
            </button>
          </div>
        </>
      ) : (
        <div className="flex lg:hidden absolute top-3 ml-2 text-white">
          <button
            className="p-2"
            onClick={() => setCollapseToggle(!collapseToggle)}
          >
            <div className="space-y-2">
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <div className="w-8 h-0.5 bg-gray-600"></div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
