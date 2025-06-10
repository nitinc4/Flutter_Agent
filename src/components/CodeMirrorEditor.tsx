import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { yaml } from '@codemirror/lang-yaml';
import { markdown } from '@codemirror/lang-markdown';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { autocompletion } from '@codemirror/autocomplete';
import { linter } from '@codemirror/lint';
import { searchKeymap } from '@codemirror/search';
import { useTheme } from '../context/ThemeContext';
import { dart } from '../utils/dartLanguage';

interface CodeMirrorEditorProps {
  content: string;
  language: string;
  onChange?: (content: string) => void;
  onSave?: () => void;
}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ 
  content, 
  language, 
  onChange,
  onSave 
}) => {
  const { theme } = useTheme();

  const getLanguageExtension = (lang: string) => {
    switch (lang) {
      case 'dart':
        return dart();
      case 'yaml':
        return yaml();
      case 'markdown':
        return markdown();
      case 'javascript':
      case 'js':
        return javascript();
      default:
        return javascript();
    }
  };

  const dartLinter = linter((view) => {
    const diagnostics = [];
    const doc = view.state.doc;
    const text = doc.toString();
    
    if (language === 'dart') {
      const lines = text.split('\n');
      
      lines.forEach((line, index) => {
        // Check for common Dart syntax errors
        if (line.includes('class ') && !line.includes('{') && !line.endsWith(';')) {
          const nextLine = lines[index + 1];
          if (!nextLine || !nextLine.trim().startsWith('{')) {
            diagnostics.push({
              from: doc.line(index + 1).from,
              to: doc.line(index + 1).to,
              severity: 'error',
              message: 'Missing opening brace for class declaration'
            });
          }
        }
        
        // Check for missing semicolons
        if (line.trim().match(/^(var|final|const|int|double|String|bool)\s+\w+\s*=.*[^;]$/)) {
          diagnostics.push({
            from: doc.line(index + 1).from,
            to: doc.line(index + 1).to,
            severity: 'warning',
            message: 'Missing semicolon'
          });
        }
      });
    }
    
    return diagnostics;
  });

  const dartCompletions = autocompletion({
    override: [
      (context) => {
        if (language !== 'dart') return null;
        
        const word = context.matchBefore(/\w*/);
        if (!word) return null;
        
        const completions = [
          // Dart keywords
          { label: 'class', type: 'keyword' },
          { label: 'extends', type: 'keyword' },
          { label: 'implements', type: 'keyword' },
          { label: 'import', type: 'keyword' },
          { label: 'library', type: 'keyword' },
          { label: 'part', type: 'keyword' },
          { label: 'abstract', type: 'keyword' },
          { label: 'static', type: 'keyword' },
          { label: 'final', type: 'keyword' },
          { label: 'const', type: 'keyword' },
          { label: 'var', type: 'keyword' },
          { label: 'void', type: 'keyword' },
          { label: 'return', type: 'keyword' },
          { label: 'if', type: 'keyword' },
          { label: 'else', type: 'keyword' },
          { label: 'for', type: 'keyword' },
          { label: 'while', type: 'keyword' },
          { label: 'switch', type: 'keyword' },
          { label: 'case', type: 'keyword' },
          { label: 'default', type: 'keyword' },
          { label: 'break', type: 'keyword' },
          { label: 'continue', type: 'keyword' },
          { label: 'try', type: 'keyword' },
          { label: 'catch', type: 'keyword' },
          { label: 'finally', type: 'keyword' },
          { label: 'throw', type: 'keyword' },
          { label: 'async', type: 'keyword' },
          { label: 'await', type: 'keyword' },
          
          // Dart types
          { label: 'String', type: 'type' },
          { label: 'int', type: 'type' },
          { label: 'double', type: 'type' },
          { label: 'bool', type: 'type' },
          { label: 'List', type: 'type' },
          { label: 'Map', type: 'type' },
          { label: 'Set', type: 'type' },
          { label: 'Object', type: 'type' },
          { label: 'Function', type: 'type' },
          { label: 'Future', type: 'type' },
          { label: 'Stream', type: 'type' },
          
          // Flutter widgets
          { label: 'Widget', type: 'class' },
          { label: 'StatelessWidget', type: 'class' },
          { label: 'StatefulWidget', type: 'class' },
          { label: 'State', type: 'class' },
          { label: 'BuildContext', type: 'type' },
          { label: 'MaterialApp', type: 'class' },
          { label: 'Scaffold', type: 'class' },
          { label: 'AppBar', type: 'class' },
          { label: 'Container', type: 'class' },
          { label: 'Column', type: 'class' },
          { label: 'Row', type: 'class' },
          { label: 'Text', type: 'class' },
          { label: 'ElevatedButton', type: 'class' },
          { label: 'FloatingActionButton', type: 'class' },
          { label: 'Icon', type: 'class' },
          { label: 'Image', type: 'class' },
          { label: 'ListView', type: 'class' },
          { label: 'GridView', type: 'class' },
          { label: 'Stack', type: 'class' },
          { label: 'Positioned', type: 'class' },
          { label: 'Padding', type: 'class' },
          { label: 'Margin', type: 'class' },
          { label: 'SizedBox', type: 'class' },
          { label: 'Expanded', type: 'class' },
          { label: 'Flexible', type: 'class' },
          { label: 'Center', type: 'class' },
          { label: 'Align', type: 'class' },
          
          // Common methods
          { label: 'build', type: 'method', detail: '(BuildContext context) → Widget' },
          { label: 'setState', type: 'method', detail: '(VoidCallback fn) → void' },
          { label: 'initState', type: 'method', detail: '() → void' },
          { label: 'dispose', type: 'method', detail: '() → void' },
          { label: 'toString', type: 'method', detail: '() → String' },
          { label: 'print', type: 'function', detail: '(Object? object) → void' },
        ];
        
        return {
          from: word.from,
          options: completions.filter(c => 
            c.label.toLowerCase().startsWith(word.text.toLowerCase())
          )
        };
      }
    ]
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      onSave?.();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSave]);

  return (
    <div className="h-full w-full" data-file={language === 'dart' ? 'main.dart' : language === 'yaml' ? 'pubspec.yaml' : ''}>
      <CodeMirror
        value={content}
        height="100%"
        theme={theme === 'dark' ? vscodeDark : vscodeLight}
        extensions={[
          getLanguageExtension(language),
          dartCompletions,
          dartLinter,
          searchKeymap
        ]}
        onChange={onChange}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
        className="h-full"
      />
    </div>
  );
};

export default CodeMirrorEditor;