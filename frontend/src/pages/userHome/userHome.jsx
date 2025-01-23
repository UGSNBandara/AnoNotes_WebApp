import React, { useState, useEffect } from "react";

const UserHome = () => {
  const [userLink, setUserLink] = useState("http://localhost:5173/guest/comment");
  const [textData, setTextData] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const fetchedData = [
      "Text 1: Placeholder text from API.",
      "Text 2: Another piece of text fetched from the API.",
      "Text 3: More sample text to simulate data fetching.",
    ];
    setTextData(fetchedData);
  }, []);

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
      <div className=" text-center mb-4 h-[7%] p-4 lg:h-[9%] lg:p-5 border rounded-lg shadow-md bg-gray-100 flex items-center justify-between">
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
          <p className="font-mono text-xl text-center lg:text-3xl ">{textData[currentTextIndex]}</p>
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
            className="px-4 py-2 font-bold font-mono bg-white text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white disabled:bg-gray-300 h-15 lg:text-xl"
            disabled={currentTextIndex === textData.length - 1}
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
