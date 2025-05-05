import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, ClipboardIcon, ClipboardDocumentCheckIcon, ArrowPathRoundedSquareIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { AnimatedBackground, pageVariants, buttonVariants, glassCardStyle, glassButtonStyle } from '../../theme.jsx';

const UserHome = () => {
  const [userLink, setUserLink] = useState("http://localhost:5173/comment/");
  const [textData, setTextData] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [userID, setUserID] = useState("");
  const [direction, setDirection] = useState(0);

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
        setTextData(comments);
        console.log("Successfully fetched comments:", comments);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    
    fetchComment();
  }, [userID]);

  const handleNext = () => {
    if (currentTextIndex < textData.length - 1) {
      setDirection(1);
      setCurrentTextIndex(currentTextIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentTextIndex > 0) {
      setDirection(-1);
      setCurrentTextIndex(currentTextIndex - 1);
    }
  };

  const handleRefresh = async () => {
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
      setTextData(comments);
      console.log("Successfully refreshed comments:", comments);
    } catch (err) {
      console.error("Error refreshing comments:", err);
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
      <motion.div 
        className={`${glassCardStyle} p-4 flex items-center justify-between gap-4`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-sm lg:text-lg font-mono truncate flex-1" title={userLink}>
          {userLink}
        </div>
        <motion.button
          onClick={handleCopy}
          className={`${glassButtonStyle} flex items-center gap-2`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {copied ? (
            <>
              <ClipboardDocumentCheckIcon className="w-5 h-5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <ClipboardIcon className="w-5 h-5" />
              <span>Copy</span>
            </>
          )}
        </motion.button>
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <AnimatedBackground />
      
      <div className="max-w-4xl mx-auto min-h-screen p-4 sm:p-6 relative z-10">
        <div className="mb-6 sm:mb-8">
          <LinkDisplay userLink={userLink} />
        </div>
        
        <motion.div 
          className={`${glassCardStyle} min-h-[60vh] sm:min-h-[70vh] p-4 sm:p-8 flex justify-center items-center relative overflow-hidden shadow-xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentTextIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.3 }}
              className="text-center px-4"
            >
              {textData.length > 0 ? (
                <>
                  <p className="text-lg sm:text-xl lg:text-3xl text-white mb-4 leading-relaxed font-medium drop-shadow-lg">
                    {textData[currentTextIndex]?.comment}
                  </p>
                  {textData[currentTextIndex]?.nickname && (
                    <p className="text-base sm:text-lg lg:text-xl text-white/90 font-medium">
                      — {textData[currentTextIndex].nickname}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-lg sm:text-xl lg:text-3xl text-white/90 font-medium drop-shadow-lg">
                  No comments available
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="flex items-center justify-between gap-4 mt-6 sm:mt-8 max-w-4xl mx-auto px-4 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={handlePrev}
            className={`${glassButtonStyle} flex items-center gap-2 text-sm sm:text-base bg-white/25 hover:bg-white/35 font-semibold px-3 py-1.5`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={currentTextIndex === 0}
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span>Prev</span>
          </motion.button>

          <motion.button
            onClick={handleRefresh}
            className={`${glassButtonStyle} flex items-center gap-2 text-sm sm:text-base bg-white/25 hover:bg-white/35 font-semibold px-3.5 py-1.5`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <ArrowPathIcon className="w-5 h-5" />
            <span>Refresh</span>
          </motion.button>

          <motion.button
            onClick={handleNext}
            className={`${glassButtonStyle} flex items-center gap-2 text-sm sm:text-base bg-white/25 hover:bg-white/35 font-semibold px-3 py-1.5`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={currentTextIndex >= textData.length - 1}
          >
            <span>Next</span>
            <ChevronRightIcon className="w-5 h-5" />
          </motion.button>
        </motion.div>

        <motion.p 
          className="text-center text-white/90 mt-6 text-sm sm:text-base font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Use the buttons to navigate between the messages
        </motion.p>
      </div>
    </motion.div>
  );
};

export default UserHome;
