import React, { useState, useEffect } from 'react';

import styles from './SearchBar.module.css';
import { FileNode } from "../../types";
import { DOCS_GITHUB_ROOT_FOLDER } from '../../../common/constants';

interface SearchBarProps {
  
  setActiveDocURL: (url: string) => void;
  fileTree: FileNode[];
}

const SearchBar: React.FC<SearchBarProps> = ({ fileTree, setActiveDocURL }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FileNode[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setLoading(true)

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      setLoading(false)
      findAndSetResults(value);
    }, 500); 

    setTypingTimeout(timeout);
  };

  const findAndSetResults = (term: string) => {
    console.log("Searching after 5s! Search term:", term);

    const matches = fileTree.filter(node =>
      node.displayPath!.toLowerCase().includes(term.toLowerCase())
    );

    setResults(matches);
  };

  const handleResultClick = (url: string) => {
    setActiveDocURL(url);
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div className={styles.searchBarDiv}>
      <input
        onChange={handleChange}
        type="search"
        placeholder="Search..."
        className={styles.searchInput}
        value={searchTerm}
      />
      <div className={styles.results}>
        {loading && <p
            key="loading"
            className={styles.resultItem}
          >
            Loading...
          </p>}
        {results.map((r) => (
          <p
            key={r.path}
            onClick={() => handleResultClick(r.path)}
            className={styles.resultItem}
          >
            {r.displayPath}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
