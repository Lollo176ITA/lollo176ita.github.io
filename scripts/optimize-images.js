#!/usr/bin/env node

/**
 * Script per ottimizzare immagini convertendole in WebP
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const projectRoot = process.cwd();

async function optimizeImages() {
  console.log('🖼️  OTTIMIZZAZIONE IMMAGINI AVVIATA\n');
  
  const imagesToOptimize = [];
  
  // Scan directories per immagini
  function scanForImages(dir, outputDir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        const newOutputDir = path.join(outputDir, item);
        if (!fs.existsSync(newOutputDir)) {
          fs.mkdirSync(newOutputDir, { recursive: true });
        }
        scanForImages(fullPath, newOutputDir);
      } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
        imagesToOptimize.push({
          input: fullPath,
          output: path.join(outputDir, item.replace(/\.(jpg|jpeg|png)$/i, '.webp')),
          originalName: item
        });
      }
    });
  }
  
  // Scan public folder
  scanForImages(
    path.join(projectRoot, 'public'),
    path.join(projectRoot, 'public')
  );
  
  // Scan build folder se esiste
  const buildDir = path.join(projectRoot, 'build');
  if (fs.existsSync(buildDir)) {
    scanForImages(buildDir, buildDir);
  }
  
  console.log(`📁 Trovate ${imagesToOptimize.length} immagini da ottimizzare`);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const image of imagesToOptimize) {
    try {
      console.log(`⚡ Ottimizzando: ${image.originalName}`);
      
      // Ottieni dimensioni originali
      const originalStat = fs.statSync(image.input);
      totalOriginalSize += originalStat.size;
        // Converti con parametri ottimizzati per tipo di immagine
      const image = sharp(image.input);
      const metadata = await image.metadata();
      
      let outputBuffer;
      
      if (metadata.width < 200 && metadata.height < 200) {
        // Per icone piccole, mantieni PNG ma ottimizza
        outputBuffer = await image
          .png({ 
            quality: 90,
            compressionLevel: 9,
            palette: true // Usa palette per immagini piccole
          })
          .toBuffer();
        
        // Sovrascrivi solo se WebP è più piccolo
        const webpBuffer = await sharp(image.input)
          .webp({ quality: 90, effort: 6 })
          .toBuffer();
          
        if (webpBuffer.length < outputBuffer.length) {
          fs.writeFileSync(image.output, webpBuffer);
        } else {
          // Mantieni formato originale ottimizzato
          const outputPath = image.output.replace('.webp', path.extname(image.input));
          fs.writeFileSync(outputPath, outputBuffer);
          image.output = outputPath;
        }
      } else {
        // Per immagini grandi, usa WebP
        await sharp(image.input)
          .webp({
            quality: 85,
            effort: 6,
            smartSubsample: true
          })
          .toFile(image.output);
      }
      
      // Ottieni dimensioni ottimizzate
      const optimizedStat = fs.statSync(image.output);
      totalOptimizedSize += optimizedStat.size;
      
      const originalSizeKB = (originalStat.size / 1024).toFixed(1);
      const optimizedSizeKB = (optimizedStat.size / 1024).toFixed(1);
      const savings = (((originalStat.size - optimizedStat.size) / originalStat.size) * 100).toFixed(1);
      
      console.log(`  ✅ ${image.originalName}: ${originalSizeKB}KB → ${optimizedSizeKB}KB (-${savings}%)`);
      
    } catch (error) {
      console.error(`❌ Errore ottimizzando ${image.originalName}:`, error.message);
    }
  }
  
  const totalSavings = (((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1);
  const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
  const totalOptimizedMB = (totalOptimizedSize / 1024 / 1024).toFixed(2);
  
  console.log('\n📊 RISULTATI OTTIMIZZAZIONE:');
  console.log(`   📏 Dimensione originale: ${totalOriginalMB}MB`);
  console.log(`   📏 Dimensione ottimizzata: ${totalOptimizedMB}MB`);
  console.log(`   💾 Risparmio totale: ${totalSavings}%`);
  console.log(`   ⚡ Guadagno prestazioni stimato: +5-10 punti Lighthouse`);
  
  // Genera componente per lazy loading immagini
  await generateImageComponent();
  
  console.log('\n🎉 Ottimizzazione completata!');
  console.log('\n💡 PROSSIMI PASSI:');
  console.log('   1. Aggiorna i riferimenti alle immagini per usare .webp');
  console.log('   2. Implementa lazy loading con il componente OptimizedImage');
  console.log('   3. Testa il sito e rimuovi le immagini originali se tutto funziona');
}

async function generateImageComponent() {
  const componentCode = `import React, { useState, useRef, useEffect } from 'react';

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
    return originalSrc.replace(/\\.(jpg|jpeg|png)$/i, '.webp');
  };

  const webpSrc = getOptimizedSrc(src);
  const shouldLoad = inView;

  return (
    <div 
      ref={imgRef}
      className={\`relative overflow-hidden \${className}\`}
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
            className={\`transition-opacity duration-300 \${
              loaded ? 'opacity-100' : 'opacity-0'
            }\`}
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

export default OptimizedImage;`;

  const componentPath = path.join(projectRoot, 'src', 'components', 'common', 'OptimizedImage.js');
  fs.writeFileSync(componentPath, componentCode);
  
  console.log('✅ Componente OptimizedImage generato in src/components/common/');
}

optimizeImages().catch(console.error);
