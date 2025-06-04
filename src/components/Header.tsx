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

  const handleRunApp = () => {
    const terminal = document.querySelector('.terminal-input') as HTMLInputElement;
    if (terminal) {
      terminal.value = 'flutter run -d web';
      terminal.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    }
  };

  const handleExport = () => {
    const projectContent = {
      'pubspec.yaml': document.querySelector('[data-file="pubspec.yaml"]')?.textContent,
      'lib/main.dart': document.querySelector('[data-file="main.dart"]')?.textContent,
    };

    const blob = new Blob([JSON.stringify(projectContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flutter_project.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSettings = () => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Settings</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-gray-300">Editor Font Size</span>
            <input type="number" value="14" min="8" max="32" class="w-20 p-1 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-gray-300">Auto Save</span>
            <input type="checkbox" checked class="form-checkbox h-4 w-4 text-blue-500">
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-gray-300">Format On Save</span>
            <input type="checkbox" checked class="form-checkbox h-4 w-4 text-blue-500">
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-2">
          <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" onclick="this.closest('.fixed').remove()">Cancel</button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" onclick="this.closest('.fixed').remove()">Save</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  };

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
          onClick={handleRunApp}
          title="Run Application"
        >
          <Play className="h-5 w-5 text-green-500" />
        </button>
        
        <button 
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={handleExport}
          title="Export Project"
        >
          <FileSymlink className="h-5 w-5" />
        </button>
        
        <button 
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={handleSettings}
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