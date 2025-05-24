import React, { useState } from 'react';
import { Smartphone, Tablet, Laptop, RefreshCw } from 'lucide-react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const Preview: React.FC = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getDeviceStyles = () => {
    switch (deviceType) {
      case 'mobile':
        return 'w-[320px] h-[640px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      case 'desktop':
        return 'w-full h-full max-w-[1280px]';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800">
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
        
        <button 
          className={`p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${isLoading ? 'animate-spin text-blue-500' : ''}`}
          onClick={handleRefresh}
          disabled={isLoading}
          title="Refresh Preview"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-center overflow-auto p-4">
        <div className={`border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-black ${getDeviceStyles()} relative`}>
          {/* Mock Flutter App Preview */}
          <div className="w-full h-full flex flex-col">
            {/* App Bar */}
            <div className="bg-blue-500 text-white p-4 flex items-center">
              <h3 className="font-semibold">Flutter Demo Home Page</h3>
            </div>
            
            {/* App Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <p className="text-center mb-2">You have pushed the button this many times:</p>
              <p className="text-4xl font-bold mb-8">0</p>
              
              {/* Example Flutter Widgets */}
              <div className="w-full space-y-4 max-w-sm">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="font-medium">Text Widget</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="font-medium">Container Widget</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="font-medium">Column Widget</p>
                </div>
              </div>
            </div>
            
            {/* Floating Action Button */}
            <div className="absolute bottom-4 right-4">
              <button className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg">
                <span className="text-2xl">+</span>
              </button>
            </div>
          </div>
          
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;