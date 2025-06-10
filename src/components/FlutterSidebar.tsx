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
  Grid,
  Download,
  Zap,
  BookOpen
} from 'lucide-react';
import { File, Directory } from '../types';
import FlutterWidgetPalette from './FlutterWidgetPalette';
import FlutterPackageManager from './FlutterPackageManager';
import { flutterTemplates, getTemplate } from '../utils/flutterTemplates';

interface FlutterSidebarProps {
  onFileSelect: (file: File) => void;
  onProjectCreate: (template: string) => void;
}

const FlutterSidebar: React.FC<FlutterSidebarProps> = ({ onFileSelect, onProjectCreate }) => {
  const [activeTab, setActiveTab] = useState<'files' | 'widgets' | 'packages' | 'templates'>('files');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/lib']));
  const [searchTerm, setSearchTerm] = useState('');
  
  // Enhanced project structure with more Flutter files
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
            content: `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}`
          },
          {
            name: 'models',
            path: '/lib/models',
            type: 'directory',
            children: [
              {
                name: 'user.dart',
                path: '/lib/models/user.dart',
                type: 'file',
                content: `class User {
  final String id;
  final String name;
  final String email;
  final DateTime createdAt;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}`
              }
            ]
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
                content: `import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final Color? backgroundColor;
  final Color? textColor;
  final double? borderRadius;
  final EdgeInsetsGeometry? padding;

  const CustomButton({
    Key? key,
    required this.text,
    this.onPressed,
    this.backgroundColor,
    this.textColor,
    this.borderRadius,
    this.padding,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor ?? Theme.of(context).primaryColor,
        foregroundColor: textColor ?? Colors.white,
        padding: padding ?? EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(borderRadius ?? 8),
        ),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}`
              },
              {
                name: 'loading_indicator.dart',
                path: '/lib/widgets/loading_indicator.dart',
                type: 'file',
                content: `import 'package:flutter/material.dart';

class LoadingIndicator extends StatelessWidget {
  final double? size;
  final Color? color;
  final String? message;

  const LoadingIndicator({
    Key? key,
    this.size,
    this.color,
    this.message,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(
            width: size ?? 50,
            height: size ?? 50,
            child: CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(
                color ?? Theme.of(context).primaryColor,
              ),
            ),
          ),
          if (message != null) ...[
            SizedBox(height: 16),
            Text(
              message!,
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[600],
              ),
            ),
          ],
        ],
      ),
    );
  }
}`
              }
            ]
          },
          {
            name: 'screens',
            path: '/lib/screens',
            type: 'directory',
            children: [
              {
                name: 'home_screen.dart',
                path: '/lib/screens/home_screen.dart',
                type: 'file',
                content: `import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Welcome!',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            SizedBox(height: 16),
            Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Column(
                  children: [
                    Icon(
                      Icons.home,
                      size: 64,
                      color: Theme.of(context).primaryColor,
                    ),
                    SizedBox(height: 16),
                    Text(
                      'This is your home screen',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`
              }
            ]
          }
        ]
      },
      {
        name: 'test',
        path: '/test',
        type: 'directory',
        children: [
          {
            name: 'widget_test.dart',
            path: '/test/widget_test.dart',
            type: 'file',
            content: `import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_project/main.dart';

void main() {
  testWidgets('Counter increments smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(MyApp());

    // Verify that our counter starts at 0.
    expect(find.text('0'), findsOneWidget);
    expect(find.text('1'), findsNothing);

    // Tap the '+' icon and trigger a frame.
    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();

    // Verify that our counter has incremented.
    expect(find.text('0'), findsNothing);
    expect(find.text('1'), findsOneWidget);
  });
}`
          }
        ]
      },
      {
        name: 'web',
        path: '/web',
        type: 'directory',
        children: [
          {
            name: 'index.html',
            path: '/web/index.html',
            type: 'file',
            content: `<!DOCTYPE html>
<html>
<head>
  <base href="$FLUTTER_BASE_HREF">
  <meta charset="UTF-8">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta name="description" content="A new Flutter project.">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="flutter_project">
  <link rel="apple-touch-icon" href="icons/Icon-192.png">
  <title>flutter_project</title>
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <script>
    window.addEventListener('load', function(ev) {
      _flutter.loader.loadEntrypoint({
        serviceWorker: {
          serviceWorkerVersion: serviceWorkerVersion,
        }
      }).then(function(engineInitializer) {
        return engineInitializer.initializeEngine();
      }).then(function(appRunner) {
        return appRunner.runApp();
      });
    });
  </script>
</body>
</html>`
          }
        ]
      },
      {
        name: 'pubspec.yaml',
        path: '/pubspec.yaml',
        type: 'file',
        content: `name: flutter_project
description: A new Flutter project.
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: ">=2.17.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
  
  # assets:
  #   - images/a_dot_burr.jpeg
  #   - images/a_dot_ham.jpeg

  # fonts:
  #   - family: Schyler
  #     fonts:
  #       - asset: fonts/Schyler-Regular.ttf
  #       - asset: fonts/Schyler-Italic.ttf
  #         style: italic`
      },
      {
        name: 'README.md',
        path: '/README.md',
        type: 'file',
        content: `# Flutter Project

A new Flutter project created with Flutter Web IDE.

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.`
      },
      {
        name: 'analysis_options.yaml',
        path: '/analysis_options.yaml',
        type: 'file',
        content: `include: package:flutter_lints/flutter.yaml

linter:
  rules:
    prefer_const_constructors: true
    prefer_const_literals_to_create_immutables: true
    prefer_const_declarations: true
    prefer_final_fields: true
    unnecessary_const: true
    unnecessary_new: true`
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

  const handleCreateNewFile = () => {
    const fileName = prompt('Enter file name (e.g., my_widget.dart):');
    if (fileName) {
      const newFile: File = {
        name: fileName,
        path: `/lib/${fileName}`,
        type: 'file',
        content: fileName.endsWith('.dart') ? 
          `import 'package:flutter/material.dart';\n\n// TODO: Implement ${fileName.replace('.dart', '')}\n` :
          ''
      };
      handleFileClick(newFile);
    }
  };

  const handleCreateTemplate = (templateName: string) => {
    onProjectCreate(templateName);
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
        '.md': <FileText className="h-4 w-4 text-gray-500 mr-1" />,
        '.html': <FileCode className="h-4 w-4 text-orange-500 mr-1" />
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

  const filteredFiles = (items: (Directory | File)[]): (Directory | File)[] => {
    if (!searchTerm) return items;
    
    return items.filter(item => {
      if (item.type === 'file') {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        const hasMatchingChildren = item.children && filteredFiles(item.children).length > 0;
        return item.name.toLowerCase().includes(searchTerm.toLowerCase()) || hasMatchingChildren;
      }
    });
  };

  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button 
          className={`flex-1 py-2 ${activeTab === 'files' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          onClick={() => setActiveTab('files')}
          title="Files"
        >
          <Folder className="h-4 w-4 mx-auto" />
        </button>
        <button 
          className={`flex-1 py-2 ${activeTab === 'widgets' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          onClick={() => setActiveTab('widgets')}
          title="Widgets"
        >
          <Grid className="h-4 w-4 mx-auto" />
        </button>
        <button 
          className={`flex-1 py-2 ${activeTab === 'packages' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          onClick={() => setActiveTab('packages')}
          title="Packages"
        >
          <Package className="h-4 w-4 mx-auto" />
        </button>
        <button 
          className={`flex-1 py-2 ${activeTab === 'templates' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          onClick={() => setActiveTab('templates')}
          title="Templates"
        >
          <BookOpen className="h-4 w-4 mx-auto" />
        </button>
      </div>
      
      {activeTab === 'files' && (
        <>
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search files..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded py-1 px-3 text-sm pl-8 focus:ring-1 focus:ring-blue-500"
              />
              <Search className="h-4 w-4 absolute left-2 top-1.5 text-gray-400" />
            </div>
            <div className="flex mt-2 space-x-2">
              <button 
                className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={handleCreateNewFile}
              >
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
            {filteredFiles([projectStructure]).map(item => renderTree(item))}
          </div>
        </>
      )}
      
      {activeTab === 'widgets' && <FlutterWidgetPalette />}
      
      {activeTab === 'packages' && <FlutterPackageManager />}
      
      {activeTab === 'templates' && (
        <div className="p-4 overflow-y-auto flex-1">
          <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">Flutter Templates</h3>
          <div className="space-y-3">
            {Object.entries(flutterTemplates).map(([key, template]) => (
              <div 
                key={key}
                className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => handleCreateTemplate(key)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">{template.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{template.description}</p>
                  </div>
                  <Download className="h-4 w-4 text-gray-400 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlutterSidebar;