import { LanguageSupport } from '@codemirror/language';
import { StreamLanguage } from '@codemirror/language';

// Dart language definition for CodeMirror
const dartLanguage = StreamLanguage.define({
  name: 'dart',
  startState() {
    return {
      inString: false,
      inComment: false,
      inMultiLineComment: false,
      stringDelimiter: null
    };
  },
  
  token(stream, state) {
    // Handle multi-line comments
    if (state.inMultiLineComment) {
      if (stream.match('*/')) {
        state.inMultiLineComment = false;
        return 'comment';
      }
      stream.next();
      return 'comment';
    }
    
    // Handle strings
    if (state.inString) {
      if (stream.match(state.stringDelimiter)) {
        state.inString = false;
        state.stringDelimiter = null;
        return 'string';
      }
      if (stream.match('\\\\') || stream.match('\\"') || stream.match("\\'")) {
        return 'string';
      }
      stream.next();
      return 'string';
    }
    
    // Skip whitespace
    if (stream.eatSpace()) return null;
    
    // Multi-line comments
    if (stream.match('/*')) {
      state.inMultiLineComment = true;
      return 'comment';
    }
    
    // Single line comments
    if (stream.match('//')) {
      stream.skipToEnd();
      return 'comment';
    }
    
    // Strings
    if (stream.match('"')) {
      state.inString = true;
      state.stringDelimiter = '"';
      return 'string';
    }
    if (stream.match("'")) {
      state.inString = true;
      state.stringDelimiter = "'";
      return 'string';
    }
    
    // Numbers
    if (stream.match(/^[0-9]+(\.[0-9]+)?/)) {
      return 'number';
    }
    
    // Keywords
    const keywords = [
      'abstract', 'as', 'assert', 'async', 'await', 'break', 'case', 'catch',
      'class', 'const', 'continue', 'default', 'deferred', 'do', 'dynamic',
      'else', 'enum', 'export', 'extends', 'external', 'factory', 'false',
      'final', 'finally', 'for', 'get', 'if', 'implements', 'import', 'in',
      'is', 'library', 'new', 'null', 'operator', 'part', 'rethrow', 'return',
      'set', 'static', 'super', 'switch', 'sync', 'this', 'throw', 'true',
      'try', 'typedef', 'var', 'void', 'while', 'with', 'yield'
    ];
    
    const types = [
      'bool', 'double', 'int', 'num', 'String', 'List', 'Map', 'Set',
      'Object', 'Function', 'Iterable', 'Future', 'Stream', 'Widget',
      'StatelessWidget', 'StatefulWidget', 'State', 'BuildContext'
    ];
    
    // Check for keywords and types
    if (stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)) {
      const word = stream.current();
      if (keywords.includes(word)) return 'keyword';
      if (types.includes(word)) return 'type';
      return 'variable';
    }
    
    // Operators and punctuation
    if (stream.match(/^[+\-*/%=<>!&|^~?:;,.\[\]{}()]/)) {
      return 'operator';
    }
    
    stream.next();
    return null;
  }
});

export function dart(): LanguageSupport {
  return new LanguageSupport(dartLanguage);
}