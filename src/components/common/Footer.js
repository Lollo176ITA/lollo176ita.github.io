import React from "react";
import { FaGithub, FaTrophy } from "react-icons/fa";
import ThemeSwitch from "./ThemeSwitch";
import HashLink from "./HashLink";
import { useTranslation } from 'react-i18next';


export default function Footer() {

  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto text-center border-t border-gray-700 pt-4">
        <div className="flex justify-center items-center mb-4 space-x-6">
          <ThemeSwitch />
          <a
            href="https://github.com/Lollo176ITA"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="text-gray-400 hover:text-white transition text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-full"
          >
            <FaGithub />
          </a>
          <HashLink
            to="/trophies"
            className="text-gray-400 hover:text-white transition text-sm flex items-center space-x-2"
          >
            <FaTrophy className="text-lg" />
            <span>{t('trophies.viewTrophies')}</span>
          </HashLink>
        </div>

        <p className="text-sm text-gray-400">{t('footer.copyright', { year })}</p>
      </div>
    </footer>
  );
}
