export interface File {
  name: string;
  path: string;
  type: 'file';
  content: string;
}

export interface Directory {
  name: string;
  path: string;
  type: 'directory';
  children: (File | Directory)[];
}