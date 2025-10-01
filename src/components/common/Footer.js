import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaTrophy, FaBook } from "react-icons/fa";
import { SiLighthouse } from "react-icons/si";
import ThemeSwitch from "./ThemeSwitch";
import HashLink from "./HashLink";
import { useTranslation } from 'react-i18next';


export default function Footer() {

  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto text-center border-t border-gray-700 pt-4">
        {/* Social Media Icons */}
        <div className="flex justify-center items-center mb-4 space-x-6">
          <ThemeSwitch />
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
        
        {/* Site Quality Stats */}
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
          <HashLink 
            to="/lighthouse" 
            className="text-gray-400 hover:text-white transition text-sm flex items-center space-x-2"
          >
            <SiLighthouse className="text-lg" />
            <span>{t('footer.siteQuality')}</span>
          </HashLink>
          
          <HashLink 
            to="/trophies" 
            className="text-gray-400 hover:text-white transition text-sm flex items-center space-x-2"
          >
            <FaTrophy className="text-lg" />
            <span>{t('trophies.viewTrophies')}</span>
          </HashLink>

          <a
            href="https://github.com/lollo176ita/lollo176ita.github.io#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-sm flex items-center space-x-2"
          >
            <FaBook className="text-lg" />
            <span>{t('footer.documentation.title')}</span>
          </a>
        </div>
        
        {/* Footer Text */}
        <p className="text-sm text-gray-400">{t('footer.copyright', { year })}</p>
      </div>
    </footer>
  );
}
