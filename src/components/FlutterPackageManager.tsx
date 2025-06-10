import React, { useState } from 'react';
import { Search, Download, Star, ExternalLink, Plus, Trash2 } from 'lucide-react';

interface FlutterPackage {
  name: string;
  description: string;
  version: string;
  popularity: number;
  likes: number;
  pubPoints: number;
  category: string;
  homepage?: string;
  repository?: string;
  installed?: boolean;
}

const FlutterPackageManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [installedPackages, setInstalledPackages] = useState<Set<string>>(new Set(['flutter', 'cupertino_icons']));

  const popularPackages: FlutterPackage[] = [
    {
      name: 'http',
      description: 'A composable, multi-platform, Future-based API for HTTP requests.',
      version: '1.1.0',
      popularity: 98,
      likes: 1250,
      pubPoints: 140,
      category: 'Network',
      homepage: 'https://pub.dev/packages/http',
      repository: 'https://github.com/dart-lang/http'
    },
    {
      name: 'provider',
      description: 'A wrapper around InheritedWidget to make them easier to use and more reusable.',
      version: '6.1.1',
      popularity: 95,
      likes: 1180,
      pubPoints: 140,
      category: 'State Management',
      homepage: 'https://pub.dev/packages/provider'
    },
    {
      name: 'shared_preferences',
      description: 'Flutter plugin for reading and writing simple key-value pairs.',
      version: '2.2.2',
      popularity: 92,
      likes: 980,
      pubPoints: 130,
      category: 'Storage',
      homepage: 'https://pub.dev/packages/shared_preferences'
    },
    {
      name: 'cached_network_image',
      description: 'A flutter library to show images from the internet and keep them in the cache directory.',
      version: '3.3.0',
      popularity: 89,
      likes: 850,
      pubPoints: 130,
      category: 'Images',
      homepage: 'https://pub.dev/packages/cached_network_image'
    },
    {
      name: 'flutter_bloc',
      description: 'A predictable state management library that helps implement the BLoC design pattern.',
      version: '8.1.3',
      popularity: 87,
      likes: 920,
      pubPoints: 140,
      category: 'State Management',
      homepage: 'https://pub.dev/packages/flutter_bloc'
    },
    {
      name: 'dio',
      description: 'A powerful HTTP client for Dart, which supports Interceptors, FormData, Request Cancellation, File Downloading, Timeout etc.',
      version: '5.3.2',
      popularity: 85,
      likes: 780,
      pubPoints: 130,
      category: 'Network',
      homepage: 'https://pub.dev/packages/dio'
    },
    {
      name: 'sqflite',
      description: 'SQLite plugin for Flutter. Supports iOS, Android and MacOS.',
      version: '2.3.0',
      popularity: 83,
      likes: 720,
      pubPoints: 130,
      category: 'Database',
      homepage: 'https://pub.dev/packages/sqflite'
    },
    {
      name: 'image_picker',
      description: 'A Flutter plugin for iOS and Android for picking images from the image library, and taking new pictures with the camera.',
      version: '1.0.4',
      popularity: 81,
      likes: 650,
      pubPoints: 120,
      category: 'Media',
      homepage: 'https://pub.dev/packages/image_picker'
    },
    {
      name: 'flutter_svg',
      description: 'An SVG rendering and widget library for Flutter, which allows painting and displaying Scalable Vector Graphics 1.1 files.',
      version: '2.0.9',
      popularity: 79,
      likes: 580,
      pubPoints: 120,
      category: 'Images',
      homepage: 'https://pub.dev/packages/flutter_svg'
    },
    {
      name: 'url_launcher',
      description: 'A Flutter plugin for launching a URL in the mobile platform.',
      version: '6.2.1',
      popularity: 77,
      likes: 520,
      pubPoints: 120,
      category: 'Platform',
      homepage: 'https://pub.dev/packages/url_launcher'
    },
    {
      name: 'firebase_core',
      description: 'A Flutter plugin to use the Firebase Core API, which enables connecting to multiple Firebase apps.',
      version: '2.24.2',
      popularity: 75,
      likes: 480,
      pubPoints: 130,
      category: 'Firebase',
      homepage: 'https://pub.dev/packages/firebase_core'
    },
    {
      name: 'google_fonts',
      description: 'A Flutter package to use fonts from fonts.google.com.',
      version: '6.1.0',
      popularity: 73,
      likes: 450,
      pubPoints: 120,
      category: 'UI',
      homepage: 'https://pub.dev/packages/google_fonts'
    }
  ];

  const categories = ['All', ...Array.from(new Set(popularPackages.map(p => p.category)))];

  const filteredPackages = popularPackages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstallPackage = (packageName: string) => {
    setInstalledPackages(prev => new Set([...prev, packageName]));
    
    // Show installation notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
    notification.textContent = `${packageName} installed successfully!`;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  const handleUninstallPackage = (packageName: string) => {
    setInstalledPackages(prev => {
      const newSet = new Set(prev);
      newSet.delete(packageName);
      return newSet;
    });
    
    // Show uninstallation notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg z-50';
    notification.textContent = `${packageName} uninstalled successfully!`;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return 'text-green-500';
    if (popularity >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700">
        <div className="relative mb-2">
          <input 
            type="text" 
            placeholder="Search packages..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded py-1 px-3 text-sm pl-8 focus:ring-1 focus:ring-blue-500"
          />
          <Search className="h-4 w-4 absolute left-2 top-1.5 text-gray-400" />
        </div>
        
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded py-1 px-2 text-sm focus:ring-1 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="overflow-y-auto flex-1 p-2">
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Installed Packages ({installedPackages.size})
          </h3>
          <div className="space-y-1">
            {Array.from(installedPackages).map(packageName => (
              <div key={packageName} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900 rounded">
                <span className="text-sm font-medium text-green-800 dark:text-green-200">{packageName}</span>
                {packageName !== 'flutter' && packageName !== 'cupertino_icons' && (
                  <button
                    onClick={() => handleUninstallPackage(packageName)}
                    className="p-1 hover:bg-green-200 dark:hover:bg-green-800 rounded"
                    title="Uninstall package"
                  >
                    <Trash2 className="h-3 w-3 text-green-600 dark:text-green-300" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Available Packages</h3>
        
        {filteredPackages.map((pkg) => {
          const isInstalled = installedPackages.has(pkg.name);
          
          return (
            <div 
              key={pkg.name}
              className="mb-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-sm text-blue-600 dark:text-blue-400">{pkg.name}</h4>
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{pkg.version}</span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {pkg.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{pkg.description}</p>
                </div>
                
                <div className="flex space-x-1 ml-2">
                  {isInstalled ? (
                    <button
                      onClick={() => handleUninstallPackage(pkg.name)}
                      className="p-1.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
                      title="Uninstall package"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleInstallPackage(pkg.name)}
                      className="p-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                      title="Install package"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  )}
                  
                  {pkg.homepage && (
                    <button
                      onClick={() => window.open(pkg.homepage, '_blank')}
                      className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      title="View on pub.dev"
                    >
                      <ExternalLink className="h-3 w-3 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>{pkg.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="h-3 w-3" />
                  <span className={getPopularityColor(pkg.popularity)}>{pkg.popularity}%</span>
                </div>
                <div>
                  <span>Pub Points: {pkg.pubPoints}</span>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredPackages.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No packages found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlutterPackageManager;