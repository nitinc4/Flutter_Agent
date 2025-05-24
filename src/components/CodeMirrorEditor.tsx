import React, { useEffect, useRef } from 'react';

interface CodeMirrorEditorProps {
  content: string;
  language: string;
}

// This is a mock implementation of a code editor
// In a real application, you would use a library like Monaco Editor or CodeMirror
const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ content, language }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real implementation, we would initialize the code editor here
    if (editorRef.current) {
      // For this mock, we're just showing formatted code with basic styles
      editorRef.current.innerHTML = formatCode(content, language);
    }
  }, [content, language]);

  const formatCode = (code: string, lang: string): string => {
    // Basic syntax highlighting simulation
    // Replace this with a real syntax highlighter in a production app
    let formattedCode = code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .split('\n')
      .map((line, i) => `<span class="line-number">${i + 1}</span><span class="line-content">${highlightSyntax(line, lang)}</span>`)
      .join('\n');

    return formattedCode;
  };

  const highlightSyntax = (line: string, lang: string): string => {
    if (lang === 'dart') {
      // Very basic Dart syntax highlighting
      return line
        .replace(/(class|void|final|const|var|extends|StatelessWidget|StatefulWidget|Widget|BuildContext|override|return|import|package|if|else|for|while|switch|case|break|continue|new|this|super|@required)/g, '<span class="keyword">$1</span>')
        .replace(/(\'.*?\'|\".*?\")/g, '<span class="string">$1</span>')
        .replace(/(\d+)/g, '<span class="number">$1</span>')
        .replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
    } else if (lang === 'yaml') {
      return line
        .replace(/^(\s*)([\w\-]+):/g, '$1<span class="keyword">$2</span>:')
        .replace(/(\'.*?\'|\".*?\")/g, '<span class="string">$1</span>');
    } else if (lang === 'markdown') {
      return line
        .replace(/^(#+\s+)(.*)$/g, '<span class="keyword">$1</span><span class="title">$2</span>')
        .replace(/(\*\*.*?\*\*)/g, '<span class="bold">$1</span>');
    }
    
    return line;
  };

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono text-sm overflow-auto p-4">
      <div 
        ref={editorRef} 
        className="editor"
        style={{
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          lineHeight: '1.5',
        }}
      />
      <style jsx>{`
        .editor {
          white-space: pre;
          tab-size: 2;
        }
        .line-number {
          display: inline-block;
          width: 3rem;
          text-align: right;
          color: #888;
          padding-right: 1rem;
          user-select: none;
        }
        .line-content {
          padding-left: 0.5rem;
          border-left: 1px solid #ddd;
        }
        .keyword {
          color: #07a;
        }
        .string {
          color: #690;
        }
        .number {
          color: #905;
        }
        .comment {
          color: #999;
          font-style: italic;
        }
        .title {
          color: #07a;
          font-weight: bold;
        }
        .bold {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default CodeMirrorEditor;