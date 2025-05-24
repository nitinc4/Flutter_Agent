import React, { useEffect, useRef, useState } from 'react';

interface CodeMirrorEditorProps {
  content: string;
  language: string;
  onChange?: (content: string) => void;
}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ content, language, onChange }) => {
  const [editorContent, setEditorContent] = useState(content);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setEditorContent(newContent);
    onChange?.(newContent);
  };

  const formatCode = (code: string, lang: string): string => {
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
    <div className="h-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono text-sm relative">
      <textarea
        ref={editorRef}
        value={editorContent}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full bg-transparent text-inherit font-inherit p-4 resize-none outline-none"
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        wrap="off"
      />
      <div 
        className="absolute inset-0 pointer-events-none p-4"
        dangerouslySetInnerHTML={{ 
          __html: formatCode(editorContent, language) 
        }}
      />
      <style jsx>{`
        textarea {
          font-family: Menlo, Monaco, "Courier New", monospace;
          line-height: 1.5;
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
        .keyword { color: #07a; }
        .string { color: #690; }
        .number { color: #905; }
        .comment { color: #999; font-style: italic; }
        .title { color: #07a; font-weight: bold; }
        .bold { font-weight: bold; }
      `}</style>
    </div>
  );
};

export default CodeMirrorEditor;