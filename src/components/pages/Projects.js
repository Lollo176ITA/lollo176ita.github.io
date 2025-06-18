import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Colin & Samir",
    type: "Development",
    image: "https://via.placeholder.com/400x300",
    link: "#",
  },
  {
    title: "Fair Supply",
    type: "Design",
    image: "https://via.placeholder.com/400x300",
    link: "#",
  },
  {
    title: "Art Money",
    type: "Development",
    image: "https://via.placeholder.com/400x300",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              className="block overflow-hidden group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.3 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto rounded-lg transform group-hover:scale-105 transition"
              />
              <div className="mt-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-gray-500">{project.type}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
