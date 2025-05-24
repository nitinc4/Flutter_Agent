import React from 'react';
import { X } from 'lucide-react';
import { File } from '../types';
import CodeMirrorEditor from './CodeMirrorEditor';

interface EditorProps {
  openFiles: File[];
  activeFile: File | null;
  onFileClose: (filePath: string) => void;
  onFileSelect: (file: File) => void;
  onFileChange: (filePath: string, content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ 
  openFiles, 
  activeFile, 
  onFileClose,
  onFileSelect,
  onFileChange
}) => {
  if (openFiles.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="text-center p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Welcome to Flutter Web IDE</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Select a file from the explorer to begin editing</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Create a new file
          </button>
        </div>
      </div>
    );
  }

  const handleContentChange = (content: string) => {
    if (activeFile) {
      onFileChange(activeFile.path, content);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {openFiles.map(file => (
          <div 
            key={file.path}
            className={`flex items-center px-3 py-2 text-sm border-r border-gray-200 dark:border-gray-700 ${activeFile?.path === file.path ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            onClick={() => onFileSelect(file)}
          >
            <span className="truncate max-w-xs">{file.name}</span>
            <button 
              className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                onFileClose(file.path);
              }}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex-1 overflow-auto">
        {activeFile && (
          <CodeMirrorEditor
            content={activeFile.content}
            language={activeFile.path.endsWith('.dart') ? 'dart' : 
                     activeFile.path.endsWith('.yaml') ? 'yaml' : 
                     activeFile.path.endsWith('.md') ? 'markdown' : 'text'}
            onChange={handleContentChange}
          />
        )}
      </div>
    </div>
  );
};

export default Editor;