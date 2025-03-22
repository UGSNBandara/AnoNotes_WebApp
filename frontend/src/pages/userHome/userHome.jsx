import React, { useState, useEffect } from "react";

const UserHome = () => {
  const [userLink, setUserLink] = useState("http://localhost:5173/comment/");
  const [textData, setTextData] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const userid = sessionStorage.getItem("userID");
    if (userid) {
      setUserID(userid);
    }
  }, []);

  
  useEffect(() => {

    if (userID) {
      setUserLink((prevLink) => `${prevLink}${userID}`);
    }

    const fetchComment = async () => {
      try {
        const response = await fetch(`http://localhost:5555/api/mg/get/${userID}`);

        if (!response.ok) {
          console.log("Failed to fetch comments");
          return;
        }

        const result = await response.json();

        if (!result.success) {
          console.log(result.message);
          return;
        }

        const comments = result.comment || [];
        setTextData(comments); // Set directly as an array
        console.log("Successfully fetched comments:", comments);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    
    fetchComment();
  }, [userID]);

  const handleNext = () => {
    if (currentTextIndex < textData.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentTextIndex > 0) {
      setCurrentTextIndex(currentTextIndex - 1);
    }
  };

  const LinkDisplay = ({ userLink }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(userLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    return (
      <div className="text-center mb-4 h-[7%] p-4 lg:h-[9%] lg:p-5 border rounded-lg shadow-md bg-gray-100 flex items-center justify-between">
        <div className="text-sm lg:text-lg font-mono truncate" title={userLink}>
          {userLink}
        </div>
        <button
          onClick={handleCopy}
          className="font-mono ml-4 px-3 py-2 bg-blue-500 text-white text-sm lg:text-base font-semibold rounded hover:bg-blue-600 focus:outline-none"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-tr from-fuchsia-500 to-cyan-500">
      <div className="max-w-4xl mx-auto h-screen p-4">
        <LinkDisplay userLink={userLink} />
        <div className="flex justify-center items-center border h-[70%] p-6 rounded-lg shadow-lg bg-white mb-6 px-4">
          {textData.length > 0 ? (
            <p className="font-mono text-xl text-center lg:text-3xl">
              {textData[currentTextIndex]?.comment}
              <br/> <br/>
              {textData[currentTextIndex]?.nickname
                ? ` (${textData[currentTextIndex].nickname})`
                : ""}
            </p>
          ) : (
            <p className="font-mono text-xl text-center lg:text-3xl text-gray-500">
              No comments available
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mb-4 h-[10%]">
          <button
            onClick={handlePrev}
            className="px-4 py-2 font-bold font-mono bg-white text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white disabled:bg-gray-300 h-15 lg:text-xl"
            disabled={currentTextIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-2 font-bold font-mono bg-white text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white disabled:bg-gray-300 h-15 lg:text-xl"
            disabled={currentTextIndex >= textData.length - 1}
          >
            Next
          </button>
        </div>
        <div className="text-center font-mono text-sm text-white lg:text-xl">
          <p>Instructions: Use the buttons to navigate between the texts.</p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
