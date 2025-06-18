import React from 'react';
import { HashRouter } from '../utils/hashRouter';

export default function HashLink({ 
  to, 
  children, 
  className = '', 
  activeClassName = '',
  replace = false,
  ...props 
}) {
  const [isActive, setIsActive] = React.useState(false);
  
  React.useEffect(() => {
    const checkActive = () => {
      const currentPath = HashRouter.getCurrentPath();
      const targetPath = to.replace(/^#?\/?/, '');
      setIsActive(currentPath === targetPath);
    };
    
    checkActive();
    window.addEventListener('hashchange', checkActive);
    return () => window.removeEventListener('hashchange', checkActive);
  }, [to]);
  
  const handleClick = (e) => {
    e.preventDefault();
    if (replace) {
      HashRouter.replaceHash(to);
    } else {
      HashRouter.navigate(to);
    }
  };
  
  const finalClassName = `${className} ${isActive ? activeClassName : ''}`.trim();
  
  return (
    <a 
      href={HashRouter.buildUrl(to.split('/'))}
      onClick={handleClick}
      className={finalClassName}
      {...props}
    >
      {children}
    </a>
  );
}
