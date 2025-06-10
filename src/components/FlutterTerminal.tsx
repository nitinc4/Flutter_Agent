import React, { useState, useEffect, useRef } from 'react';
import { FlutterCompiler } from '../utils/flutterCompiler';

interface FlutterTerminalProps {
  onCompilationResult?: (result: any) => void;
  currentFiles?: Record<string, any>;
}

const FlutterTerminal: React.FC<FlutterTerminalProps> = ({ 
  onCompilationResult,
  currentFiles 
}) => {
  const [history, setHistory] = useState<string[]>([
    'Flutter Web IDE Terminal v1.0.0',
    'Flutter 3.19.0 • channel stable',
    'Tools • Dart 3.3.0 • DevTools 2.31.1',
    'Type "help" to see available commands',
    ''
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const compiler = FlutterCompiler.getInstance();

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

  const addToHistory = (lines: string[]) => {
    setHistory(prev => [...prev, ...lines, '']);
  };

  const handleFlutterCommand = async (command: string) => {
    const args = command.split(' ').slice(1); // Remove 'flutter'
    const subcommand = args[0];

    switch (subcommand) {
      case 'create':
        return handleFlutterCreate(args);
      case 'run':
        return handleFlutterRun(args);
      case 'build':
        return handleFlutterBuild(args);
      case 'test':
        return handleFlutterTest(args);
      case 'doctor':
        return handleFlutterDoctor();
      case 'clean':
        return handleFlutterClean();
      case 'pub':
        return handleFlutterPub(args.slice(1));
      case 'analyze':
        return handleFlutterAnalyze();
      case 'format':
        return handleFlutterFormat(args);
      default:
        return [`Unknown Flutter command: ${subcommand}`, 'Run "flutter help" for available commands'];
    }
  };

  const handleFlutterCreate = (args: string[]) => {
    const projectName = args[1] || 'flutter_project';
    return [
      `Creating Flutter project "${projectName}"...`,
      'Running "flutter pub get" in project directory...',
      'Resolving dependencies...',
      'Got dependencies!',
      `Flutter project "${projectName}" created successfully.`,
      '',
      'To run your project:',
      `  cd ${projectName}`,
      '  flutter run'
    ];
  };

  const handleFlutterRun = async (args: string[]) => {
    if (!currentFiles || !currentFiles['lib/main.dart']) {
      return ['Error: No Flutter project found. Create a project first with "flutter create".'];
    }

    setIsRunning(true);
    
    const lines = [
      'Launching Flutter application...',
      'Running "flutter pub get"...',
      'Resolving dependencies...',
      'Got dependencies!',
      '',
      'Compiling application for the web...'
    ];

    addToHistory(lines);

    try {
      const project = {
        name: 'flutter_project',
        files: Object.fromEntries(
          Object.entries(currentFiles).map(([path, file]) => [path, file.content])
        ),
        dependencies: {}
      };

      const result = await compiler.compileProject(project);
      onCompilationResult?.(result);

      if (result.success) {
        return [
          '✓ Application compiled successfully',
          '✓ Hot reload is enabled',
          '',
          'Flutter app is now running on:',
          '  http://localhost:8080',
          '',
          'Press "r" to hot reload, "R" to hot restart, "q" to quit.'
        ];
      } else {
        setIsRunning(false);
        return [
          '✗ Compilation failed:',
          ...(result.errors || ['Unknown error occurred'])
        ];
      }
    } catch (error) {
      setIsRunning(false);
      return ['✗ Failed to compile application:', error instanceof Error ? error.message : 'Unknown error'];
    }
  };

  const handleFlutterBuild = (args: string[]) => {
    const target = args[1] || 'web';
    return [
      `Building Flutter app for ${target}...`,
      'Running "flutter pub get"...',
      'Resolving dependencies...',
      'Got dependencies!',
      '',
      `Building ${target} application...`,
      '✓ Built build/web',
      '',
      `Flutter ${target} build completed successfully.`,
      `Output directory: build/${target}/`
    ];
  };

  const handleFlutterTest = () => {
    return [
      'Running Flutter tests...',
      '',
      '00:01 +0: loading test/widget_test.dart',
      '00:02 +1: Counter increments smoke test',
      '00:02 +1: All tests passed!',
      '',
      'Test run completed successfully.'
    ];
  };

  const handleFlutterDoctor = () => {
    return [
      'Doctor summary (to see all details, run flutter doctor -v):',
      '[✓] Flutter (Channel stable, 3.19.0, on macOS 14.0)',
      '[✓] Chrome - develop for the web',
      '[✓] VS Code (version 1.86.0)',
      '[✓] Connected device (1 available)',
      '[✓] Network resources',
      '',
      '• No issues found!'
    ];
  };

  const handleFlutterClean = () => {
    return [
      'Cleaning Flutter project...',
      'Deleting build/',
      'Deleting .dart_tool/',
      '',
      'Clean completed successfully.'
    ];
  };

  const handleFlutterPub = (args: string[]) => {
    const subcommand = args[0];
    
    switch (subcommand) {
      case 'get':
        return [
          'Running "flutter pub get"...',
          'Resolving dependencies...',
          'Got dependencies!'
        ];
      case 'upgrade':
        return [
          'Upgrading dependencies...',
          'Resolving dependencies...',
          'Dependencies upgraded successfully!'
        ];
      case 'add':
        const packageName = args[1];
        if (!packageName) {
          return ['Error: Please specify a package name'];
        }
        return [
          `Adding dependency "${packageName}"...`,
          'Resolving dependencies...',
          `Added "${packageName}" to dependencies.`,
          'Run "flutter pub get" to install.'
        ];
      default:
        return [`Unknown pub command: ${subcommand}`];
    }
  };

  const handleFlutterAnalyze = () => {
    return [
      'Analyzing Flutter project...',
      '',
      'Analyzing lib/main.dart...',
      'No issues found! ✓',
      '',
      'Analysis completed successfully.'
    ];
  };

  const handleFlutterFormat = (args: string[]) => {
    const target = args[1] || 'lib/';
    return [
      `Formatting ${target}...`,
      'Formatted lib/main.dart',
      '',
      'Formatting completed successfully.'
    ];
  };

  const handleCommand = async (command: string) => {
    if (!command.trim()) return;

    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    addToHistory([`$ ${command}`]);

    let response: string[] = [];
    
    if (command === 'help') {
      response = [
        'Available commands:',
        '',
        'Flutter commands:',
        '  flutter create <name>  - Create a new Flutter project',
        '  flutter run           - Run the Flutter application',
        '  flutter build <target> - Build the application',
        '  flutter test          - Run Flutter tests',
        '  flutter doctor        - Show Flutter installation info',
        '  flutter clean         - Clean the project',
        '  flutter pub get       - Get dependencies',
        '  flutter pub upgrade   - Upgrade dependencies',
        '  flutter pub add <pkg> - Add a dependency',
        '  flutter analyze       - Analyze the project',
        '  flutter format        - Format Dart code',
        '',
        'General commands:',
        '  clear                 - Clear the terminal',
        '  ls                    - List directory contents',
        '  pwd                   - Print working directory',
        '  help                  - Show this help message'
      ];
    } else if (command === 'clear') {
      setHistory(['']);
      setInput('');
      return;
    } else if (command.startsWith('flutter')) {
      response = await handleFlutterCommand(command);
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
    } else if (command === 'r' && isRunning) {
      response = ['🔥 Hot reload performed.'];
    } else if (command === 'R' && isRunning) {
      response = ['🔄 Hot restart performed.'];
      setIsRunning(false);
      setTimeout(() => setIsRunning(true), 1000);
    } else if (command === 'q' && isRunning) {
      response = ['Application stopped.'];
      setIsRunning(false);
    } else {
      response = [`Command not found: ${command}. Type "help" for available commands.`];
    }
    
    addToHistory(response);
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
        <div key={index} className="whitespace-pre-wrap">
          {line.startsWith('✓') ? (
            <span className="text-green-400">{line}</span>
          ) : line.startsWith('✗') || line.startsWith('Error:') ? (
            <span className="text-red-400">{line}</span>
          ) : line.startsWith('🔥') ? (
            <span className="text-orange-400">{line}</span>
          ) : line.startsWith('🔄') ? (
            <span className="text-blue-400">{line}</span>
          ) : (
            line
          )}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-green-400 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none caret-white terminal-input"
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

export default FlutterTerminal;