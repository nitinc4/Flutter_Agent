import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import FlutterSidebar from './FlutterSidebar';
import Editor from './Editor';
import FlutterPreview from './FlutterPreview';
import FlutterTerminal from './FlutterTerminal';
import Header from './Header';
import { Resizable } from './Resizable';
import { File } from '../types';
import { getTemplate } from '../utils/flutterTemplates';

const Layout: React.FC = () => {
  const { theme } = useTheme();
  const [openFiles, setOpenFiles] = useState<File[]>([]);
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(true);
  const [files, setFiles] = useState<Record<string, File>>({});
  const [compilationResult, setCompilationResult] = useState<any>(null);

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

  const handleProjectCreate = (templateName: string) => {
    const template = getTemplate(templateName);
    if (!template) return;

    // Clear existing files
    setFiles({});
    setOpenFiles([]);
    setActiveFile(null);

    // Load template files
    const templateFiles: Record<string, File> = {};
    Object.entries(template.files).forEach(([path, content]) => {
      const fileName = path.split('/').pop() || path;
      templateFiles[path] = {
        name: fileName,
        path,
        type: 'file',
        content
      };
    });

    setFiles(templateFiles);

    // Open main.dart by default
    const mainFile = templateFiles['lib/main.dart'];
    if (mainFile) {
      setOpenFiles([mainFile]);
      setActiveFile(mainFile);
    }

    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
    notification.textContent = `${template.name} template loaded successfully!`;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  const toggleTerminal = () => {
    setTerminalOpen(!terminalOpen);
  };

  const togglePreview = () => {
    setPreviewOpen(!previewOpen);
  };

  const handleFileSave = () => {
    if (activeFile) {
      // Auto-save is already handled in handleFileChange
      // This could trigger additional save actions like formatting
      console.log('File saved:', activeFile.path);
    }
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
        <FlutterSidebar 
          onFileSelect={handleFileOpen} 
          onProjectCreate={handleProjectCreate}
        />
        
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
                onSave={handleFileSave}
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
                <FlutterPreview 
                  activeFile={activeFile} 
                  allFiles={files}
                />
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
              <FlutterTerminal 
                onCompilationResult={setCompilationResult}
                currentFiles={files}
              />
            </Resizable>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;

export { Layout };