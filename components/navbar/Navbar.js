import Link from 'next/link';
import styles from './Navbar.module.scss';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { unsetToken } from '../../lib/auth';

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isLogged, setIsLogged] = useState();
  useEffect(() => {
    setIsLogged(Cookies.get('jwt'));
  }, []);

  const logout = () => {
    unsetToken();
  };

  return (
    <nav className={styles.navigation}>
      <Link href="/">
        <a className={styles.logo}>Holidaze</a>
      </Link>
      <button
        className={styles.hamburger}
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className={isNavExpanded ? styles.navMenuExtended : styles.navMenu}>
        <ul className={styles.navMenuList}>
          <li className={styles.navMenuItem}>
            <Link href="/">
              <a className={styles.navMenuText}>Home</a>
            </Link>
          </li>
          <li className={styles.navMenuItem}>
            <Link href="/about">
              <a className={styles.navMenuText}>About</a>
            </Link>
          </li>

          {isLogged ? (
            <>
              <li className={styles.navMenuItem}>
                <Link href="/dashboard">
                  <a className={styles.navMenuText}>Dashboard</a>
                </Link>
              </li>
              <li className={styles.navMenuItem}>
                <Link href="/">
                  <a className={styles.navMenuText} onClick={logout}>
                    Sign out
                  </a>
                </Link>
              </li>
            </>
          ) : (
            <li className={styles.navMenuItem}>
              <Link href="/login">
                <a className={styles.navMenuText}>Sign in</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
