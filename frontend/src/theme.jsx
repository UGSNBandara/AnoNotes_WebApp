import { motion } from 'framer-motion';

export const pageVariants = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: -20
    }
};

export const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

export const inputVariants = {
    focus: { scale: 1.02 },
    tap: { scale: 0.98 }
};

export const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
};

export const glassCardStyle = `
  bg-white/20 
  backdrop-blur-lg 
  rounded-2xl 
  shadow-xl 
  border border-white/30 
  text-white
`;

export const glassInputStyle = `
  w-full 
  bg-white/15 
  backdrop-blur-md 
  border border-white/30 
  rounded-xl 
  px-4 
  py-3 
  text-white 
  placeholder-white/70 
  focus:outline-none 
  focus:ring-2 
  focus:ring-white/50 
  focus:border-white/50 
  transition-all 
  duration-300
`;

export const glassButtonStyle = `
  px-6 
  py-3 
  bg-white/20 
  backdrop-blur-md 
  text-white 
  rounded-xl 
  border border-white/30 
  hover:bg-white/30 
  hover:border-white/50 
  transition-all 
  duration-300 
  disabled:opacity-50 
  disabled:cursor-not-allowed
  font-medium
  shadow-lg
`;

export const errorStyle = `
  bg-red-500/20 
  backdrop-blur-md 
  border border-red-500/30 
  text-red-100 
  px-4 
  py-2 
  rounded-xl 
  text-sm 
  font-medium
  shadow-lg
`;

export const AnimatedBackground = () => (
    <>
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
    </>
); 