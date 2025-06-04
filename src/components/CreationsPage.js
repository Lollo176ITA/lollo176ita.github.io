import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGamepad } from 'react-icons/fa';
import { GiOpenBook } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import books from '../data/books';

const iconTarget = { top: 5, left: 5, scale: 0.5 };
const sparkleColors = { games: 'bg-yellow-300', novel: 'bg-emerald-300' };

function Card({ variant, icon, label, links, hovered, onHover, onLeave, onClick, isActive }) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={
        `flex-1 relative flex flex-col items-center justify-start p-12 rounded-3xl cursor-pointer shadow-lg transition-all duration-300 border-4 min-h-[280px] ` +
        (variant === 'games'
          ? (isActive
              ? 'scale-105 z-10 border-indigo-400 bg-indigo-800/90 text-white'
              : 'border-transparent bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white')
          : (isActive
              ? 'scale-105 z-10 border-emerald-400 bg-emerald-800/90 text-white'
              : 'border-transparent bg-gradient-to-tr from-emerald-600 to-emerald-700 text-white'))
      }
      whileHover={!isActive ? { scale: 1.05, boxShadow: variant === 'games' ? '0 0 32px 4px #4f46e5' : '0 0 32px 4px #10b981' } : {}}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Sparkle effect on hover */}
      {hovered && !isActive && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.4, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 ${sparkleColors[variant]} rounded-sm absolute`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.7 + Math.random() * 0.3
              }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 1.2 + Math.random(), repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </motion.div>
      )}

      {/* ICONA */}
      <motion.div
        layout
        initial={false}
        animate={
          isActive
            ? { top: iconTarget.top, left: iconTarget.left, scale: iconTarget.scale }
            : { top: 0, left: 0, scale: 1 }
        }
        transition={{ type: 'spring', stiffness: 200, damping: 30, duration: 0.5 }}
        style={{ zIndex: 20, position: isActive ? 'absolute' : 'relative' }}
        className="mb-4"
        whileHover={!isActive && hovered ? { rotate: [0, 10, -10, 0], scale: 1.15 } : {}}
      >
        {icon}
      </motion.div>

      {/* LABEL */}
      <motion.span
        initial={false}
        animate={{
          opacity: isActive ? 0 : 1,
          y: isActive ? -10 : 0,
          scale: isActive ? 0.9 : 1
        }}
        transition={{ duration: 0.22 }}
        className="text-3xl font-bold mt-2 mb-0"
        style={{
          zIndex: 10,
          position: isActive ? 'absolute' : 'relative',
          left: isActive ? iconTarget.left + 60 : 0,
          top: isActive ? iconTarget.top + 5 : 0
        }}
      >
        {label}
      </motion.span>

      {/* LISTA LINK */}
      <AnimatePresence>
        {isActive && (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className=" mx-4 mt-6 space-y-2 z-10 text-left w-full max-w-xs"
            style={{ position: 'absolute', left: iconTarget.left + 40, top: iconTarget.top + 28 }}
          >
            {links.map(({ href, text }, idx) => (
              <li key={idx}>
                <a href={href} className="block text-xl hover:underline">{text}</a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CreationsPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);    // 'games' | 'novel' | null
  const [hovered, setHovered] = useState(null);  // 'games' | 'novel' | null

  return (
    <main className="mx-6 py-4 text-black dark:text-white min-h-screen  from-white to-slate-200 dark:from-black transition-colors duration-300">
      <h1 className="text-5xl font-extrabold text-center mt-16 mb-16">
        {t('creations.heroTitle')}
      </h1>
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
        {/* GAMES */}
        <Card
          variant="games"
          icon={<FaGamepad className="text-6xl drop-shadow-lg" />}
          label={t('creations.games')}
          links={[
            { href: '/games/play', text: t('creations.playGame') },
            { href: '/games/leaderboard', text: t('creations.leaderboard') }
          ]}
          hovered={hovered === 'games'}
          onHover={() => setHovered('games')}
          onLeave={() => setHovered(null)}
          onClick={() => setActive(active === 'games' ? null : 'games')}
          isActive={active === 'games'}
        />

        {/* NOVELLA */}
        <Card
          variant="novel"
          icon={<GiOpenBook className="text-6xl drop-shadow-lg" />}
          label={t('creations.novel')}
          links={books.map(b => ({
            href: `/creations/books/${b.type}/${b.slug}/overview`,
            text: b.title
          }))}
          hovered={hovered === 'novel'}
          onHover={() => setHovered('novel')}
          onLeave={() => setHovered(null)}
          onClick={() => setActive(active === 'novel' ? null : 'novel')}
          isActive={active === 'novel'}
        />
      </div>
    </main>
  );
}