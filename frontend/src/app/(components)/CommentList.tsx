import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import AddComment from "./AddComment";

interface Comment {
  id: number;
  body: string;
}

interface commentProps {
  setCommentToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentList({ setCommentToggle }: commentProps) {
  const commentArray: Comment[] = [
    { id: 1, body: "hi am comment 1" },
    { id: 2, body: "hi am comment 2" },
    { id: 3, body: "hi am comment 3" },
  ];

  const [toggle, setToggle] = useState<boolean>(true);
  const [comments, setComments] = useState(commentArray);
  const [editComment, setEditComment] = useState<number | null>(null);

  const handleCommentEdit = (commentId: number, newText: string) => {
    setComments((prevComments) =>
      prevComments.map((prevComment) =>
        prevComment.id === commentId ? { ...prevComment, body: newText } : prevComment
      )
    );
  };

  return (
    <>
      <div
        className={`${
          toggle ? "overlay fixed w-full h-full bg-[#00000036] top-0 left-0" : "hidden"
        }`}
      ></div>
      <div
        className={`${
          toggle
            ? "bg-white p-4 shadow-lg fixed h-full top-0 right-0 w-full lg:w-[30%] overflow-y-scroll"
            : "hidden"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="text-xl mb-4 font-bold">
            Responses <span>(2)</span>
          </div>
          <IoClose className="text-2xl cursor-pointer" onClick={() => setCommentToggle(false)} />
        </div>
        <AddComment />
        <hr />
        <div className="comments-wrapper my-6">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-6 border-b pb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center justify-between">
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
                <HiDotsHorizontal
                  className="cursor-pointer"
                  onClick={() => setEditComment(comment.id)}
                />
              </div>
              <p className="mt-2 ml-2" onClick={() => console.log(comment.id, comment.body)}>
                {comment.body}
              </p>
              {editComment === comment.id && (
                <>
                  <input
                    type="text"
                    className="border"
                    value={comment.body}
                    onChange={(e) => handleCommentEdit(comment.id, e.target.value)}
                  />
                  <button>Edit</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
