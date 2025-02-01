import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GuestCommenting = () => {
  const [initialText, setInitialText] = useState("Welcome to the guest commenting system!"); // Placeholder text
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const handleSend = () => {
    if (comment.trim() !== "") {
      console.log("Comment sent:", comment);
      setComment("");
    } else {
      alert("Please type a comment before sending.");
    }
  };

  const handleCreateLink = () => {
    navigate('/');
  };

  return (
    <div className="max-w-2xl h-full mx-auto p-4 space-y-10">
      <div className="p-4 bg-gray-100 border rounded-lg shadow-md">
        <p className="text-lg font-semibold">{initialText}</p>
      </div>


      <div className="flex flex-col items-start border rounded-lg p-2 bg-white shadow-md">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
          className="w-full px-4 py-2 border rounded focus:outline-none h-20 resize-none"
        />
        <button
          onClick={handleSend}
          className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>


      <div className="text-center">
        <button
          onClick={handleCreateLink}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none"
        >
          Create a Link for Me
        </button>
      </div>
    </div>
  );
};

export default GuestCommenting;
