import React from 'react';
import { Search } from 'lucide-react';

interface WidgetCategory {
  name: string;
  widgets: {
    name: string;
    description: string;
    documentation?: string;
  }[];
}

const WidgetPalette: React.FC = () => {
  // Mock Flutter widget categories
  const widgetCategories: WidgetCategory[] = [
    {
      name: 'Basic',
      widgets: [
        { name: 'Text', description: 'A run of text with a single style.' },
        { name: 'Container', description: 'A convenience widget that combines common painting, positioning, and sizing.' },
        { name: 'Row', description: 'Layout a list of child widgets in the horizontal direction.' },
        { name: 'Column', description: 'Layout a list of child widgets in the vertical direction.' },
        { name: 'Stack', description: 'This widget positions its children relative to the edges of its box.' }
      ]
    },
    {
      name: 'Material',
      widgets: [
        { name: 'ElevatedButton', description: 'A Material Design elevated button.' },
        { name: 'FloatingActionButton', description: 'A floating action button.' },
        { name: 'AppBar', description: 'A Material Design app bar.' },
        { name: 'Scaffold', description: 'Implements the basic Material Design visual layout structure.' }
      ]
    },
    {
      name: 'Input',
      widgets: [
        { name: 'TextField', description: 'A Material Design text field.' },
        { name: 'Checkbox', description: 'A Material Design checkbox.' },
        { name: 'Radio', description: 'A Material Design radio button.' },
        { name: 'Switch', description: 'A Material Design switch.' }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search widgets..." 
            className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded py-1 px-3 text-sm pl-8 focus:ring-1 focus:ring-blue-500"
          />
          <Search className="h-4 w-4 absolute left-2 top-1.5 text-gray-400" />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1 p-2">
        {widgetCategories.map((category) => (
          <div key={category.name} className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{category.name}</h3>
            <div className="space-y-1">
              {category.widgets.map((widget) => (
                <div 
                  key={widget.name}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('widget', JSON.stringify(widget));
                  }}
                >
                  <div className="font-medium text-sm">{widget.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{widget.description}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetPalette;