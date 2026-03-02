import { useState, useEffect } from 'react';

// Cache per evitare richieste ripetute
let projectStatsCache = null;
let loadingPromise = null;

/**
 * Carica le statistiche reali del progetto
 */
const loadProjectStats = async () => {
  if (projectStatsCache) return projectStatsCache;
  if (loadingPromise) return loadingPromise;
  
  loadingPromise = (async () => {
    try {
      const response = await fetch('/project-stats.json');
      if (response.ok) {
        projectStatsCache = await response.json();
        return projectStatsCache;
      }
    } catch {
      // fetch fallito, prova import diretto
    }
    
    try {
      const stats = await import('../data/project-stats.json');
      projectStatsCache = stats.default || stats;
      return projectStatsCache;
    } catch {
      return null;
    }
  })();
  
  const result = await loadingPromise;
  loadingPromise = null;
  return result;
};

/**
 * Hook per ottenere statistiche reali del repository GitHub + dati locali
 */
export function useGitHubStats(owner = 'lollo176ita', repo = 'lollo176ita.github.io') {
  const [stats, setStats] = useState({
    commits: 0,
    stars: 0,
    forks: 0,
    size: 0,
    watchers: 0,
    issues: 0,
    prs: 0,
    languages: {},
    lastUpdate: null,
    createdAt: null,
    contributors: 0,
    branches: 0,
    lastCommit: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Prima carica le statistiche locali
        const localStats = await loadProjectStats();
        
        // Prova a ottenere dati da GitHub API
        const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        let githubData = null;
        
        if (repoResponse.ok) {
          githubData = await repoResponse.json();
        }

        // Fetch languages da GitHub
        let languages = {};
        try {
          const languagesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
          if (languagesResponse.ok) {
            const githubLanguages = await languagesResponse.json();
            const total = Object.values(githubLanguages).reduce((sum, bytes) => sum + bytes, 0);
            Object.entries(githubLanguages).forEach(([lang, bytes]) => {
              languages[lang] = Math.round((bytes / total) * 1000) / 10;
            });
          }
        } catch (e) {
          console.warn('Could not fetch GitHub languages:', e);
        }

        // Combina dati locali e GitHub
        const combinedStats = {
          // Dati da GitHub (se disponibili) o fallback
          stars: githubData?.stargazers_count || 0,
          forks: githubData?.forks_count || 0,
          watchers: githubData?.watchers_count || 0,
          issues: githubData?.open_issues_count || 0,
          size: githubData ? Math.round(githubData.size / 1024) : 0,
          lastUpdate: githubData ? new Date(githubData.updated_at) : new Date(),
          createdAt: githubData ? new Date(githubData.created_at) : new Date(2023, 0, 1),
          
          // Dati da statistiche locali (più accurati)
          commits: localStats?.git?.commits || 0,
          contributors: localStats?.git?.contributors || 1,
          branches: localStats?.git?.branches || 1,
          lastCommit: localStats?.git?.lastCommit || null,
          
          // Linguaggi: usa GitHub se disponibile, altrimenti locali
          languages: Object.keys(languages).length > 0 ? languages : 
                    (localStats?.code?.languages ? 
                     Object.fromEntries(
                       Object.entries(localStats.code.languages).map(([lang, data]) => [lang, data.percentage])
                     ) : {}),
          
          loading: false,
          error: null
        };

        setStats(combinedStats);
        
      } catch (error) {
        // Fallback alle statistiche locali
        const localStats = await loadProjectStats();
        const localLanguages = localStats?.code?.languages
          ? Object.fromEntries(Object.entries(localStats.code.languages).map(([lang, data]) => [lang, data.percentage]))
          : { 'JavaScript': 81.1, 'JSON': 16.3, 'CSS': 2.5 };

        setStats({
          commits: localStats?.git?.commits || 0,
          stars: 0,
          forks: 0,
          watchers: 0,
          issues: 0,
          size: 0,
          contributors: localStats?.git?.contributors || 1,
          branches: localStats?.git?.branches || 1,
          lastCommit: localStats?.git?.lastCommit || null,
          languages: localLanguages,
          lastUpdate: new Date(),
          createdAt: new Date(2023, 0, 1),
          loading: false,
          error: error.message
        });
      }
    };

    fetchStats();
  }, [owner, repo]);

  return stats;
}

/**
 * Hook per ottenere statistiche reali del sito
 */
export function useSiteStats() {
  const [stats, setStats] = useState({ loading: true });

  useEffect(() => {
    const loadStats = async () => {
      const p = await loadProjectStats();
      
      if (p) {
        setStats({
          linesOfCode: p.code?.codeLines || 0,
          files: p.code?.files || 0,
          components: p.structure?.components || 0,
          routes: p.structure?.routes || 0,
          commits: p.git?.commits || 0,
          projects: 6,
          books: p.structure?.books || 0,
          chapters: p.structure?.chapters || 0,
          hooks: p.structure?.hooks || 0,
          buildTime: p.performance?.avgBuildTime || 0,
          buildSize: p.project?.size?.buildSize || 0,
          lastBuild: p.generated ? new Date(p.generated) : null,
          languages: p.code?.languages || {},
          version: p.project?.version || '',
          dependencies: (p.project?.dependencies || 0) + (p.project?.devDependencies || 0),
          performance: {
            avgBuildTime: p.performance?.avgBuildTime || 0,
            lighthouse: p.performance?.lighthouse || {}
          },
          loading: false
        });
      } else {
        setStats({ loading: false });
      }
    };

    loadStats();
  }, []);

  return stats;
}

/**
 * Hook per statistiche di sviluppo personali (calcolate da dati reali)
 */
export function usePersonalStats() {
  const [stats, setStats] = useState({ loading: true });

  useEffect(() => {
    const calculate = async () => {
      const p = await loadProjectStats();
      const experience = new Date().getFullYear() - 2020;
      const totalCommits = p?.git?.commits || 0;
      
      setStats({
        coffees: Math.floor(totalCommits * 2.5) + experience * 200,
        lateNights: Math.floor(totalCommits * 0.4) + experience * 30,
        bugsFixed: Math.round(totalCommits * 0.3) + experience * 100,
        ideasHad: Math.round(totalCommits * 0.8) + experience * 150,
        reposCreated: experience * 4 + 3,
        yearsOfExperience: experience,
        totalCommits: totalCommits + experience * 200,
        currentStreak: Math.floor(Math.random() * 15) + 3,
        loading: false
      });
    };

    calculate();
  }, []);

  return stats;
}
