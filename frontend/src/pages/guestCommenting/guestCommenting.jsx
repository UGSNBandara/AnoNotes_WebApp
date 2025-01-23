import React, { useState } from "react";

const GuestCommenting = () => {
  const [initialText, setInitialText] = useState("Welcome to the guest commenting system!"); // Placeholder text
  const [comment, setComment] = useState("");

  // Mock function to handle sending a comment
  const handleSend = () => {
    if (comment.trim() !== "") {
      console.log("Comment sent:", comment);
      setComment(""); // Clear input after sending
    } else {
      alert("Please type a comment before sending.");
    }
  };

  // Mock function to create a link
  const handleCreateLink = () => {
    console.log("Create a link button clicked!");
    // Placeholder for backend implementation
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Display Initial Text */}
      <div className="p-4 bg-gray-100 border rounded-lg shadow-md">
        <p className="text-lg font-semibold">{initialText}</p>
      </div>

      {/* Input Box with Send Button */}
      <div className="flex items-center border rounded-lg p-2 bg-white shadow-md">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
          className="flex-grow px-4 py-2 border-none focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>

      {/* Create a Link Button */}
      <div className="text-center">
        <button
          onClick={handleCreateLink}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none"
        >
          Create a Link for Me
        </button>
      </div>
    </div>
  );
};

export default GuestCommenting;
