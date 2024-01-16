"use client";
import { useState } from "react";
import { FaBold, FaItalic } from "react-icons/fa6";

export default function AddComment() {
  const [text, setText] = useState<string>("");
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={formSubmitHandler} className="p-2 rounded shadow-md">
        <div className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCxe7s30cFmp2jXTxlYKqUo79h2S0re4C0g&usqp=CAU"
            alt="profile img"
            className="w-10 rounded-full h-10 object-cover mr-2"
          />
          <span>Younes Outerbah</span>
        </div>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What are your thoughts?"
          className={`resize-none p-1 w-full outline-none mt-4 ${bold && "font-bold"} ${
            italic && "italic"
          }`}
        ></textarea>
        <div className="flex items-center justify-between">
          <div className="icons flex">
            <FaBold
              onClick={() => setBold((prev) => !prev)}
              className={`mr-2 text-2xl cursor-pointer duration-300 ${
                bold ? "bg-[#e8f3e8] text-[#1a8917] p-1 rounded" : "bg-transparent text-black"
              }`}
            />
            <FaItalic
              onClick={() => setItalic((prev) => !prev)}
              className={`text-2xl cursor-pointer duration-300 ${
                italic ? "bg-[#e8f3e8] text-[#1a8917] p-1 rounded" : "bg-transparent text-black"
              }`}
            />
          </div>
          <input
            type="submit"
            value="Respond"
            className={`${
              text.length !== 0 ? "bg-[#358335ee] cursor-pointer" : "bg-[#3583358f]"
            } text-white p-2 rounded duration-300`}
          />
        </div>
      </form>
      <div className="w-full border mt-6"></div>
    </>
  );
}
