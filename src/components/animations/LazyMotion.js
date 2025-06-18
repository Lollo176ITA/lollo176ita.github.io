import { lazy, Suspense } from 'react';

// Lazy load Framer Motion components
const motion = lazy(() => 
  import('framer-motion').then(module => ({ default: module.motion }))
);

const AnimatePresence = lazy(() => 
  import('framer-motion').then(module => ({ default: module.AnimatePresence }))
);

// Fallback component per animazioni
const StaticDiv = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Wrapper per motion con lazy loading
export const LazyMotion = ({ children, ...props }) => (
  <Suspense fallback={<StaticDiv {...props}>{children}</StaticDiv>}>
    <motion.div {...props}>
      {children}
    </motion.div>
  </Suspense>
);

// Wrapper per AnimatePresence con lazy loading
export const LazyAnimatePresence = ({ children, ...props }) => (
  <Suspense fallback={<div>{children}</div>}>
    <AnimatePresence {...props}>
      {children}
    </AnimatePresence>
  </Suspense>
);

// Hook per caricare dinamicamente framer-motion
export const useFramerMotion = () => {
  return {
    motion: lazy(() => import('framer-motion').then(m => ({ default: m.motion }))),
    AnimatePresence: lazy(() => import('framer-motion').then(m => ({ default: m.AnimatePresence })))
  };
};
