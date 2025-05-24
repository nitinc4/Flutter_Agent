import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Code, 
  Terminal as TerminalIcon, 
  Smartphone, 
  Play, 
  Moon, 
  Sun,
  Settings,
  FileSymlink
} from 'lucide-react';

interface HeaderProps {
  toggleTerminal: () => void;
  togglePreview: () => void;
  terminalOpen: boolean;
  previewOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleTerminal, 
  togglePreview,
  terminalOpen,
  previewOpen
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Code className="h-6 w-6 text-blue-500" />
        <h1 className="text-lg font-semibold">Flutter Web IDE</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          className={`p-1.5 rounded-md transition-colors ${previewOpen ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          onClick={togglePreview}
          title={previewOpen ? "Hide Preview" : "Show Preview"}
        >
          <Smartphone className="h-5 w-5" />
        </button>
        
        <button 
          className={`p-1.5 rounded-md transition-colors ${terminalOpen ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          onClick={toggleTerminal}
          title={terminalOpen ? "Hide Terminal" : "Show Terminal"}
        >
          <TerminalIcon className="h-5 w-5" />
        </button>
        
        <button 
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Run Application"
        >
          <Play className="h-5 w-5 text-green-500" />
        </button>
        
        <button 
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Export Project"
        >
          <FileSymlink className="h-5 w-5" />
        </button>
        
        <button 
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Settings"
        >
          <Settings className="h-5 w-5" />
        </button>
        
        <button 
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleTheme}
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;