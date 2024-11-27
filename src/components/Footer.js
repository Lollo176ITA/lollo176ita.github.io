import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto text-center border-t border-gray-700 pt-4">
        {/* Social Media Icons */}
        <div className="flex justify-center items-center mb-4 space-x-6">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-xl"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-xl"
          >
            <FaGithub />
          </a>
        </div>
        {/* Footer Text */}
        <p className="text-sm text-gray-400">&copy; 2024 Lollo. All rights reserved.</p>
      </div>
    </footer>
  );
}
