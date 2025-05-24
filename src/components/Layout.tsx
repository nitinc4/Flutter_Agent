import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from './Sidebar';
import Editor from './Editor';
import Preview from './Preview';
import Terminal from './Terminal';
import Header from './Header';
import { Resizable } from './Resizable';
import { File } from '../types';

const Layout: React.FC = () => {
  const { theme } = useTheme();
  const [openFiles, setOpenFiles] = useState<File[]>([]);
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(true);
  const [files, setFiles] = useState<Record<string, File>>({});

  const handleFileOpen = (file: File) => {
    setFiles(prev => ({
      ...prev,
      [file.path]: file
    }));
    
    if (!openFiles.some(f => f.path === file.path)) {
      setOpenFiles([...openFiles, file]);
    }
    setActiveFile(file);
  };

  const handleFileClose = (filePath: string) => {
    const newOpenFiles = openFiles.filter(file => file.path !== filePath);
    setOpenFiles(newOpenFiles);
    
    if (activeFile?.path === filePath) {
      setActiveFile(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null);
    }
  };

  const handleFileChange = (filePath: string, content: string) => {
    const updatedFile = {
      ...files[filePath],
      content
    };
    
    setFiles(prev => ({
      ...prev,
      [filePath]: updatedFile
    }));
    
    setOpenFiles(prev => 
      prev.map(file => 
        file.path === filePath ? updatedFile : file
      )
    );
    
    if (activeFile?.path === filePath) {
      setActiveFile(updatedFile);
    }
  };

  const toggleTerminal = () => {
    setTerminalOpen(!terminalOpen);
  };

  const togglePreview = () => {
    setPreviewOpen(!previewOpen);
  };

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'dark:bg-gray-900 dark:text-white' : 'bg-white text-gray-900'}`}>
      <Header 
        toggleTerminal={toggleTerminal} 
        togglePreview={togglePreview}
        terminalOpen={terminalOpen}
        previewOpen={previewOpen}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onFileSelect={handleFileOpen} />
        
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 overflow-hidden">
            <Resizable 
              direction="horizontal" 
              defaultSize={previewOpen ? 60 : 100}
              minSize={30}
              maxSize={previewOpen ? 70 : 100}
              className="flex-1 overflow-hidden"
            >
              <Editor 
                openFiles={openFiles} 
                activeFile={activeFile} 
                onFileClose={handleFileClose}
                onFileSelect={setActiveFile}
                onFileChange={handleFileChange}
              />
            </Resizable>
            
            {previewOpen && (
              <Resizable 
                direction="horizontal" 
                defaultSize={40} 
                minSize={30}
                maxSize={70}
                className="overflow-hidden"
              >
                <Preview activeFile={activeFile} />
              </Resizable>
            )}
          </div>
          
          {terminalOpen && (
            <Resizable 
              direction="vertical" 
              defaultSize={30} 
              minSize={20}
              maxSize={50}
              className="overflow-hidden"
            >
              <Terminal />
            </Resizable>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;

export { Layout };