import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { yaml } from '@codemirror/lang-yaml';
import { markdown } from '@codemirror/lang-markdown';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { useTheme } from '../context/ThemeContext';

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
        // Use JavaScript syntax highlighting for Dart files
        return javascript();
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
        extensions={[getLanguageExtension(language)]}
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