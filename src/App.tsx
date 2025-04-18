import { useState } from 'react';
import { siteName, appIconLink } from './common/constants';
import styles from './App.module.css'; // ✅ Import the CSS module

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.root}>
      {/* Top Menu Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>
          <img className={styles.appIcon} src={appIconLink} alt="App Icon" />
          <h2>{siteName || 'MyApp'}</h2>
        </div>
        <ul className={styles.navbarLinks}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className={styles.content}>
        <h1>{siteName}</h1>
        <div className={styles.card}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className={styles.readTheDocs}>
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
