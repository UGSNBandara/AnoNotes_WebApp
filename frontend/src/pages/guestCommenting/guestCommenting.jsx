import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GuestCommenting = () => {
  const [initialText, setInitialText] = useState("Welcome to the Ano commenting!"); // Placeholder text
  const [comment, setComment] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [userID, setUserID] = useState("");

  const { userID: urlUserID } = useParams();

  useEffect(() => {
    if (urlUserID) {
      setUserID(urlUserID)
    }
  }, [urlUserID]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5555/api/users/userdetails/${userID}`);

        if (!response.ok) {
          console.log("Response Error");
          return;
        }

        const result = await response.json();

        if (!result.success) {
          console.log(result.message);
          return;
        }

        if (!result.details) {
          console.log("Target user not found!");
          return;
        }

        setUsername(result.details.username);
        setMessage(result.details.message);
        console.log("User data fetched successfully");
      } catch (err) {
        console.log(err);
      }
    };

    if (userID) {
      fetchUserData();
    }
  }, [userID]);


  useEffect(() => {

    console.log(message);
    if (message != "No massage provided") {
      setInitialText(`${username} : ${message}`);
    }
    else {
      setInitialText(`${username} : Hello Tell something about me !`);
    }
  }, [message]);

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
    window.open('/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-fuchsia-500 to-cyan-500 flex justify-center items-center">
      <div className="max-w-3xl w-full p-6 space-y-10 bg-white bg-opacity-50 rounded-lg shadow-lg">
        <div className="p-4 bg-gray-100 border rounded-lg shadow-md w-full mb-8">
          <p className="text-lg font-semibold text-center">{initialText}</p>
        </div>
  
        <div className="flex flex-col items-center border rounded-lg p-2 bg-white shadow-md w-full space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type your comment here..."
            className="w-full px-4 py-2 border rounded focus:outline-none h-40 resize-none"
          />
          <textarea
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Your Nickname (optional)"
            className="w-full px-4 py-2 border rounded focus:outline-none h-12 resize-none"
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
    </div>
  );
}  

export default GuestCommenting;
