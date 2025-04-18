import { siteName, appIconLink } from "./common/constants";
import styles from "./App.module.css"; // ✅ Import the CSS module
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./products/views/productList/productList";
import Portfolio from "./portfolio/views/portfolio/portfolio";
import Home from "./home/views/home/home";

const navLinks = [
  // { name: 'Home', href: '/' },
  { name: "Products", href: "/products" },
  {
    name: "Docs",
    href: "https://enlace-one.freshdesk.com/support/solutions",
    target: "_blank",
  },
  {
    name: "Help",
    href: "https://enlace-one.freshdesk.com/support/tickets/new",
    target: "_blank",
  },
  { name: "Support Me", href: "https://patreon.com/EnlaceOne",  target: "_blank", },
];

function App() {

  return (
    <div className={styles.root}>
      <BrowserRouter>
        {/* Top Menu Bar */}

        <nav className={styles.navbar}>
          <a className={styles.navbarBrand} href="/">
            <img className={styles.appIcon} src={appIconLink} alt="App Icon" />
            <h2>{siteName || "MyApp"}</h2>
          </a>

          <ul className={styles.navbarLinks}>
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.target ? (
                  <a href={link.href} target={link.target}>
                    {link.name}
                  </a>
                ) : (
                  <Link to={link.href}>{link.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/support" element={<p>Coming soon...</p>} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
