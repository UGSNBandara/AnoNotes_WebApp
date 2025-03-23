import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, UserPlusIcon } from '@heroicons/react/24/outline';

const StartPage = () => {
    const navigate = useNavigate();

    const loginButtonClick = () => {
        navigate('/login');
    }

    const signupButtonClick = () => {
        navigate('/signup');
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center px-4"
            >
                <motion.h1 
                    className="font-bold text-white mb-6 text-5xl sm:text-6xl lg:text-7xl tracking-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    Ano_Notes
                </motion.h1>

                <motion.p 
                    className="text-xl sm:text-2xl font-medium text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Create a link, share it with your friends, and get anonymous funny notes about you!
                </motion.p>

                <motion.div 
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={loginButtonClick}
                        className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300"
                    >
                        <ChatBubbleLeftRightIcon className="w-6 h-6" />
                        <span className="text-lg font-semibold">Login</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={signupButtonClick}
                        className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-lg text-white rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300"
                    >
                        <UserPlusIcon className="w-6 h-6" />
                        <span className="text-lg font-semibold">Sign Up</span>
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
            />
        </div>
    );
};

export default StartPage;
