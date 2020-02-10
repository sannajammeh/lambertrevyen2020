import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './NavItem.styles.scss';

const NavItem = ({ location, path, children }) => {
  const { pathname } = location;

  return (
    <li className={pathname === path ? 'active' : null}>
      <Link to={path}>{children}</Link>
    </li>
  );
};

export default withRouter(NavItem);
