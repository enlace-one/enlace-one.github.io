import React, {useState, useEffect, act, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Heading } from "@aws-amplify/ui-react";
import { DOCS_GITHUB_ROOT_FOLDER, SITE_NAME } from '../../../common/constants';
import DocsSidebar from '../../components/DocsSidebar/DocsSideBar';
import DocsMarkdown from '../../components/DocsMarkdown/DocsMarkdown';
import styles from "./Home.module.css"
import SearchBar from '../../components/SearchBar/SearchBar';
import {FileNode} from "../../types"
import ContentsSidebar from '../../components/ContentsSidebar/ContentsSidebar';


function Home() {
    const [activeDocURL, setActiveDocURL] = useState("");
    const [fileTree, setFileTree] = useState<FileNode[]>([]);
    const [flatFileTree, setFlatFileTree] = useState<FileNode[]>([]);
    const markdownRef = useRef<HTMLDivElement>(null);


    const displayPath = (path: string) => {
        console.log(path)
        path = path.replace(DOCS_GITHUB_ROOT_FOLDER, "")
        path = path.replace("/", " > ")
        return path
      }

      useEffect(() => {
        if (!activeDocURL) return;
      
        // Get current hash (after #)
        const currentHash = window.location.hash.slice(1); // remove leading "#"
      
        // Split path and existing query params (if any)
        const [path, queryString = ""] = currentHash.split("?");
      
        // Build new query string
        const newQuery = new URLSearchParams(queryString);
        newQuery.set("file", activeDocURL);
      
        // Update the hash safely
        const newHash = `${path}?${newQuery.toString()}`;
        window.location.hash = `#${newHash}`;
      }, [activeDocURL]);
      
      

    useEffect(() => {
        const flattenTree = (nodes: FileNode[]): FileNode[] => {
          let files: FileNode[] = [];
    
          for (const node of nodes) {
            if (node.type === "file") { 
                node.displayPath = displayPath(node.path)
                files.push(node);
            }
            if (node.children && node.children.length > 0) {
              files = files.concat(flattenTree(node.children));
            }
          }
    
          return files;
        };
    
        const flatFiles = flattenTree(fileTree);
        setFlatFileTree(flatFiles);
      }, [fileTree]);


    return <>
    <div className={styles.docsHome}>
        <DocsSidebar setActiveDocURL={setActiveDocURL} fileTree={fileTree} setFileTree={setFileTree}/>
        <div className={styles.body} ref={markdownRef}>
            <SearchBar setActiveDocURL={setActiveDocURL} fileTree={flatFileTree} />
            {activeDocURL === "" && <>
                <div>
                    <h2>Welcome to {SITE_NAME} Documenation!</h2>
                    <p>Explore the document tree on the left to find what you need.</p>
                </div></>
            }
            {activeDocURL != "" && <DocsMarkdown activeDocURL={activeDocURL} />}
            </div>
        </div>
        <ContentsSidebar activeDocURL={activeDocURL} parentElement={markdownRef.current}/>

    </>
}

export default Home