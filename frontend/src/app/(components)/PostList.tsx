"use client";
import { posts } from "../dummyData";
import { MdOutlineBookmarkAdd } from "react-icons/md";

export default function PostList() {
  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="p-4 rounded border-b mb-10">
          <div className="auth flex items-center mb-2 cursor-pointer">
            <img src={post.user.image} className="rounded-full w-6 mr-2" alt={post.user.username} />
            <p className="text-xs">{post.user.username} ·</p>
            <span className="ml-2 text-[#6d6d6d] text-[11px]">{post.createdAt}</span>
          </div>
          <div className="flex-col-reverse md:flex-row flex justify-between gap-x-16 cursor-pointer">
            <div className="txt">
              <h3 className="font-bold mb-1">{post.title}</h3>
              <p className="leading-6 line-clamp-3 font-serif text-[#242424]">
                {post.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus harum tempore consequatur deleniti quisquam natus voluptate laboriosam
                eveniet recusandae magni, ipsam obcaecati optio! Aspernatur saepe dolore
                consequuntur deleniti ex quasi incidunt nemo atque inventore quis.
              </p>
              <div className="flex items-center justify-between mt-10">
                <div className="text-sm rounded bg-[#eee] w-fit p-1">Programming</div>
                <MdOutlineBookmarkAdd className="text-2xl text-gray-400 hover:text-black duration-300" />
              </div>
            </div>
            <img className="mb-2 md:max-w-[20%] object-cover" src={post.image} alt={post.title} />
          </div>
        </div>
      ))}
    </>
  );
}
