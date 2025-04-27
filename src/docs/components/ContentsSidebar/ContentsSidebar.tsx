import React, { useEffect, useState } from 'react';
import styles from './ContentsSidebar.module.css';

interface TOCItem {
  title: string;
  id: string;
  level: number; // h1 = 1, h2 = 2, etc.
}

interface ContentsSidebarProps {
  parentElement: HTMLElement | null;
  activeDocURL: string;
}

const ContentsSidebar: React.FC<ContentsSidebarProps> = ({ parentElement, activeDocURL }) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    if (!parentElement) return;

    const headings = parentElement.querySelectorAll('h1, h2, h3');
    const newTocItems: TOCItem[] = [];

    headings.forEach((heading) => {
      const id = heading.id || heading.textContent?.replace(/\s+/g, '-').toLowerCase() || '';
      heading.id = id; // ensure it has an ID

      newTocItems.push({
        title: heading.textContent || '',
        id,
        level: Number(heading.tagName.replace('H', '')),
      });
    });

    setTocItems(newTocItems);
  }, [parentElement, activeDocURL]);

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Table of Contents</h2>
        <ul className={styles.tocList}>
          {tocItems.map((item) => (
            <li key={item.id} className={`${styles.tocItem} ${styles[`level${item.level}`]}`}>
              <a href={`#${item.id}`} className={styles.tocLink}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentsSidebar;
