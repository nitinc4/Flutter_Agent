import React, { useState } from 'react';
import { Search, Copy, ExternalLink } from 'lucide-react';

interface FlutterWidget {
  name: string;
  description: string;
  category: string;
  code: string;
  documentation?: string;
  properties?: string[];
}

const FlutterWidgetPalette: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const flutterWidgets: FlutterWidget[] = [
    // Basic Widgets
    {
      name: 'Text',
      description: 'A run of text with a single style.',
      category: 'Basic',
      code: `Text(
  'Hello, World!',
  style: TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
  ),
)`,
      properties: ['data', 'style', 'textAlign', 'overflow', 'maxLines']
    },
    {
      name: 'Container',
      description: 'A convenience widget that combines common painting, positioning, and sizing widgets.',
      category: 'Basic',
      code: `Container(
  width: 100,
  height: 100,
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(8),
  ),
  child: Center(
    child: Text('Container'),
  ),
)`,
      properties: ['child', 'width', 'height', 'decoration', 'margin', 'padding']
    },
    {
      name: 'Row',
      description: 'Layout a list of child widgets in the horizontal direction.',
      category: 'Layout',
      code: `Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Icon(Icons.star),
    Text('Row Widget'),
    Icon(Icons.star),
  ],
)`,
      properties: ['children', 'mainAxisAlignment', 'crossAxisAlignment', 'mainAxisSize']
    },
    {
      name: 'Column',
      description: 'Layout a list of child widgets in the vertical direction.',
      category: 'Layout',
      code: `Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Text('First Item'),
    SizedBox(height: 16),
    Text('Second Item'),
  ],
)`,
      properties: ['children', 'mainAxisAlignment', 'crossAxisAlignment', 'mainAxisSize']
    },
    {
      name: 'Stack',
      description: 'This widget positions its children relative to the edges of its box.',
      category: 'Layout',
      code: `Stack(
  children: [
    Container(
      width: 100,
      height: 100,
      color: Colors.blue,
    ),
    Positioned(
      top: 10,
      right: 10,
      child: Icon(Icons.star),
    ),
  ],
)`,
      properties: ['children', 'alignment', 'fit', 'clipBehavior']
    },
    
    // Material Widgets
    {
      name: 'ElevatedButton',
      description: 'A Material Design elevated button.',
      category: 'Material',
      code: `ElevatedButton(
  onPressed: () {
    // Handle button press
  },
  child: Text('Elevated Button'),
  style: ElevatedButton.styleFrom(
    backgroundColor: Colors.blue,
    foregroundColor: Colors.white,
  ),
)`,
      properties: ['onPressed', 'child', 'style']
    },
    {
      name: 'FloatingActionButton',
      description: 'A floating action button.',
      category: 'Material',
      code: `FloatingActionButton(
  onPressed: () {
    // Handle FAB press
  },
  child: Icon(Icons.add),
  backgroundColor: Colors.blue,
)`,
      properties: ['onPressed', 'child', 'backgroundColor', 'foregroundColor']
    },
    {
      name: 'AppBar',
      description: 'A Material Design app bar.',
      category: 'Material',
      code: `AppBar(
  title: Text('App Title'),
  backgroundColor: Colors.blue,
  actions: [
    IconButton(
      icon: Icon(Icons.search),
      onPressed: () {},
    ),
  ],
)`,
      properties: ['title', 'backgroundColor', 'actions', 'leading', 'elevation']
    },
    {
      name: 'Scaffold',
      description: 'Implements the basic Material Design visual layout structure.',
      category: 'Material',
      code: `Scaffold(
  appBar: AppBar(
    title: Text('Scaffold'),
  ),
  body: Center(
    child: Text('Body Content'),
  ),
  floatingActionButton: FloatingActionButton(
    onPressed: () {},
    child: Icon(Icons.add),
  ),
)`,
      properties: ['appBar', 'body', 'floatingActionButton', 'drawer', 'bottomNavigationBar']
    },
    {
      name: 'Card',
      description: 'A Material Design card.',
      category: 'Material',
      code: `Card(
  elevation: 4,
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      children: [
        Text('Card Title'),
        SizedBox(height: 8),
        Text('Card content goes here'),
      ],
    ),
  ),
)`,
      properties: ['child', 'elevation', 'color', 'margin', 'shape']
    },
    
    // Input Widgets
    {
      name: 'TextField',
      description: 'A Material Design text field.',
      category: 'Input',
      code: `TextField(
  decoration: InputDecoration(
    labelText: 'Enter text',
    border: OutlineInputBorder(),
    prefixIcon: Icon(Icons.search),
  ),
  onChanged: (value) {
    // Handle text change
  },
)`,
      properties: ['decoration', 'onChanged', 'controller', 'keyboardType', 'obscureText']
    },
    {
      name: 'Checkbox',
      description: 'A Material Design checkbox.',
      category: 'Input',
      code: `Checkbox(
  value: true,
  onChanged: (bool? value) {
    // Handle checkbox change
  },
)`,
      properties: ['value', 'onChanged', 'activeColor', 'checkColor']
    },
    {
      name: 'Switch',
      description: 'A Material Design switch.',
      category: 'Input',
      code: `Switch(
  value: true,
  onChanged: (bool value) {
    // Handle switch change
  },
)`,
      properties: ['value', 'onChanged', 'activeColor', 'inactiveThumbColor']
    },
    
    // Scrolling Widgets
    {
      name: 'ListView',
      description: 'A scrollable list of widgets.',
      category: 'Scrolling',
      code: `ListView(
  children: [
    ListTile(
      leading: Icon(Icons.star),
      title: Text('Item 1'),
      subtitle: Text('Subtitle 1'),
    ),
    ListTile(
      leading: Icon(Icons.star),
      title: Text('Item 2'),
      subtitle: Text('Subtitle 2'),
    ),
  ],
)`,
      properties: ['children', 'scrollDirection', 'reverse', 'controller']
    },
    {
      name: 'GridView',
      description: 'A scrollable 2D array of widgets.',
      category: 'Scrolling',
      code: `GridView.count(
  crossAxisCount: 2,
  children: List.generate(6, (index) {
    return Card(
      child: Center(
        child: Text('Item \$index'),
      ),
    );
  }),
)`,
      properties: ['crossAxisCount', 'children', 'mainAxisSpacing', 'crossAxisSpacing']
    },
    
    // Animation Widgets
    {
      name: 'AnimatedContainer',
      description: 'Animated version of Container that gradually changes its values over a period of time.',
      category: 'Animation',
      code: `AnimatedContainer(
  duration: Duration(seconds: 1),
  width: 100,
  height: 100,
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(8),
  ),
)`,
      properties: ['duration', 'width', 'height', 'decoration', 'curve']
    },
    {
      name: 'Hero',
      description: 'A widget that marks its child as being a candidate for hero animations.',
      category: 'Animation',
      code: `Hero(
  tag: 'hero-tag',
  child: Container(
    width: 100,
    height: 100,
    color: Colors.blue,
  ),
)`,
      properties: ['tag', 'child', 'createRectTween', 'flightShuttleBuilder']
    }
  ];

  const categories = ['All', ...Array.from(new Set(flutterWidgets.map(w => w.category)))];

  const filteredWidgets = flutterWidgets.filter(widget => {
    const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         widget.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || widget.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // Show a temporary notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
    notification.textContent = 'Code copied to clipboard!';
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700">
        <div className="relative mb-2">
          <input 
            type="text" 
            placeholder="Search widgets..." 
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
        {filteredWidgets.map((widget) => (
          <div 
            key={widget.name}
            className="mb-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm text-blue-600 dark:text-blue-400">{widget.name}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">{widget.category}</span>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => copyToClipboard(widget.code)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  title="Copy code"
                >
                  <Copy className="h-3 w-3 text-gray-500" />
                </button>
                {widget.documentation && (
                  <button
                    onClick={() => window.open(widget.documentation, '_blank')}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    title="View documentation"
                  >
                    <ExternalLink className="h-3 w-3 text-gray-500" />
                  </button>
                )}
              </div>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{widget.description}</p>
            
            <details className="text-xs">
              <summary className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline">
                View Code
              </summary>
              <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">
                <code>{widget.code}</code>
              </pre>
            </details>
            
            {widget.properties && (
              <div className="mt-2">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Key Properties:</p>
                <div className="flex flex-wrap gap-1">
                  {widget.properties.map(prop => (
                    <span 
                      key={prop}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                    >
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {filteredWidgets.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Grid className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No widgets found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlutterWidgetPalette;