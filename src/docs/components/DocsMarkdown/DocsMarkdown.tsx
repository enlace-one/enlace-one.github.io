import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './DocsMarkdown.module.css'; // <--- modular CSS import
import { DOCS_GITHUB_RAW_ROOT_FOLDER, SITE_NAME } from '../../../common/constants';

interface DocsMarkdownProps {
  activeDocURL: string;
  setMarkdownRendered: (b: boolean) => void;
}

const DocsMarkdown: React.FC<DocsMarkdownProps> = ({ activeDocURL, setMarkdownRendered }) => {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    if (!activeDocURL) {
      setMarkdown(`
# Welcome to ${SITE_NAME} Documentation!

Please use the search bar above to locate what you need, it may take a moment for the documentation to load.
      `);
      setMarkdownRendered(true);
      return;
    }

    let isCancelled = false;

    const fetchMarkdown = async () => {
      setMarkdownRendered(false);

      try {
        const response = await fetch(DOCS_GITHUB_RAW_ROOT_FOLDER + activeDocURL);
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${DOCS_GITHUB_RAW_ROOT_FOLDER + activeDocURL}`);
        }

        const text = await response.text();
        if (!isCancelled) {
          setMarkdown(text);
        }
      } catch (error) {
        console.error('Error fetching file:', error);
        if (!isCancelled) {
          setMarkdown('Error loading file.');
        }
      } finally {
        if (!isCancelled) {
          setMarkdownRendered(true);
        }
      }
    };

    fetchMarkdown();

    return () => {
      isCancelled = true;
    };
  }, [activeDocURL, setMarkdownRendered]);

  return (
    <div className={styles.markdownWrapper}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <p style={{paddingBottom: "10rem"}}></p>
    </div>
  );
};

export default DocsMarkdown;
