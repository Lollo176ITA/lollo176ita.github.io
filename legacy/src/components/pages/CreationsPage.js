import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaExternalLinkAlt, FaGamepad } from 'react-icons/fa';
import HashLink from '../common/HashLink';
import { useTrophies } from '../common/TrophySystem';
import projects from '../../data/projects';

const CATEGORY_ORDER = ['android', 'web', 'desktop', 'tool'];

function ProjectCard({ project, lang, t }) {
  return (
    <article className="flex flex-col p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.name}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description[lang] || project.description.it}</p>
      <ul className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <li key={tech} className="px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex gap-4 text-sm font-medium">
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
          <FaGithub /> {t('creations.source')}
        </a>
        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
            <FaExternalLinkAlt /> {t('creations.live')}
          </a>
        )}
      </div>
    </article>
  );
}

export default function CreationsPage() {
  const { t, i18n } = useTranslation();
  const { visitPage } = useTrophies();
  const lang = i18n.language === 'en' ? 'en' : 'it';

  useEffect(() => {
    visitPage('creations');
  }, [visitPage]);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="container mx-auto px-6 pt-32 pb-16 max-w-6xl">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold mb-4">{t('creations.heroTitle')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">{t('creations.subtitle')}</p>
        </header>

        {CATEGORY_ORDER.map((category) => {
          const items = projects.filter((project) => project.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t(`creations.categories.${category}`)}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((project) => (
                  <ProjectCard key={project.slug} project={project} lang={lang} t={t} />
                ))}
              </div>
            </section>
          );
        })}

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t('creations.categories.games')}</h2>
          <article className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 max-w-md">
            <h3 className="text-xl font-bold mb-2">{t('creations.gridGameTitle')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t('creations.gridGameDesc')}</p>
            <HashLink to="/" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
              <FaGamepad /> {t('creations.playGame')}
            </HashLink>
          </article>
        </section>
      </div>
    </main>
  );
}
