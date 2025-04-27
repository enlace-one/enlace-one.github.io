import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ContentsSidebar.module.css';

interface TOCItem {
  title: string;
  id: string;
  level: number; // h1 = 1, h2 = 2, etc.
}

interface ContentsSidebarProps {
  parentElement: HTMLElement | null;
  activeDocURL: string;
  markdownRendered: boolean;
}

const ContentsSidebar: React.FC<ContentsSidebarProps> = ({ parentElement, activeDocURL, markdownRendered }) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const location = useLocation();

  const updateToc = () => {
    if (!parentElement) {
      setTocItems([]);
      return;
    }

    const headings = parentElement.querySelectorAll('h1, h2, h3');
    const newTocItems: TOCItem[] = [];
    const usedIds = new Set<string>(); // Track used IDs to ensure uniqueness

    headings.forEach((heading, index) => {
      const textContent = heading.textContent?.trim();
      if (!textContent) return; // Skip headings with no content

      // Generate a unique ID
      let id = heading.id || textContent.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
      if (!id) {
        id = `heading-${index}`; // Fallback ID if textContent is empty or invalid
      }

      // Ensure ID is unique
      let uniqueId = id;
      let counter = 1;
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      usedIds.add(uniqueId);
      heading.id = uniqueId; // Assign unique ID to heading

      newTocItems.push({
        title: textContent,
        id: uniqueId,
        level: Number(heading.tagName.replace('H', '')),
      });
    });
    setTocItems(newTocItems);
  }

  // Generate TOC items from headings
  useEffect(() => {
    if (markdownRendered) {
    setTimeout(() => {
      updateToc()
    }, 300);
  }

    
  }, [parentElement, activeDocURL, markdownRendered]);

  // Handle initial hash on page load or hash change
  useEffect(() => {
    const hash = location.hash.split('#')[1]; // Get hash after #/docs (e.g., header-1)
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash, tocItems]); // Re-run when hash or TOC items change

  // Handle TOC link clicks
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
    e.preventDefault(); // Prevent default navigation
    const element = document.getElementById(anchorId);
    if (element) {
      const offset = 100; // Adjust based on navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
      // Update URL to include route and anchor (e.g., #/docs#header-1)
      // const basePath = location.pathname; // Includes #/docs
      // window.history.replaceState(null, '', `${basePath}#${anchorId}`);
    }
  };

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Table of Contents</h2>
        {tocItems.length === 0 ? (
          <p>No headings found.</p>
        ) : (
          <ul className={styles.tocList}>
            {tocItems.map((item) => (
              <li
                key={item.id}
                className={`${styles.tocItem} ${styles[`level${item.level}`]}`}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleAnchorClick(e, item.id)}
                  className={styles.tocLink}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContentsSidebar;