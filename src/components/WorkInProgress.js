import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WorkInProgress() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <FaTools className="text-6xl text-black  dark:text-white mb-4" />
      </motion.div>
      <h1 className="text-5xl font-extrabold text-black dark:text-white text-center mb-6">Sito in costruzione</h1>
      <p className="text-lg text-black dark:text-white text-center mb-8">Sto lavorando per offrirti una migliore esperienza (spero).</p>
      <Link to="/">
        <motion.button
          className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Torna alla Homepage
        </motion.button>
      </Link>
    </motion.div>
  );
}
