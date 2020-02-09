import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const Header = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [scroll, setScroll] = useState(false);
  const wrapperRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (window.scrollY < 50 + 10) {
      setScroll(false);
      return;
    }
    setScroll(true);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useOutsideClick(wrapperRef, () => setCollapsed(false));

  const handleOpen = () => {
    setCollapsed(!collapsed);
  };

  const paths = {
    Hjem: '/',
    Billetter: '/bestill',
  };
  return (
    <header
      ref={wrapperRef}
      className={scroll ? 'scrolled' : collapsed ? 'scrolled' : null}
      style={{ height: collapsed ? 'auto' : '48px' }}
    >
      <nav>
        <h2 className="brand">
          <Link to="/">Lambertrevyen 2020</Link>
        </h2>
        <div className="hide-on-md-and-down">
          <ul className="navigation">
            {Object.entries(paths).map(([name, path]) => (
              <li>
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hide-on-lg-and-up">
          <MdMenu className="menu-toggle" onClick={handleOpen} />
        </div>
      </nav>
      {collapsed && (
        <ul className="mobile-item">
          {Object.entries(paths).map(([name, path]) => (
            <li>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
