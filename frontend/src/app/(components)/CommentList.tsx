import { useState } from "react";
import AddComment from "./AddComment";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function CommentList() {
  const [toggle, setToggle] = useState<boolean>(true);
  return (
    <>
      <div
        className={`${
          toggle ? "overlay fixed w-full h-full bg-[#00000036] top-0 left-0" : "hidden"
        } `}
      ></div>
      <div
        className={`${
          toggle
            ? "bg-white p-4 shadow-lg fixed h-full top-0 right-0 w-[30%] overflow-y-scroll"
            : "hidden"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="text-xl mb-4 font-bold">
            Responses <span>(2)</span>
          </div>
          <IoClose className="text-2xl" onClick={() => setToggle(!toggle)} />
        </div>
        <AddComment />
        <hr />
        <div className="comments-wrapper my-6">
          {[1, 2].map((comment) => (
            <div key={comment} className="mb-6 border-b pb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCxe7s30cFmp2jXTxlYKqUo79h2S0re4C0g&usqp=CAU"
                    alt="profile img"
                    className="w-10 rounded-full h-10 object-cover mr-2"
                  />
                  <div>
                    <span>Younes Outerbah</span>
                    <div className="text-sm text-[#969696]">about 2 months ago</div>
                  </div>
                </div>
                {/* @TODO delete and edit method */}
                <HiDotsHorizontal />
              </div>
              <p className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, et?
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
