
export interface FileNode {
  name: string;
  type: 'file' | 'dir';
  path: string;
  displayPath?: string;
  download_url?: string;
  children?: FileNode[];
}

