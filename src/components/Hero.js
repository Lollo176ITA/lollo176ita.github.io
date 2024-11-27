import React from "react";
import { motion } from "framer-motion";


export default function Hero() {
    return (
        <div className= " container mx-auto">
        <section className="min-h-screen flex flex-col justify-start pt-20 mt-16 bg-white text-black px-8 mb-auto">
            <div className="max-w-4xl mx-0">
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
                        I'm Lorenzo Censi, a computer science student at Sapienza University, currently {new Date().getFullYear() - 2004 - (new Date().getMonth() < 2 || (new Date().getMonth() === 2 && new Date().getDate() < 30) ? 1 : 0)} years old. I work as a web developer using Drupal, I'm also a game programmer in Unity in my spare time, and the creator of websites like the one you’re currently viewing.
                    </p>
                </motion.div>
                <div className="mt-8 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="space-y-2"
                    >
                        {/* Sezione extra che potrebbe essere aggiunta in futuro */}
                    </motion.div>
                </div>
            </div>
        </section>
        </div>
    );
}
