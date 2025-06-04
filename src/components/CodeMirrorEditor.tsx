import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { useTheme } from '../context/ThemeContext';

interface CodeMirrorEditorProps {
  content: string;
  language: string;
  onChange?: (content: string) => void;
}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ content, language, onChange }) => {
  const { theme } = useTheme();

  const getLanguageExtension = (lang: string) => {
    switch (lang) {
      case 'dart':
        return javascript(); // Using JavaScript highlighting for Dart until we add a proper Dart extension
      case 'yaml':
        return javascript({ jsx: false }); // Basic highlighting for YAML
      case 'markdown':
        return javascript({ jsx: false }); // Basic highlighting for Markdown
      default:
        return javascript();
    }
  };

  return (
    <div className="h-full w-full" data-file={language === 'dart' ? 'main.dart' : language === 'yaml' ? 'pubspec.yaml' : ''}>
      <CodeMirror
        value={content}
        height="100%"
        theme={theme === 'dark' ? vscodeDark : undefined}
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