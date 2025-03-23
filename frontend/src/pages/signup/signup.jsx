import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserIcon, EnvelopeIcon, LockClosedIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { AnimatedBackground, pageVariants, inputVariants, buttonVariants, glassCardStyle, glassInputStyle, glassButtonStyle, errorStyle } from '../../theme';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message] = useState('');
    const navigate = useNavigate();
  
    const signUpClick = async (event) => {
        event.preventDefault();

        if(!username || !email || !password){
            setErrorMessage('All Details must be Filled !')
            return
        }

        const newuser = {
            username,
            email,
            password,
        }

        try{
            const response = await fetch('http://localhost:5555/api/users/adduser',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newuser),
            })

            const result = await response.json();
            
            if(!result.success){
                setErrorMessage("Signup Failed !")
                return
            }

            sessionStorage.setItem('userID', result.user._id);
            console.log(result.user._id);

            setEmail('');
            setPassword('');
            setUsername('');
                   
            navigate('/home');
        }
        catch (err){
            console.log(err);
        }
    }

    return (
        <motion.div 
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <AnimatedBackground />
            
            <motion.div 
                className={`${glassCardStyle} p-8 w-full max-w-md mx-4 relative z-10`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <motion.h2 
                    className="text-3xl font-bold text-center text-white mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Create Account
                </motion.h2>

                <form className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                            <motion.input
                                type="text"
                                id="username"
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`${glassInputStyle} pl-10`}
                                placeholder="Enter your username"
                                variants={inputVariants}
                                whileFocus="focus"
                                whileTap="tap"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                            <motion.input
                                type="email"
                                id="email"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`${glassInputStyle} pl-10`}
                                placeholder="Enter your email"
                                variants={inputVariants}
                                whileFocus="focus"
                                whileTap="tap"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                            <motion.input
                                type="password"
                                id="password"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`${glassInputStyle} pl-10`}
                                placeholder="Enter your password"
                                variants={inputVariants}
                                whileFocus="focus"
                                whileTap="tap"
                            />
                        </div>
                    </motion.div>

                    <motion.button
                        onClick={signUpClick}
                        className={`${glassButtonStyle} w-full flex items-center justify-center gap-2`}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <UserPlusIcon className="w-5 h-5" />
                        <span>Create Account</span>
                    </motion.button>
                </form>

                {errorMessage && (
                    <motion.div 
                        className={`${errorStyle} mt-6 flex items-center justify-center`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        {errorMessage}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Signup;
