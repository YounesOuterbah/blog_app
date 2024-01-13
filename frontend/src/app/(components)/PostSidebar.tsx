import Image from "next/image";
import subscribeIMG from "/public/images/Email-Icon.png";
import { useState } from "react";

export default function PostSidebar() {
  const [categoryArr, setCategoryArr] = useState<string[]>([
    "Software Engineering",
    "Web Development",
    "Programming",
    "Self Imporvment",
    "Relationships",
    "Productivity",
  ]);

  return (
    <div className="border-l-2 mx-auto pl-2">
      <div className="categories my-6">
        <h1 className="p-2 font-bold">Recomended topics</h1>
        <div className="boxs flex flex-wrap">
          {categoryArr.map((item, key) => (
            <div key={key} className="bg-[#f2f2f2] rounded-full text-sm cursor-pointer p-2 m-1">
              {item}
            </div>
          ))}
        </div>
      </div>
      {/*
      *** idont know what to do with this piece of code maybe i will turn it into pop-up news letter ***
        <div className="subscribe">
        <Image className="w-2/4 mx-auto" src={subscribeIMG} alt="email-icon" />
        <span className="block text-center text-[#284c8e] font-bold text-2xl">SUBSCRIBE</span>
        <p className="text-[#284c8e] text-sm text-center">
          Subscribe to our newsletter and stay updated
        </p>
        <div>
          <input
            type="email"
            className="bg-[#5f81c0] text-white outline-none p-2 w-full m-2 rounded-full text-sm"
            placeholder="Your Email"
          />
          <button className=" mx-2 p-2 w-full text-sm rounded-full text-[#284c8e]">Submit</button>
        </div>
        </div>
      *** idont know what to do with this piece of code maybe i will turn it into pop-up news letter ***
      */}
    </div>
  );
}
