import { siteName, appIconLink } from "./common/constants";
import styles from "./App.module.css"; // ✅ Import the CSS module
import { Routes, Route, Link, HashRouter } from "react-router-dom";
import ProductList from "./products/views/productList/productList";
import Portfolio from "./portfolio/views/portfolio/portfolio";
import Home from "./home/views/home/home";
import { useEffect } from "react";

const navLinks = [
  { name: "Products", href: "/products", target:"_self"},
  {
    name: "Docs",
    href: "/docs",
    target: "_blank",
  },
  {
    name: "Help",
    href: "/help",
    target: "_blank",
  },
  { name: "Support Me", href: "/support-me",  target: "_blank", },
];

const ExternalRedirect = ({ url }: { url: string }) => {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return null; // Optionally return a loading spinner or message
};


function App() {

  return (
    <div className={styles.root}>
      <HashRouter>
        {/* Top Menu Bar */}

        <nav className={styles.navbar}>
          <a className={styles.navbarBrand} href="/">
            <img className={styles.appIcon} src={appIconLink} alt="App Icon" />
            <h2>{siteName || "MyApp"}</h2>
          </a>

          <ul className={styles.navbarLinks}>
            {navLinks.map((link) => (
              <li key={link.name}>
                {/* {link.target ? (
                  <a href={link.href} target={link.target}>
                    {link.name}
                  </a>
                ) : ( */}
                  <Link to={link.href} target={link.target}>{link.name}</Link>
                {/* )} */}
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className={styles.content}>
          <Routes>
            <Route path="/" Component={HomeC} /> 
            <Route path="/products" Component={ProductListC}/>
            <Route path="/portfolio" Component={PortfolioC}/>
            <Route path="/docs" Component={() => <ExternalRedirect url="https://enlace-one.freshdesk.com/support/solutions" />} />
            <Route path="/help" Component={() => <ExternalRedirect url="https://enlace-one.freshdesk.com/support/tickets/new" />} />
            <Route path="/support-me" Component={() => <ExternalRedirect url="https://patreon.com/EnlaceOne" />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

const HomeC = () => <Home />
const PortfolioC = () => <Portfolio />
const ProductListC = () => <ProductList />

export default App;
