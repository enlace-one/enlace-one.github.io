import React, { useState, useEffect } from 'react';
import { DOCS_GITHUB_ROOT_FOLDER } from '../../../common/constants';
import styles from './DocsSidebar.module.css'; // <--- import your modular CSS here
import {FileNode } from "../../types"

export interface FileTreeNodeProps {
  node: FileNode;
  onSelectFile: (url: string) => void;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ node, onSelectFile }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  if (node.type === 'file') {
    return (
      <div className={styles.treeNode}>
        <button
          onClick={() => node.path && onSelectFile(node.path)}
          className={styles.fileButton}
        >
          {node.name}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.treeNode}>
      <button onClick={toggleOpen} className={styles.folderButton}>
        {isOpen ? '▼' : '▶'} {node.name}
      </button>
      {isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface DocsSidebarProps {
  setActiveDocURL: (url: string) => void;
  setFileTree: (FileNodes: FileNode[]) => void;
  fileTree: FileNode[];
}


const DocsSidebar: React.FC<DocsSidebarProps> = ({ setActiveDocURL, fileTree, setFileTree}) => {

  const fetchDirectory = async (url = DOCS_GITHUB_ROOT_FOLDER): Promise<FileNode[]> => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log('Status:', response.status, response.statusText);
        console.log('Response.text:', await response.text());
        throw new Error('Failed to fetch directory');
      }

      const data: any[] = await response.json();

      const nodes: FileNode[] = await Promise.all(
        data
          .filter((item) => item.type === 'dir' || item.name.endsWith('.md'))
          .map(async (item) => {
            if (item.type === 'dir') {
              const children = await fetchDirectory(DOCS_GITHUB_ROOT_FOLDER + item.path);
              return {
                name: item.name,
                type: 'dir',
                path: item.path,
                children: children.sort((a, b) =>
                  a.type === 'dir' && b.type !== 'dir'
                    ? -1
                    : a.type !== 'dir' && b.type === 'dir'
                    ? 1
                    : a.name.localeCompare(b.name)
                ),
              };
            }
            return {
              name: item.name.split('.')[0],
              type: 'file',
              path: item.path,
              download_url: item.download_url,
            };
          })
      );

      return nodes;
    } catch (error) {
      console.error('Error fetching directory:', error, 'for', url);
      return [];
    }
  };

  useEffect(() => {
    fetchDirectory().then((tree) => {
      setFileTree(
        tree.sort((a, b) =>
          a.type === 'dir' && b.type !== 'dir'
            ? -1
            : a.type !== 'dir' && b.type === 'dir'
            ? 1
            : a.name.localeCompare(b.name)
        )
      );
    });
  }, []);

  const handleSelectFile = (downloadUrl: string) => {
    setActiveDocURL(downloadUrl);
  };

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Documentation</h2>
        {fileTree.length > 0 ? (
          fileTree.map((node) => (
            <FileTreeNode
              key={node.path}
              node={node}
              onSelectFile={handleSelectFile}
            />
          ))
        ) : (
          <p className={styles.loadingText}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DocsSidebar;
