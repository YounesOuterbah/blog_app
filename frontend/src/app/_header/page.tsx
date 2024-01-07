"use client";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";

export default function Header() {
  const [toggle, setToggle] = useState<boolean>(true);

  function handelClick() {
    setToggle(!toggle);
    console.log(toggle);
  }
  return (
    <div className="header bg-black text-white py-2">
      <div className="container flex items-center justify-between">
        <div className="logo font-bold text-xl flex items-center">
          <FaBars className="cursor-pointer md:hidden mr-4" onClick={handelClick} />
          Medium
        </div>
        <ul className={`items-center hidden md:flex`}>
          <li className="mr-2 cursor-pointer">Home</li>
          <li className="mr-2 cursor-pointer">Posts</li>
          <li className="mr-2 cursor-pointer">Create</li>
          <li className="cursor-pointer">Admin Dashboard</li>
        </ul>
        {toggle && (
          <ul
            className={`items-center absolute px-8 md:hidden bg-red-400 top-[44px] left-0 w-full`}
          >
            <li className="cursor-pointer my-4 bg-red-600 hover:bg-red-800 duration-300 p-2 rounded">
              Home
            </li>
            <li className="cursor-pointer my-4 bg-red-600 hover:bg-red-800 duration-300 p-2 rounded">
              Posts
            </li>
            <li className="cursor-pointer my-4 bg-red-600 hover:bg-red-800 duration-300 p-2 rounded">
              Create
            </li>
            <li className="cursor-pointer my-4 bg-red-600 hover:bg-red-800 duration-300 p-2 rounded">
              Admin Dashboard
            </li>
          </ul>
        )}
        <div className="buttons">
          <button className="mr-2">Login</button>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
}
