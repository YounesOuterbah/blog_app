"use client";

import { useState } from "react";
import PostList from "./(components)/PostList";
import PostSidebar from "./(components)/PostSidebar";

export default function Home() {
  const [items, setItems] = useState<string[]>([
    "For You",
    "Software Engineering",
    "Web Development",
    "Programming",
  ]);

  // @CODE for topics controller
  // const [selected, setSelected] = useState<string>("");

  // const handelClick = (index: number) => {
  //   setSelected(items[index]);
  // };

  return (
    <>
      <div className="home pt-8">
        <div className="container flex flex-row">
          <div className="md:basis-9/12">
            {/* 
            controller for topics to choose between 
            <ul className="controller flex items-center border-b-2 text-sm">
              {items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handelClick(index)}
                  className={`mr-2 cursor-pointer hover:text-black border-b-2 -mb-[2px] duration-300 py-2 px-2 ${
                    selected === item ? "text-black border-blue-500" : "text-[#6d6d6d]"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
           */}
            <div className="posts mt-12">
              <PostList />
            </div>
          </div>
          <div className="side hidden md:basis-1/4 md:flex">
            <PostSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
