"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function HeaderList() {
  const [toggle, setToggle] = useState<boolean>(false);
  function handelClick() {
    setToggle(!toggle);
  }
  return (
    <>
      <div className="logo font-bold text-xl flex items-center">
        {toggle ? (
          <IoClose className="cursor-pointer md:hidden mr-4" onClick={handelClick} />
        ) : (
          <FaBars className="cursor-pointer md:hidden mr-4" onClick={handelClick} />
        )}
        Middle
      </div>
      <ul className={`items-center hidden md:flex`}>
        <Link href="/" className="mr-2 cursor-pointer">
          Home
        </Link>
        <Link href="/posts" className="mr-2 cursor-pointer">
          Posts
        </Link>
        <Link href="/posts/createPost" className="mr-2 cursor-pointer">
          Create
        </Link>
        <Link href="/admin" className="cursor-pointer">
          Admin Dashboard
        </Link>
      </ul>
      {toggle && (
        <ul className={`items-center absolute px-8 md:hidden bg-red-400 top-[60px] left-0 w-full`}>
          <li className="cursor-pointer my-4 bg-red-600 hover:bg-red-800 duration-300 p-2 rounded">
            <Link
              className="block w-full"
              href="/"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Home
            </Link>
          </li>
          <li className="cursor-pointer my-4 bg-red-600 hover:bg-red-800 duration-300 p-2 rounded">
            <Link
              className="block w-full"
              href="/posts"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Posts
            </Link>
          </li>
          <li className="cursor-pointer my-4 bg-red-600 hover:bg-red-800 duration-300 p-2 rounded">
            <Link
              className="block w-full"
              href="/posts/createPost"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Create
            </Link>
          </li>
          <li className="cursor-pointer my-4 bg-red-600 hover:bg-red-800 duration-300 p-2 rounded">
            <Link
              className="block w-full"
              href="/admin"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Admin Dashboard
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
