import React, { useState, useEffect, useRef } from 'react';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'Flutter Web IDE Terminal v1.0.0',
    'Type "help" to see available commands',
    ''
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const command = input.trim();
      
      // Mock terminal responses
      let response: string[] = [];
      
      if (command === 'help') {
        response = [
          'Available commands:',
          '  help - Show this help message',
          '  flutter create <name> - Create a new Flutter project',
          '  flutter run - Run the current Flutter project',
          '  flutter build web - Build the Flutter project for web',
          '  clear - Clear the terminal'
        ];
      } else if (command === 'clear') {
        setHistory(['']);
        setInput('');
        return;
      } else if (command.startsWith('flutter create')) {
        response = [
          'Creating a new Flutter project...',
          'Project created successfully!'
        ];
      } else if (command === 'flutter run') {
        response = [
          'Building Flutter application...',
          'Running on web server at http://localhost:8080',
          'Application running.'
        ];
      } else if (command === 'flutter build web') {
        response = [
          'Building for web...',
          'Compiling dart to JavaScript...',
          'Build completed successfully!',
          'Output files written to build/web/'
        ];
      } else {
        response = [`Command not found: ${command}. Type "help" for available commands.`];
      }
      
      setHistory(prev => [...prev, `$ ${command}`, ...response, '']);
      setInput('');

      // Ensure input stays focused after command execution
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleTerminalClick = () => {
    // Focus input when terminal is clicked
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Prevent losing focus when pressing Tab
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      // Here you could implement command completion if desired
    }
    handleCommand(e);
  };

  return (
    <div 
      className="h-full bg-gray-900 text-gray-100 font-mono text-sm p-2 overflow-auto"
      onClick={handleTerminalClick}
      ref={terminalRef}
    >
      {history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">{line}</div>
      ))}
      <div className="flex items-center">
        <span className="text-green-400 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none caret-white"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
};

export default Terminal;