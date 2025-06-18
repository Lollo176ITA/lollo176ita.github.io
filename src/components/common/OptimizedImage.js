import React, { useState, useRef, useEffect } from 'react';

/**
 * Componente ottimizzato per immagini con lazy loading e WebP support
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  fallback = null,
  lazy = true,
  quality = 85,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(!lazy);
  const imgRef = useRef();

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  // Determina il formato dell'immagine
  const getOptimizedSrc = (originalSrc) => {
    // Se l'immagine è già WebP, usa quella
    if (originalSrc.endsWith('.webp')) {
      return originalSrc;
    }
    
    // Converti estensione in WebP
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  const webpSrc = getOptimizedSrc(src);
  const shouldLoad = inView;

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {shouldLoad && (
        <picture>
          {/* Versione WebP per browser moderni */}
          <source srcSet={webpSrc} type="image/webp" />
          
          {/* Fallback per browser non supportati */}
          <img
            src={src}
            alt={alt}
            loading={lazy ? 'lazy' : 'eager'}
            onLoad={() => setLoaded(true)}
            className={`transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </picture>
      )}
      
      {/* Placeholder durante il caricamento */}
      {(!shouldLoad || !loaded) && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          {fallback || (
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;