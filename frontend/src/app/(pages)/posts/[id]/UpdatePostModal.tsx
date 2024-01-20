import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

interface UpdatePostModalProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  post: any;
}

export default function UpdatePostModal({ toggle, setToggle, post }: UpdatePostModalProps) {
  const [title, setTitle] = useState<string>(post.title);
  const [description, setDescription] = useState<string>(post.description);
  const [category, setCategory] = useState<string>(post.category);

  const updateArticleHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "") return toast.error("Post Description is required");
  };

  return (
    <>
      <div
        className={`${
          toggle ? "overlay fixed w-full h-full bg-[#0000009c] top-0 left-0" : "hidden"
        } `}
      ></div>
      <div className={`w-96 shadow-xl bg-white p-2 rounded ${toggle ? "fixed" : "hidden"}`}>
        <div className="flex items-center justify-between mb-4">
          <ToastContainer />
          <h1 className="text-[#247d6a] text-2xl font-bold text-center">Update Post</h1>
          <abbr title="close">
            <IoClose
              className="text-[crimson] ml-auto text-2xl cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
          </abbr>
        </div>
        <form onSubmit={updateArticleHandler}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded border mb-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded outline-none border mb-2"
          >
            <option value="">programming</option>
            <option value="">gaming</option>
            <option value="">gym</option>
          </select>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border outline-none p-2 rounded resize-none"
          ></textarea>
          <button type="submit" className="bg-[#247d6a] p-2 rounded text-white w-full">
            Update Post
          </button>
        </form>
      </div>
    </>
  );
}
