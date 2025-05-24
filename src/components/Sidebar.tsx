import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FilePlus, 
  FolderPlus, 
  FileCode, 
  FileText,
  Settings,
  Package,
  Search,
  Grid
} from 'lucide-react';
import { File, Directory } from '../types';
import WidgetPalette from './WidgetPalette';

interface SidebarProps {
  onFileSelect: (file: File) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFileSelect }) => {
  const [activeTab, setActiveTab] = useState<'files' | 'widgets' | 'packages'>('files');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/lib']));
  
  // Mock project structure
  const projectStructure: Directory = {
    name: 'flutter_project',
    path: '/',
    type: 'directory',
    children: [
      {
        name: 'lib',
        path: '/lib',
        type: 'directory',
        children: [
          {
            name: 'main.dart',
            path: '/lib/main.dart',
            type: 'file',
            content: "import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Flutter Demo',\n      theme: ThemeData(\n        primarySwatch: Colors.blue,\n      ),\n      home: MyHomePage(title: 'Flutter Demo Home Page'),\n    );\n  }\n}\n\nclass MyHomePage extends StatefulWidget {\n  MyHomePage({Key key, this.title}) : super(key: key);\n  final String title;\n\n  @override\n  _MyHomePageState createState() => _MyHomePageState();\n}\n\nclass _MyHomePageState extends State<MyHomePage> {\n  int _counter = 0;\n\n  void _incrementCounter() {\n    setState(() {\n      _counter++;\n    });\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(\n        title: Text(widget.title),\n      ),\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: <Widget>[\n            Text(\n              'You have pushed the button this many times:',\n            ),\n            Text(\n              '$_counter',\n              style: Theme.of(context).textTheme.headline4,\n            ),\n          ],\n        ),\n      ),\n      floatingActionButton: FloatingActionButton(\n        onPressed: _incrementCounter,\n        tooltip: 'Increment',\n        child: Icon(Icons.add),\n      ),\n    );\n  }\n}"
          },
          {
            name: 'widgets',
            path: '/lib/widgets',
            type: 'directory',
            children: [
              {
                name: 'custom_button.dart',
                path: '/lib/widgets/custom_button.dart',
                type: 'file',
                content: "import 'package:flutter/material.dart';\n\nclass CustomButton extends StatelessWidget {\n  final String text;\n  final VoidCallback onPressed;\n\n  const CustomButton({\n    Key key,\n    @required this.text,\n    @required this.onPressed,\n  }) : super(key: key);\n\n  @override\n  Widget build(BuildContext context) {\n    return ElevatedButton(\n      onPressed: onPressed,\n      child: Text(text),\n      style: ElevatedButton.styleFrom(\n        primary: Colors.blue,\n        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),\n        textStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),\n      ),\n    );\n  }\n}"
              }
            ]
          }
        ]
      },
      {
        name: 'pubspec.yaml',
        path: '/pubspec.yaml',
        type: 'file',
        content: "name: flutter_project\ndescription: A new Flutter project.\n\npublish_to: 'none'\nversion: 1.0.0+1\n\nenvironment:\n  sdk: \">=2.12.0 <3.0.0\"\n\ndependencies:\n  flutter:\n    sdk: flutter\n  cupertino_icons: ^1.0.2\n\ndev_dependencies:\n  flutter_test:\n    sdk: flutter\n\nflutter:\n  uses-material-design: true"
      },
      {
        name: 'README.md',
        path: '/README.md',
        type: 'file',
        content: "# Flutter Project\n\nA new Flutter project created with Flutter Web IDE."
      }
    ]
  };

  const toggleFolder = (path: string) => {
    const newExpandedFolders = new Set(expandedFolders);
    if (newExpandedFolders.has(path)) {
      newExpandedFolders.delete(path);
    } else {
      newExpandedFolders.add(path);
    }
    setExpandedFolders(newExpandedFolders);
  };

  const handleFileClick = (file: File) => {
    onFileSelect(file);
  };

  const renderTree = (item: Directory | File, level = 0) => {
    const paddingLeft = `${level * 12}px`;
    
    if (item.type === 'directory') {
      const isExpanded = expandedFolders.has(item.path);
      return (
        <div key={item.path}>
          <div 
            className="flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => toggleFolder(item.path)}
            style={{ paddingLeft }}
          >
            {isExpanded ? (
              <FolderOpen className="h-4 w-4 text-yellow-400 mr-1" />
            ) : (
              <Folder className="h-4 w-4 text-yellow-400 mr-1" />
            )}
            <span className="text-sm truncate">{item.name}</span>
          </div>
          
          {isExpanded && item.children && item.children.map(child => renderTree(child, level + 1))}
        </div>
      );
    } else {
      // File item
      const iconMap: Record<string, React.ReactNode> = {
        '.dart': <FileCode className="h-4 w-4 text-blue-500 mr-1" />,
        '.yaml': <FileText className="h-4 w-4 text-purple-500 mr-1" />,
        '.md': <FileText className="h-4 w-4 text-gray-500 mr-1" />
      };
      
      const extension = item.path.substring(item.path.lastIndexOf('.'));
      const icon = iconMap[extension] || <FileText className="h-4 w-4 mr-1" />;
      
      return (
        <div 
          key={item.path}
          className="flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => handleFileClick(item as File)}
          style={{ paddingLeft }}
        >
          {icon}
          <span className="text-sm truncate">{item.name}</span>
        </div>
      );
    }
  };

  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button 
          className={`flex-1 py-2 ${activeTab === 'files' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          <Folder className="h-4 w-4 mx-auto" />
        </button>
        <button 
          className={`flex-1 py-2 ${activeTab === 'widgets' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          onClick={() => setActiveTab('widgets')}
        >
          <Grid className="h-4 w-4 mx-auto" />
        </button>
        <button 
          className={`flex-1 py-2 ${activeTab === 'packages' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          onClick={() => setActiveTab('packages')}
        >
          <Package className="h-4 w-4 mx-auto" />
        </button>
      </div>
      
      {activeTab === 'files' && (
        <>
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search files..." 
                className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded py-1 px-3 text-sm pl-8 focus:ring-1 focus:ring-blue-500"
              />
              <Search className="h-4 w-4 absolute left-2 top-1.5 text-gray-400" />
            </div>
            <div className="flex mt-2 space-x-2">
              <button className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <FilePlus className="h-3 w-3 mr-1" />
                New File
              </button>
              <button className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <FolderPlus className="h-3 w-3 mr-1" />
                New Folder
              </button>
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {renderTree(projectStructure)}
          </div>
        </>
      )}
      
      {activeTab === 'widgets' && <WidgetPalette />}
      
      {activeTab === 'packages' && (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Package management coming soon</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;