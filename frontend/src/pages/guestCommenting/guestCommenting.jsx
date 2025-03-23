import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PaperAirplaneIcon, UserIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { AnimatedBackground, pageVariants, inputVariants, buttonVariants, glassCardStyle, glassInputStyle, glassButtonStyle, errorStyle } from '../../theme.jsx';

const GuestCommenting = () => {
  const [initialText, setInitialText] = useState("Welcome to the Ano commenting!"); // Placeholder text
  const [comment, setComment] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [userID, setUserID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [resolveCallback, setResolveCallback] = useState(null);

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
      setInitialText(`${username} : Tell me what you think about me!`);
    }
  }, [message]);

  const navigate = useNavigate();

  const handleSend = async (event) => {
    event.preventDefault();

    if (comment.trim() == "") {
      setErrorMessage("Message box is Empty !");
      return;
    }

    const bad_word = await checkBadWords(comment);

    if (bad_word == 1) {
      console.log("Text contains badwords")
      setWarningMessage("You message contains Bad Words You Can't Send this!!");
      await showWarningModel();
      return;
    }

    const harmenss = await chechHarmness(comment);

    if (harmenss == 1) {
      //1 means it contain harmfull content
      console.log("Text contains harmful content");
      setWarningMessage(`This message may contain harmfull content to ${username}`);
      await showWarningModel();
      return;
    }

    const note = {
      targetUser: userID,
      message: comment,
      nickname,
    }

    try {
      const response = await fetch('http://localhost:5555/api/mg/add', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      })

      if (!response) {
        console.log("Response is empty");
        return;
      }

      const result = await response.json();

      if (!result.success) {
        console.log(result.message);
        return;
      }

      setComment("");
      setNickname("");
      setErrorMessage("");
    }
    catch (err) {
      console.log(err);
    }
  };

  const checkBadWords = async (text) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/detect_b_words', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      if (!response.ok) {
        console.log("Error: Bad response from server while checking bad words");
        return -1; // Error code
      }

      const result = await response.json(); // Parse JSON response

      if (result.bad_word_contain) {
        return 1; // Bad words detected
      } else {
        return 0; // No bad words
      }
    } catch (err) {
      console.log("Error during bad word checking:", err);
    }
  };

  const chechHarmness = async (text) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/check_harm', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      if (!response.ok) {
        console.log("Bad Response when checking the harmfullness");
      }

      const result = await response.json();

      if (result.Prediction == 0) {
        return 1; //no harmfull content
      }
      else {
        return 0; //harmfull content detected
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  //show error message
  const showWarningModel = () => {
    setShowWarning(true);

    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const okClick = () => {
    setShowWarning(false);
    if (resolveCallback) resolveCallback();
  };

  const handleCreateLink = () => {
    window.open('/', '_blank');
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden flex items-center justify-center"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <AnimatedBackground />
      
      <div className="max-w-3xl w-full mx-auto p-4 sm:p-6 relative z-10 flex flex-col min-h-[80vh]">
        {/* User Message Section - Top */}
        <motion.div 
          className={`${glassCardStyle} p-4 sm:p-6 text-center bg-white/25 mb-8 sm:mb-12 shadow-xl`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">{initialText}</p>
        </motion.div>

        {/* Main Content Section - Center */}
        <motion.div 
          className={`${glassCardStyle} p-4 sm:p-8 flex-1 flex flex-col justify-center mb-8 sm:mb-12 shadow-xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-4 sm:space-y-6">
            <div className="relative">
              <motion.textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Type your comment here..."
                className={`${glassInputStyle} h-32 sm:h-40 resize-none text-base sm:text-lg bg-white/15 font-medium`}
                variants={inputVariants}
                whileFocus="focus"
                whileTap="tap"
              />
            </div>

            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
              <motion.textarea
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Your Nickname (optional)"
                className={`${glassInputStyle} h-12 pl-10 resize-none text-base bg-white/15 font-medium [&::-webkit-resizer]:hidden [&::-webkit-scrollbar]:hidden`}
                variants={inputVariants}
                whileFocus="focus"
                whileTap="tap"
              />
            </div>

            <motion.button
              onClick={handleSend}
              className={`${glassButtonStyle} w-full flex items-center justify-center gap-2 text-base sm:text-lg bg-white/25 hover:bg-white/35 font-semibold`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              <span>Send Message</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Create Link Section - Bottom */}
        <motion.div 
          className="mt-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={handleCreateLink}
            className={`${glassButtonStyle} w-full flex items-center justify-center gap-2 text-base sm:text-lg bg-white/25 hover:bg-white/35 font-semibold`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span>Create a Link for Me</span>
          </motion.button>
        </motion.div>

        {errorMessage && (
          <motion.div 
            className={`${errorStyle} mt-4 sm:mt-6 flex items-center justify-center text-sm sm:text-base font-semibold`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {errorMessage}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showWarning && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={`${glassCardStyle} p-4 sm:p-6 max-w-md w-full mx-4 bg-white/25 shadow-xl`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">Warning</h3>
              </div>
              <p className="text-white/95 mb-6 text-sm sm:text-base font-medium">{warningMessage}</p>
              <motion.button
                onClick={okClick}
                className={`${glassButtonStyle} w-full text-base sm:text-lg bg-white/25 hover:bg-white/35 font-semibold`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                OK
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default GuestCommenting;
