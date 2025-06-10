import React from 'react';
import { X, Save } from 'lucide-react';
import { File } from '../types';
import CodeMirrorEditor from './CodeMirrorEditor';

interface EditorProps {
  openFiles: File[];
  activeFile: File | null;
  onFileClose: (filePath: string) => void;
  onFileSelect: (file: File) => void;
  onFileChange: (filePath: string, content: string) => void;
  onSave?: () => void;
}

const Editor: React.FC<EditorProps> = ({ 
  openFiles, 
  activeFile, 
  onFileClose,
  onFileSelect,
  onFileChange,
  onSave
}) => {
  if (openFiles.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-2xl">📱</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Welcome to Flutter Web IDE</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Create beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Get started by:</p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Selecting a file from the explorer</li>
              <li>• Creating a new Flutter project from templates</li>
              <li>• Opening the widget palette to explore Flutter widgets</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const handleContentChange = (content: string) => {
    if (activeFile) {
      onFileChange(activeFile.path, content);
    }
  };

  const getLanguageFromPath = (path: string): string => {
    if (path.endsWith('.dart')) return 'dart';
    if (path.endsWith('.yaml') || path.endsWith('.yml')) return 'yaml';
    if (path.endsWith('.md')) return 'markdown';
    if (path.endsWith('.html')) return 'html';
    if (path.endsWith('.js')) return 'javascript';
    if (path.endsWith('.json')) return 'json';
    return 'text';
  };

  const getFileIcon = (path: string) => {
    if (path.endsWith('.dart')) return '🎯';
    if (path.endsWith('.yaml') || path.endsWith('.yml')) return '⚙️';
    if (path.endsWith('.md')) return '📝';
    if (path.endsWith('.html')) return '🌐';
    if (path.endsWith('.js')) return '📜';
    if (path.endsWith('.json')) return '📋';
    return '📄';
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto bg-gray-50 dark:bg-gray-900">
        {openFiles.map(file => (
          <div 
            key={file.path}
            className={`flex items-center px-3 py-2 text-sm border-r border-gray-200 dark:border-gray-700 min-w-0 ${
              activeFile?.path === file.path 
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => onFileSelect(file)}
          >
            <span className="mr-2">{getFileIcon(file.path)}</span>
            <span className="truncate max-w-xs">{file.name}</span>
            <button 
              className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                onFileClose(file.path);
              }}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        
        {/* Save indicator */}
        {activeFile && onSave && (
          <div className="flex items-center px-3 py-2 ml-auto">
            <button
              onClick={onSave}
              className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Save file (Ctrl+S)"
            >
              <Save className="h-3 w-3" />
              <span>Save</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Editor Area */}
      <div className="flex-1 overflow-hidden">
        {activeFile && (
          <CodeMirrorEditor
            content={activeFile.content}
            language={getLanguageFromPath(activeFile.path)}
            onChange={handleContentChange}
            onSave={onSave}
          />
        )}
      </div>
      
      {/* Status Bar */}
      {activeFile && (
        <div className="flex items-center justify-between px-4 py-1 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>{getLanguageFromPath(activeFile.path).toUpperCase()}</span>
            <span>UTF-8</span>
            <span>LF</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Lines: {activeFile.content.split('\n').length}</span>
            <span>Characters: {activeFile.content.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;