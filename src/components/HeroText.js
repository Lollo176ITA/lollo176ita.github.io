import React from "react";
import { motion } from "framer-motion";

export default function HeroText() {
    return (
        <div className="max-w-4xl mx-0 lg:w-1/2  mb-10">
            <motion.h1
                className="text-6xl font-bold text-left font-poppins"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                Web <span className="text-black">&</span> Game Developer
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-4 max-w-lg"
            >
                <p className="text-lg text-left font-inter">
                    I'm Lorenzo Censi, a computer science student at Sapienza University, currently{" "}
                    {new Date().getFullYear() - 2004 -
                        (new Date().getMonth() < 2 ||
                        (new Date().getMonth() === 2 && new Date().getDate() < 30)
                            ? 1
                            : 0)}{" "}
                    years old. I work as a web developer using Drupal, I'm also a game programmer in Unity in my spare time, and the creator of websites like the one you’re currently viewing.
                </p>
            </motion.div>
        </div>
    );
}
