"use client";
import Link from "next/link";
import { posts } from "@/app/dummyData";
import { useParams } from "next/navigation";
import { FaImage, FaRegEdit } from "react-icons/fa";
import { PiHandsClapping } from "react-icons/pi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { MdOutlineBookmarkAdd, MdIosShare } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import CommentList from "@/app/(components)/CommentList";

export default function page() {
  const { id } = useParams();
  const post = posts.find((p) => p._id === +id);

  const [file, setFile] = useState<any>(null);

  const updateImageSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file");
  };
  return (
    <>
      <div className="container flex flex-col items-center w-[60%] py-20">
        <ToastContainer theme="colored" />
        <h1 className="font-bold text-4xl mr-auto mb-6">{post?.title}</h1>
        <div className="profile flex mb-8 mr-auto">
          <img
            src={post?.user.image}
            alt="profile-img"
            className="w-[10%] rounded-full object-contain mr-2"
          />
          <div>
            <Link href="profile/1">
              {post?.user.username} · <span className="text-green-700">Follow</span>
            </Link>
            <div className="text-gray-500 text-sm mt-1">
              Published in <span className="text-black">{post?.category}</span>
              {" · "}
              <span>{post?.createdAt}</span>
            </div>
          </div>
        </div>
        <div className="info border-t border-b py-2 w-full flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <PiHandsClapping className="text-2xl text-gray-400 hover:text-black duration-300 hover:cursor-pointer" />
            <span className="ml-2">{post?.likes.length}</span>
          </div>
          {/* @TODO add comment feature 
          import { TfiThought } from "react-icons/tfi";
          <TfiThought />
          <span>{post?.comment}</span> */}
          <div className="flex items-center">
            <MdIosShare className="text-2xl text-gray-400 mr-4 hover:text-black duration-300 hover:cursor-pointer" />
            <MdOutlineBookmarkAdd className="text-2xl text-gray-400 hover:text-black duration-300 hover:cursor-pointer" />
          </div>
        </div>
        <div className="img-wrapper mt-12">
          <img
            src={file ? URL.createObjectURL(file) : post?.image}
            alt="main image"
            className="w-screen"
          />
          <form className="flex py-2" onSubmit={updateImageSubmitHandler}>
            <div className="flex items-center mr-4">
              <FaImage className="text-[#417ae6] mr-2 text-xl" />
              <label htmlFor="file" className="text-[#417ae6] font-bold text-xl">
                Select new image
              </label>
            </div>
            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files![0])}
            />
            <button
              type="submit"
              className="bg-[#417ae6] hover:bg-[#5a94ff] duration-300 rounded p-1 text-white"
            >
              upload
            </button>
          </form>
        </div>
        <p>
          {post?.description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus magnam quidem doloribus
          ipsa. Aperiam doloribus quis ab magni. Accusantium aperiam, molestias animi perspiciatis
          rem iste. Ab, ullam. Quas, cum eum.
        </p>
        <div className="flex ml-auto mt-4 text-xl">
          <FaRegEdit className="text-emerald-600" />
          <BsFillTrash3Fill className="text-red-600" />
        </div>
        <CommentList />
      </div>
    </>
  );
}
