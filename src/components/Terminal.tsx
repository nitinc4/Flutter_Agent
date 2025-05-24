import React, { useState, useEffect, useRef } from 'react';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'Flutter Web IDE Terminal v1.0.0',
    'Type "help" to see available commands',
    ''
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = (command: string) => {
    if (!command.trim()) return;

    // Add command to history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    // Mock terminal responses
    let response: string[] = [];
    
    if (command === 'help') {
      response = [
        'Available commands:',
        '  help            - Show this help message',
        '  clear          - Clear the terminal',
        '  flutter create - Create a new Flutter project',
        '  flutter run    - Run the current Flutter project',
        '  flutter build  - Build the Flutter project',
        '  flutter test   - Run Flutter tests',
        '  flutter doctor - Show information about the Flutter installation',
        '  cd <dir>       - Change directory',
        '  ls             - List directory contents',
        '  pwd            - Print working directory'
      ];
    } else if (command === 'clear') {
      setHistory(['']);
      setInput('');
      return;
    } else if (command.startsWith('flutter create')) {
      response = [
        'Creating a new Flutter project...',
        'Project created successfully!',
        '  cd project_name',
        '  flutter run    - To run your application',
        '  flutter test   - To run Flutter tests',
        '  flutter build  - To build your application'
      ];
    } else if (command === 'flutter run') {
      response = [
        'Launching Flutter application...',
        'Running "flutter pub get" in project directory...',
        'Resolving dependencies...',
        'Got dependencies!',
        'Compiling for the web...',
        'App running on http://localhost:8080'
      ];
    } else if (command === 'flutter doctor') {
      response = [
        'Doctor summary (to see all details, run flutter doctor -v):',
        '[✓] Flutter (Channel stable, 3.19.0)',
        '[✓] Chrome - version 121.0.6167.161',
        '[✓] VS Code (version 1.86.0)',
        '[✓] HTTP Host Availability',
        '• No issues found!'
      ];
    } else if (command === 'pwd') {
      response = ['/home/project'];
    } else if (command === 'ls') {
      response = [
        'lib/',
        'test/',
        'web/',
        'pubspec.yaml',
        'README.md',
        'analysis_options.yaml'
      ];
    } else {
      response = [`Command not found: ${command}. Type "help" for available commands.`];
    }
    
    setHistory(prev => [...prev, `$ ${command}`, ...response, '']);
    setInput('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Command completion could be implemented here
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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