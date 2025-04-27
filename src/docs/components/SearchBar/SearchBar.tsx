import React, { useState, useEffect, useRef } from 'react';
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
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    findAndSetResults(searchTerm);
  };
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    findAndSetResults(value);
  };

  const findAndSetResults = (term: string) => {
    const search = term.trim().toLowerCase();
    if (search == "") {
      setResults(fileTree)
      return
    }
    const searchWords = search.split(/\s+/).filter(Boolean); // split into words
  
    const matches = fileTree.filter(node => {
      const path = node.displayPath?.toLowerCase() ?? "";
  
      // every search word must be somewhere in the path
      return searchWords.every(word => path.includes(word));
    });
  
    setResults(search ? matches : fileTree);
  };
  
  const handleResultClick = (url: string) => {
    setActiveDocURL(url);
    setSearchTerm("");
    setResults([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className={styles.searchBarDiv}>
      <input
        onChange={handleChange}
        type="search"
        onFocus={handleFocus}
        placeholder="Search..."
        className={styles.searchInput}
        value={searchTerm}
      />
      {results.length > 0 && (
        <div className={styles.results}>
          {loading && (
            <p key="loading" className={styles.resultItem}>
              Loading...
            </p>
          )}
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
      )}
    </div>
  );
};

export default SearchBar;
