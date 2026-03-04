import { Link, useLocation } from 'react-router-dom';
import { HashRouter } from '../../utils/hashRouter';

export default function HashLink({ 
  to, 
  children, 
  className = '', 
  activeClassName = '',
  replace = false,
  ...props 
}) {
  const location = useLocation();
  const currentPath = HashRouter.getCurrentPath(location.pathname);
  const targetPath = HashRouter.getCurrentPath(to);
  const isActive = currentPath === targetPath;
  const focusClasses = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-md';
  const finalClassName = `${className} ${isActive ? activeClassName : ''} ${focusClasses}`.trim();
  
  return (
    <Link 
      to={HashRouter.buildUrl(to)}
      replace={replace}
      className={finalClassName}
      {...props}
    >
      {children}
    </Link>
  );
}
