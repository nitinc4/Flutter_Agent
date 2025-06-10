import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Laptop, RefreshCw, Play, Square, RotateCcw } from 'lucide-react';
import { File } from '../types';
import { FlutterCompiler, CompilationResult } from '../utils/flutterCompiler';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface FlutterPreviewProps {
  activeFile: File | null;
  allFiles: Record<string, File>;
}

const FlutterPreview: React.FC<FlutterPreviewProps> = ({ activeFile, allFiles }) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
  const [counter, setCounter] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [appState, setAppState] = useState<any>({
    counter: 0,
    selectedIndex: 0,
    items: Array.from({ length: 20 }, (_, i) => ({
      title: `Item ${i + 1}`,
      subtitle: `This is the subtitle for item ${i + 1}`,
      icon: 'star'
    }))
  });

  const compiler = FlutterCompiler.getInstance();

  useEffect(() => {
    if (activeFile?.path.endsWith('.dart') && allFiles) {
      handleCompile();
    }
  }, [activeFile?.content, allFiles]);

  const handleCompile = async () => {
    if (!allFiles) return;

    setIsCompiling(true);
    
    const project = {
      name: 'flutter_project',
      files: Object.fromEntries(
        Object.entries(allFiles).map(([path, file]) => [path, file.content])
      ),
      dependencies: {}
    };

    try {
      const result = await compiler.compileProject(project);
      setCompilationResult(result);
      
      if (result.success) {
        setIsRunning(true);
      }
    } catch (error) {
      console.error('Compilation failed:', error);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleRefresh = () => {
    setIsCompiling(true);
    setAppState({
      counter: 0,
      selectedIndex: 0,
      items: Array.from({ length: 20 }, (_, i) => ({
        title: `Item ${i + 1}`,
        subtitle: `This is the subtitle for item ${i + 1}`,
        icon: 'star'
      }))
    });
    
    setTimeout(() => {
      setIsCompiling(false);
    }, 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setAppState({
      counter: 0,
      selectedIndex: 0,
      items: Array.from({ length: 20 }, (_, i) => ({
        title: `Item ${i + 1}`,
        subtitle: `This is the subtitle for item ${i + 1}`,
        icon: 'star'
      }))
    });
  };

  const handleHotReload = () => {
    handleCompile();
  };

  const getDeviceStyles = () => {
    switch (deviceType) {
      case 'mobile':
        return 'w-[320px] h-[640px]';
      case 'tablet':
        return 'w-[768px] h-[512px]';
      case 'desktop':
        return 'w-full h-full max-w-[1024px] max-h-[768px]';
    }
  };

  const renderFlutterApp = () => {
    const mainDartContent = allFiles?.['lib/main.dart']?.content || '';
    
    // Detect app type based on content
    if (mainDartContent.includes('BottomNavigationBar')) {
      return renderNavigationApp();
    } else if (mainDartContent.includes('ListView')) {
      return renderListViewApp();
    } else {
      return renderBasicApp();
    }
  };

  const renderBasicApp = () => (
    <div className="w-full h-full flex flex-col">
      <div className="bg-blue-500 text-white p-4 flex items-center">
        <h3 className="font-semibold">Flutter Demo Home Page</h3>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-100">
        <p className="text-center mb-2 text-gray-800">You have pushed the button this many times:</p>
        <p className="text-4xl font-bold mb-8 text-gray-900">{appState.counter}</p>
        
        <div className="w-full space-y-4 max-w-sm">
          <div className="bg-gray-100 dark:bg-gray-200 p-3 rounded-lg">
            <p className="font-medium text-gray-800">Text Widget</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-200 p-3 rounded-lg">
            <p className="font-medium text-gray-800">Container Widget</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-200 p-3 rounded-lg">
            <p className="font-medium text-gray-800">Column Widget</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4">
        <button 
          className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 active:bg-blue-700 transition-colors"
          onClick={() => setAppState(prev => ({ ...prev, counter: prev.counter + 1 }))}
        >
          <span className="text-2xl">+</span>
        </button>
      </div>
    </div>
  );

  const renderNavigationApp = () => (
    <div className="w-full h-full flex flex-col">
      {/* App Bar */}
      <div className="bg-blue-500 text-white p-4 flex items-center">
        <h3 className="font-semibold">
          {appState.selectedIndex === 0 ? 'Home' : 
           appState.selectedIndex === 1 ? 'Search' : 'Profile'}
        </h3>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-100">
        {appState.selectedIndex === 0 && (
          <>
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <span className="text-4xl">🏠</span>
            </div>
            <p className="text-2xl font-semibold text-gray-800">Welcome to Home!</p>
          </>
        )}
        
        {appState.selectedIndex === 1 && (
          <>
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <p className="text-2xl font-semibold text-gray-800">Search for anything!</p>
          </>
        )}
        
        {appState.selectedIndex === 2 && (
          <>
            <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <span className="text-4xl">👤</span>
            </div>
            <p className="text-2xl font-semibold text-gray-800">Your Profile</p>
          </>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 flex">
        {['Home', 'Search', 'Profile'].map((tab, index) => (
          <button
            key={tab}
            className={`flex-1 py-3 px-4 text-center ${
              appState.selectedIndex === index 
                ? 'text-blue-500 bg-blue-50' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setAppState(prev => ({ ...prev, selectedIndex: index }))}
          >
            <div className="text-xs font-medium">{tab}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderListViewApp = () => (
    <div className="w-full h-full flex flex-col">
      <div className="bg-blue-500 text-white p-4 flex items-center">
        <h3 className="font-semibold">ListView Demo</h3>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-50">
        {appState.items.map((item: any, index: number) => (
          <div 
            key={index}
            className="bg-white mx-4 my-2 rounded-lg shadow-sm border border-gray-200 p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              // Simulate snackbar
              const snackbar = document.createElement('div');
              snackbar.className = 'fixed bottom-4 left-4 right-4 bg-gray-800 text-white p-3 rounded-lg z-50';
              snackbar.textContent = `Tapped on ${item.title}`;
              document.body.appendChild(snackbar);
              setTimeout(() => document.body.removeChild(snackbar), 2000);
            }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-600">⭐</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 right-4">
        <button 
          className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 active:bg-blue-700 transition-colors"
          onClick={() => {
            const newItem = {
              title: `Item ${appState.items.length + 1}`,
              subtitle: `This is the subtitle for item ${appState.items.length + 1}`,
              icon: 'star'
            };
            setAppState(prev => ({ ...prev, items: [...prev.items, newItem] }));
          }}
        >
          <span className="text-2xl">+</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800">
      {/* Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            className={`p-1.5 rounded-md ${deviceType === 'mobile' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            onClick={() => setDeviceType('mobile')}
            title="Mobile Preview"
          >
            <Smartphone className="h-4 w-4" />
          </button>
          <button 
            className={`p-1.5 rounded-md ${deviceType === 'tablet' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            onClick={() => setDeviceType('tablet')}
            title="Tablet Preview"
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button 
            className={`p-1.5 rounded-md ${deviceType === 'desktop' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            onClick={() => setDeviceType('desktop')}
            title="Desktop Preview"
          >
            <Laptop className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className={`p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${isRunning ? 'text-green-500' : 'text-gray-500'}`}
            onClick={isRunning ? handleStop : handleCompile}
            disabled={isCompiling}
            title={isRunning ? "Stop App" : "Run App"}
          >
            {isRunning ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          
          <button 
            className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-orange-500"
            onClick={handleHotReload}
            disabled={isCompiling || !isRunning}
            title="Hot Reload"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          
          <button 
            className={`p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${isCompiling ? 'animate-spin text-blue-500' : ''}`}
            onClick={handleRefresh}
            disabled={isCompiling}
            title="Refresh Preview"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Status Bar */}
      {compilationResult && (
        <div className={`px-4 py-2 text-sm ${
          compilationResult.success 
            ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300' 
            : 'bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300'
        }`}>
          {compilationResult.success ? (
            <span>✓ Compilation successful - App is running</span>
          ) : (
            <span>✗ Compilation failed: {compilationResult.errors?.[0] || 'Unknown error'}</span>
          )}
        </div>
      )}
      
      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-4">
        <div className={`border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-black ${getDeviceStyles()} relative`}>
          {isRunning ? renderFlutterApp() : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Play className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Flutter App Preview
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Click the play button to run your Flutter app
                </p>
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={handleCompile}
                  disabled={isCompiling}
                >
                  {isCompiling ? 'Compiling...' : 'Run App'}
                </button>
              </div>
            </div>
          )}
          
          {isCompiling && (
            <div className="absolute inset-0 bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Compiling Flutter app...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlutterPreview;