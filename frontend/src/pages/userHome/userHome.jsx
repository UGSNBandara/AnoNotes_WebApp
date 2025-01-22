import React, { useState, useEffect } from 'react';

const UserHome = () => {

  const [userLink, setUserLink] = useState('https://dummy-link.com');

  const [textData, setTextData] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {

    const fetchedData = [
      'Text 1: Placeholder text from API.',
      'Text 2: Another piece of text fetched from the API.',
      'Text 3: More sample text to simulate data fetching.',
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

  return (
    <div className="max-w-4xl mx-auto p-4">

      <div className="text-center mb-4">
        <a
          href={userLink}
          className="text-blue-500 text-lg font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit User Link
        </a>
      </div>

      <div className="border p-6 rounded-lg shadow-lg bg-white mb-6">
        <p className="text-xl text-center">{textData[currentTextIndex]}</p>
      </div>

      <div className="flex justify-between mb-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          disabled={currentTextIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          disabled={currentTextIndex === textData.length - 1}
        >
          Next
        </button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Instructions: Use the buttons to navigate between the texts.</p>
      </div>
    </div>
  );
};

export default UserHome;
