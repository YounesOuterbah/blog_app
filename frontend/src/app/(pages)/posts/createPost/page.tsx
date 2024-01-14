"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function page() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<any>(null);

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "") return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");

    const formData = new FormData();
    formData.append("img", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    console.log({ title, category, description, file });
  };

  return (
    <>
      <ToastContainer theme="colored" />
      <div className="container w-5/6 py-20">
        <h1 className="mb-10 text-4xl font-bold text-center">Create New Post</h1>
        <form className="flex flex-wrap" onSubmit={formSubmitHandler}>
          <input
            className="w-full px-4 py-2 rounded mb-2 border-2 border-slate-500"
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="w-full px-4 py-2 rounded mb-2 border-2 border-slate-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled>Select A Category</option>
            <option value="select">Select</option>
            <option value="hello">tht</option>
            <option value="by">sdf</option>
          </select>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded px-4 py-2 resize-none mb-2 border-2 border-slate-500"
            placeholder="Post Description"
            rows={5}
          ></textarea>
          <input
            className="w-full bg-[#6e788c] p-2 rounded mb-2"
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files![0])}
          />
          <button className="w-full border rounded p-2 text-white bg-slate-800" type="submit">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
