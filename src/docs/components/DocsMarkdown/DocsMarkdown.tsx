import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './DocsMarkdown.module.css'; // <--- modular CSS import
import { DOCS_GITHUB_RAW_ROOT_FOLDER } from '../../../common/constants';

interface DocsMarkdownProps {
  activeDocURL: string;
}

const DocsMarkdown: React.FC<DocsMarkdownProps> = ({ activeDocURL }) => {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (!activeDocURL) return;
      try {
        const response = await fetch(DOCS_GITHUB_RAW_ROOT_FOLDER + activeDocURL);
        console.log(`Fetching file: ${DOCS_GITHUB_RAW_ROOT_FOLDER + activeDocURL}`)
        if (!response.ok) throw new Error(`Failed to fetch file: ${DOCS_GITHUB_RAW_ROOT_FOLDER + activeDocURL}`);
        const text = await response.text();
        setMarkdown(text);
      } catch (error) {
        console.error('Error fetching file:', error);
        setMarkdown('Error loading file.');
      }
    };

    fetchMarkdown();
  }, [activeDocURL]);

  return (
    <div className={styles.markdownWrapper}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default DocsMarkdown;
